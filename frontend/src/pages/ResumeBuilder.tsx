import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight, Save, Download, Eye, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { resumeAPI } from "@/services/api";
import { LivePreviewModal } from "@/components/resume/LivePreviewModal";
import { getTemplate } from "@/components/resume/ResumeTemplates";
import { downloadResumePDF } from "@/utils/pdfDownload";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Education {
  degree: string;
  institution: string;
  year: string;
  gpa: string;
}

interface Experience {
  jobTitle: string;
  company: string;
  startDate: Date | null;
  endDate: Date | null;
  currentlyWorking: boolean;
  duration: string;
  responsibilities: string[];
}

interface Project {
  title: string;
  description: string;
  technologies: string[];
  link: string;
}

interface ResumeData {
  title: string;
  template: string;
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    linkedin: string;
    location: string;
    professionalSummary: string;
  };
  education: Education[];
  experience: Experience[];
  skills: {
    technical: string[];
    soft: string[];
  };
  projects: Project[];
  achievements: string[];
  certifications: string[];
}

const TEMPLATE_OPTIONS = [
  { value: 'blue-compact', label: 'Blue Compact (Two-Column)' },
  { value: 'clean-professional', label: 'Clean Professional' },
  { value: 'modern-two-column', label: 'Modern Two-Column' }
];

const SKILL_SUGGESTIONS = {
  technical: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Java', 'C++', 'SQL', 'MongoDB', 'AWS', 'Docker', 'Git'],
  soft: ['Leadership', 'Communication', 'Problem Solving', 'Team Collaboration', 'Time Management', 'Critical Thinking']
};

const ResumeBuilder = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const resumeId = searchParams.get('id');
  
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState("blue-compact");
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const totalSteps = 6;

  const [resumeData, setResumeData] = useState<ResumeData>({
    title: "My Resume",
    template: "blue-compact",
    personalInfo: {
      fullName: user?.fullName || "",
      email: user?.email || "",
      phone: "",
      linkedin: "",
      location: "",
      professionalSummary: ""
    },
    education: [{ degree: "", institution: "", year: "", gpa: "" }],
    experience: [{ 
      jobTitle: "", 
      company: "", 
      startDate: null,
      endDate: null,
      currentlyWorking: false,
      duration: "", 
      responsibilities: [""] 
    }],
    skills: { technical: [], soft: [] },
    projects: [{ title: "", description: "", technologies: [], link: "" }],
    achievements: [],
    certifications: []
  });

  useEffect(() => {
    if (resumeId) {
      loadResume();
    }
  }, [resumeId]);

  const loadResume = async () => {
    try {
      const data = await resumeAPI.getById(resumeId!);
      setResumeData(data.resume);
      setSelectedTemplate(data.resume.template);
    } catch (error) {
      toast.error("Failed to load resume");
    }
  };

  const formatDuration = (startDate: Date | null, endDate: Date | null, currentlyWorking: boolean) => {
    if (!startDate) return '';
    const start = startDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    const end = currentlyWorking ? 'Present' : endDate ? endDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '';
    return `${start} - ${end}`;
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Update durations before saving
      const updatedExperience = resumeData.experience.map(exp => ({
        ...exp,
        duration: formatDuration(exp.startDate, exp.endDate, exp.currentlyWorking)
      }));

      const dataToSave = { 
        ...resumeData, 
        template: selectedTemplate,
        experience: updatedExperience
      };

      if (resumeId) {
        await resumeAPI.update(resumeId, dataToSave);
        toast.success("Resume updated successfully!");
      } else {
        await resumeAPI.create(dataToSave);
        toast.success("Resume saved successfully!");
      }
      navigate('/my-resumes');
    } catch (error: any) {
      toast.error(error.message || "Failed to save resume");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      toast.info("Generating PDF...");
      await downloadResumePDF('resume-preview-main', resumeData.title || 'resume');
      toast.success("Resume downloaded successfully!");
    } catch (error) {
      toast.error("Failed to download PDF");
    }
  };

  const updatePersonalInfo = (field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, { degree: "", institution: "", year: "", gpa: "" }]
    }));
  };

  const removeEducation = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, { 
        jobTitle: "", 
        company: "", 
        startDate: null,
        endDate: null,
        currentlyWorking: false,
        duration: "", 
        responsibilities: [""] 
      }]
    }));
  };

  const removeExperience = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const updateExperience = (index: number, field: string, value: any) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => {
        if (i === index) {
          const updated = { ...exp, [field]: value };
          if (field === 'startDate' || field === 'endDate' || field === 'currentlyWorking') {
            updated.duration = formatDuration(
              field === 'startDate' ? value : exp.startDate,
              field === 'endDate' ? value : exp.endDate,
              field === 'currentlyWorking' ? value : exp.currentlyWorking
            );
          }
          return updated;
        }
        return exp;
      })
    }));
  };

  const addProject = () => {
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, { title: "", description: "", technologies: [], link: "" }]
    }));
  };

  const removeProject = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  const updateProject = (index: number, field: string, value: any) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map((proj, i) => 
        i === index ? { ...proj, [field]: value } : proj
      )
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const progress = (currentStep / totalSteps) * 100;
  const TemplateComponent = getTemplate(selectedTemplate);

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 animate-fade-in">
          <div>
            <h1 className="text-4xl font-bold mb-2">Resume Builder</h1>
            <p className="text-muted-foreground">
              Step {currentStep} of {totalSteps}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowPreview(true)}>
              <Eye className="w-4 h-4 mr-2" />
              Live Preview
            </Button>
            <Button variant="outline" onClick={handleSave} disabled={isLoading}>
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? "Saving..." : "Save"}
            </Button>
            <Button className="gradient-accent text-white" onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>

        <div className="mb-8 animate-fade-in">
          <Progress value={progress} className="h-2 mb-4" />
          <div className="flex justify-between">
            {[
              { number: 1, title: "Personal" },
              { number: 2, title: "Education" },
              { number: 3, title: "Experience" },
              { number: 4, title: "Skills" },
              { number: 5, title: "Projects" },
              { number: 6, title: "Final" },
            ].map((step) => {
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;

              return (
                <button
                  key={step.number}
                  onClick={() => setCurrentStep(step.number)}
                  className={`flex flex-col items-center gap-1 transition-all ${
                    isActive
                      ? "text-primary"
                      : isCompleted
                      ? "text-accent"
                      : "text-muted-foreground"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isActive
                        ? "gradient-primary text-white shadow-primary"
                        : isCompleted
                        ? "bg-accent text-white"
                        : "bg-muted"
                    }`}
                  >
                    <span className="text-sm font-bold">{step.number}</span>
                  </div>
                  <span className="text-xs hidden sm:inline font-medium">
                    {step.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="animate-fade-in">
            <Card className="p-6 sm:p-8">
              {currentStep === 1 && (
                <PersonalInfoForm data={resumeData.personalInfo} onChange={updatePersonalInfo} />
              )}
              {currentStep === 2 && (
                <EducationForm 
                  education={resumeData.education}
                  onAdd={addEducation}
                  onRemove={removeEducation}
                  onChange={updateEducation}
                />
              )}
              {currentStep === 3 && (
                <ExperienceForm 
                  experience={resumeData.experience}
                  onAdd={addExperience}
                  onRemove={removeExperience}
                  onChange={updateExperience}
                />
              )}
              {currentStep === 4 && (
                <SkillsForm 
                  skills={resumeData.skills}
                  onChange={(field, value) => setResumeData(prev => ({
                    ...prev,
                    skills: { ...prev.skills, [field]: value }
                  }))}
                />
              )}
              {currentStep === 5 && (
                <ProjectsForm 
                  projects={resumeData.projects}
                  onAdd={addProject}
                  onRemove={removeProject}
                  onChange={updateProject}
                />
              )}
              {currentStep === 6 && (
                <TemplateSelectionForm 
                  achievements={resumeData.achievements}
                  certifications={resumeData.certifications}
                  template={selectedTemplate}
                  onTemplateChange={setSelectedTemplate}
                  onChange={(field, value) => setResumeData(prev => ({
                    ...prev,
                    [field]: value
                  }))}
                />
              )}

              <div className="flex justify-between mt-8 pt-6 border-t border-border">
                <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                {currentStep === totalSteps ? (
                  <Button className="gradient-primary text-white" onClick={handleSave} disabled={isLoading}>
                    <Save className="w-4 h-4 mr-2" />
                    {isLoading ? "Saving..." : "Save Resume"}
                  </Button>
                ) : (
                  <Button className="gradient-primary text-white" onClick={handleNext}>
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </Card>
          </div>

          <div className="lg:sticky lg:top-24 h-fit animate-fade-in space-y-4">
            {/* Template Selector Card */}
            <Card className="p-4">
              <Label className="mb-2 block">Choose Template</Label>
              <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a template" />
                </SelectTrigger>
                <SelectContent>
                  {TEMPLATE_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Card>

            {/* Preview Card */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Live Preview</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowPreview(true)}>
                  <Eye className="w-4 h-4 mr-2" />
                  Full Screen
                </Button>
              </div>
              <div 
                id="resume-preview-main"
                className="aspect-[8.5/11] bg-white border-2 border-border rounded-lg overflow-auto shadow-inner"
              >
                <TemplateComponent data={resumeData} />
              </div>
            </Card>
          </div>
        </div>
      </div>

      <LivePreviewModal
        open={showPreview}
        onClose={() => setShowPreview(false)}
        resumeData={resumeData}
        template={selectedTemplate}
        resumeTitle={resumeData.title}
      />
    </div>
  );
};

// Form Components
const PersonalInfoForm = ({ data, onChange }: any) => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
    <div className="grid sm:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name *</Label>
        <Input 
          id="fullName" 
          value={data.fullName} 
          onChange={(e) => onChange('fullName', e.target.value)} 
          placeholder="John Doe" 
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input 
          id="email" 
          type="email" 
          value={data.email} 
          onChange={(e) => onChange('email', e.target.value)} 
          placeholder="john@example.com" 
        />
      </div>
    </div>
    <div className="grid sm:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input 
          id="phone" 
          value={data.phone} 
          onChange={(e) => onChange('phone', e.target.value)} 
          placeholder="+1 (555) 000-0000" 
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input 
          id="location" 
          value={data.location} 
          onChange={(e) => onChange('location', e.target.value)} 
          placeholder="San Francisco, CA" 
        />
      </div>
    </div>
    <div className="space-y-2">
      <Label htmlFor="linkedin">LinkedIn Profile</Label>
      <Input 
        id="linkedin" 
        value={data.linkedin} 
        onChange={(e) => onChange('linkedin', e.target.value)} 
        placeholder="linkedin.com/in/johndoe" 
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="summary">Professional Summary</Label>
      <Textarea 
        id="summary" 
        value={data.professionalSummary} 
        onChange={(e) => onChange('professionalSummary', e.target.value)} 
        placeholder="Brief overview of your professional background and goals..." 
        rows={4} 
      />
    </div>
  </div>
);

const EducationForm = ({ education, onAdd, onRemove, onChange }: any) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold mb-4">Education</h2>
    {education.map((edu: Education, index: number) => (
      <Card key={index} className="p-4 relative">
        {education.length > 1 && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="absolute top-2 right-2" 
            onClick={() => onRemove(index)}
          >
            <X className="w-4 h-4" />
          </Button>
        )}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Degree *</Label>
            <Input 
              value={edu.degree} 
              onChange={(e) => onChange(index, 'degree', e.target.value)} 
              placeholder="Bachelor of Science in Computer Science" 
            />
          </div>
          <div className="space-y-2">
            <Label>Institution *</Label>
            <Input 
              value={edu.institution} 
              onChange={(e) => onChange(index, 'institution', e.target.value)} 
              placeholder="University of California" 
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Graduation Year</Label>
              <Input 
                value={edu.year} 
                onChange={(e) => onChange(index, 'year', e.target.value)} 
                placeholder="2020" 
              />
            </div>
            <div className="space-y-2">
              <Label>GPA (Optional)</Label>
              <Input 
                value={edu.gpa} 
                onChange={(e) => onChange(index, 'gpa', e.target.value)} 
                placeholder="3.8" 
              />
            </div>
          </div>
        </div>
      </Card>
    ))}
    <Button variant="outline" className="w-full" onClick={onAdd}>
      <Plus className="w-4 h-4 mr-2" />
      Add Another Education
    </Button>
  </div>
);

const ExperienceForm = ({ experience, onAdd, onRemove, onChange }: any) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold mb-4">Work Experience</h2>
    {experience.map((exp: Experience, index: number) => (
      <Card key={index} className="p-4 relative">
        {experience.length > 1 && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="absolute top-2 right-2" 
            onClick={() => onRemove(index)}
          >
            <X className="w-4 h-4" />
          </Button>
        )}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Job Title *</Label>
            <Input 
              value={exp.jobTitle} 
              onChange={(e) => onChange(index, 'jobTitle', e.target.value)} 
              placeholder="Senior Software Engineer" 
            />
          </div>
          <div className="space-y-2">
            <Label>Company *</Label>
            <Input 
              value={exp.company} 
              onChange={(e) => onChange(index, 'company', e.target.value)} 
              placeholder="Tech Corp Inc." 
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <DatePicker
                selected={exp.startDate}
                onChange={(date: Date | null) => onChange(index, 'startDate', date)}
                dateFormat="MM/yyyy"
                showMonthYearPicker
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={15}
                placeholderText="Select start date"
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                wrapperClassName="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <DatePicker
                selected={exp.endDate}
                onChange={(date: Date | null) => onChange(index, 'endDate', date)}
                dateFormat="MM/yyyy"
                showMonthYearPicker
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={15}
                placeholderText="Select end date"
                disabled={exp.currentlyWorking}
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                wrapperClassName="w-full"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id={`currently-working-${index}`}
              checked={exp.currentlyWorking}
              onCheckedChange={(checked) => onChange(index, 'currentlyWorking', checked)}
            />
            <Label htmlFor={`currently-working-${index}`} className="cursor-pointer">
              I currently work here
            </Label>
          </div>
          {exp.duration && (
            <div className="text-sm text-muted-foreground">
              Duration: {exp.duration}
            </div>
          )}
          <div className="space-y-2">
            <Label>Key Responsibilities (one per line)</Label>
            <Textarea 
              value={exp.responsibilities.join('\n')} 
              onChange={(e) => onChange(index, 'responsibilities', e.target.value.split('\n'))} 
              placeholder="Led development of key features&#10;Managed team of 5 engineers&#10;Improved system performance by 40%" 
              rows={5} 
            />
          </div>
        </div>
      </Card>
    ))}
    <Button variant="outline" className="w-full" onClick={onAdd}>
      <Plus className="w-4 h-4 mr-2" />
      Add Another Experience
    </Button>
  </div>
);

const SkillsForm = ({ skills, onChange }: any) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold mb-4">Skills</h2>
    
    <div className="space-y-2">
      <Label>Technical Skills</Label>
      <Input 
        value={skills.technical.join(', ')} 
        onChange={(e) => onChange('technical', e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean))} 
        placeholder="React, TypeScript, Node.js, MongoDB" 
      />
      <p className="text-xs text-muted-foreground">Separate skills with commas</p>
      <div className="flex flex-wrap gap-2 mt-2">
        <p className="text-xs text-muted-foreground w-full">Suggestions:</p>
        {SKILL_SUGGESTIONS.technical.map((skill) => (
          <Button
            key={skill}
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={() => {
              if (!skills.technical.includes(skill)) {
                onChange('technical', [...skills.technical, skill]);
              }
            }}
          >
            + {skill}
          </Button>
        ))}
      </div>
    </div>

    <div className="space-y-2">
      <Label>Soft Skills</Label>
      <Input 
        value={skills.soft.join(', ')} 
        onChange={(e) => onChange('soft', e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean))} 
        placeholder="Leadership, Communication, Problem Solving" 
      />
      <p className="text-xs text-muted-foreground">Separate skills with commas</p>
      <div className="flex flex-wrap gap-2 mt-2">
        <p className="text-xs text-muted-foreground w-full">Suggestions:</p>
        {SKILL_SUGGESTIONS.soft.map((skill) => (
          <Button
            key={skill}
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={() => {
              if (!skills.soft.includes(skill)) {
                onChange('soft', [...skills.soft, skill]);
              }
            }}
          >
            + {skill}
          </Button>
        ))}
      </div>
    </div>
  </div>
);

const ProjectsForm = ({ projects, onAdd, onRemove, onChange }: any) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold mb-4">Projects</h2>
    {projects.map((proj: Project, index: number) => (
      <Card key={index} className="p-4 relative">
        {projects.length > 1 && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="absolute top-2 right-2" 
            onClick={() => onRemove(index)}
          >
            <X className="w-4 h-4" />
          </Button>
        )}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Project Title</Label>
            <Input 
              value={proj.title} 
              onChange={(e) => onChange(index, 'title', e.target.value)} 
              placeholder="E-commerce Platform" 
            />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea 
              value={proj.description} 
              onChange={(e) => onChange(index, 'description', e.target.value)} 
              placeholder="Built a full-stack e-commerce platform with payment integration..." 
              rows={4} 
            />
          </div>
          <div className="space-y-2">
            <Label>Technologies Used</Label>
            <Input 
              value={proj.technologies.join(', ')} 
              onChange={(e) => onChange(index, 'technologies', e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean))} 
              placeholder="React, Node.js, MongoDB" 
            />
          </div>
          <div className="space-y-2">
            <Label>Project Link (Optional)</Label>
            <Input 
              value={proj.link} 
              onChange={(e) => onChange(index, 'link', e.target.value)} 
              placeholder="https://github.com/..." 
            />
          </div>
        </div>
      </Card>
    ))}
    <Button variant="outline" className="w-full" onClick={onAdd}>
      <Plus className="w-4 h-4 mr-2" />
      Add Another Project
    </Button>
  </div>
);

const TemplateSelectionForm = ({ achievements, certifications, template, onTemplateChange, onChange }: any) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold mb-4">Final Touches</h2>
    
    <div className="space-y-2">
      <Label>Choose Template *</Label>
      <Select value={template} onValueChange={onTemplateChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select a template" />
        </SelectTrigger>
        <SelectContent>
          {TEMPLATE_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-xs text-muted-foreground">
        Preview updates automatically when you select a template
      </p>
    </div>

    <div className="space-y-2">
      <Label>Achievements (one per line)</Label>
      <Textarea 
        value={achievements.join('\n')} 
        onChange={(e) => onChange('achievements', e.target.value.split('\n').filter(Boolean))} 
        placeholder="Employee of the Year 2023&#10;Published 3 technical articles&#10;Led successful product launch" 
        rows={4} 
      />
    </div>
    
    <div className="space-y-2">
      <Label>Certifications (one per line)</Label>
      <Textarea 
        value={certifications.join('\n')} 
        onChange={(e) => onChange('certifications', e.target.value.split('\n').filter(Boolean))} 
        placeholder="AWS Certified Solutions Architect&#10;Google Cloud Professional&#10;Certified Scrum Master" 
        rows={4} 
      />
    </div>

    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <h3 className="font-semibold text-blue-900 mb-2">🎉 Almost Done!</h3>
      <p className="text-sm text-blue-700">
        Review your resume in the preview panel, then click "Save Resume" to finish.
        You can download it as PDF anytime!
      </p>
    </div>
  </div>
);

export default ResumeBuilder;
