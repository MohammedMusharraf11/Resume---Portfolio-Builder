import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Code,
  Lightbulb,
  Mail,
  Save,
  Eye,
  Upload,
  X,
  Globe,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import { toast } from "sonner";
import { portfolioAPI, uploadAPI } from "@/services/api";

const PortfolioEditor = () => {
  const [activeTab, setActiveTab] = useState("about");
  const [portfolioSlug, setPortfolioSlug] = useState<string | null>(null);
  const [portfolioData, setPortfolioData] = useState<any>({
    aboutMe: {
      bio: "",
      tagline: "",
    },
    skills: [],
    projects: [],
    contact: {
      email: "",
      phone: "",
      github: "",
      linkedin: "",
      twitter: "",
      website: "",
      location: "",
    },
  });
  const [saving, setSaving] = useState(false);
  const [uploadingProfile, setUploadingProfile] = useState(false);
  const [uploadingProject, setUploadingProject] = useState<number | null>(null);

  useEffect(() => {
    loadPortfolio();
  }, []);

  const loadPortfolio = async () => {
    try {
      const data = await portfolioAPI.getMy();
      setPortfolioSlug(data.portfolio.slug);
      setPortfolioData(data.portfolio);
    } catch (error) {
      console.log("No portfolio yet");
    }
  };

  const handleProfilePictureUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    setUploadingProfile(true);
    try {
      const response = await uploadAPI.uploadProfilePicture(file);
      setPortfolioData({
        ...portfolioData,
        aboutMe: {
          ...portfolioData.aboutMe,
          profilePicture: response.url,
        },
      });
      toast.success('Profile picture uploaded successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to upload image');
    } finally {
      setUploadingProfile(false);
    }
  };

  const handleProjectImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    projectIndex: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    setUploadingProject(projectIndex);
    try {
      const response = await uploadAPI.uploadProjectImage(file);
      const newProjects = [...portfolioData.projects];
      newProjects[projectIndex].image = response.url;
      setPortfolioData({
        ...portfolioData,
        projects: newProjects,
      });
      toast.success('Project image uploaded successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to upload image');
    } finally {
      setUploadingProject(null);
    }
  };

  const cleanPortfolioData = () => {
    // Filter out empty skills and projects before saving
    const cleanedData = {
      ...portfolioData,
      skills: (portfolioData.skills || []).filter(
        (skill: any) => skill.name && skill.name.trim() !== ""
      ),
      projects: (portfolioData.projects || []).filter(
        (project: any) => project.title && project.title.trim() !== "" && 
                          project.description && project.description.trim() !== ""
      ),
    };
    return cleanedData;
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const cleanedData = cleanPortfolioData();
      const response = await portfolioAPI.createOrUpdate(cleanedData);
      setPortfolioSlug(response.portfolio.slug);
      setPortfolioData(response.portfolio); // Update with saved data
      toast.success("Portfolio saved successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to save portfolio");
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    setSaving(true);
    try {
      const cleanedData = cleanPortfolioData();
      const response = await portfolioAPI.createOrUpdate({
        ...cleanedData,
        isPublished: true,
      });
      setPortfolioSlug(response.portfolio.slug);
      setPortfolioData(response.portfolio); // Update with saved data
      toast.success("Portfolio published! Your portfolio is now live.");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to publish portfolio");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 animate-fade-in">
          <div>
            <h1 className="text-4xl font-bold mb-2">Portfolio Editor</h1>
            <p className="text-muted-foreground">
              Build your professional online presence
            </p>
            {portfolioSlug && portfolioData.isPublished === false && (
              <p className="text-sm text-amber-600 dark:text-amber-400 mt-2">
                ⚠️ Portfolio saved but not published. Click "Publish" to make it live.
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleSave} disabled={saving}>
              <Save className="w-4 h-4 mr-2" />
              {saving ? "Saving..." : "Save Draft"}
            </Button>
            {portfolioSlug ? (
              <a href={`/portfolio/${portfolioSlug}`} target="_blank" rel="noopener noreferrer">
                <Button variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  Live Preview
                </Button>
              </a>
            ) : (
              <Button 
                variant="outline" 
                disabled 
                title="Click 'Save Draft' or 'Publish' first to enable preview"
              >
                <Eye className="w-4 h-4 mr-2" />
                Live Preview
              </Button>
            )}
            <Button
              className="gradient-accent text-white shadow-accent"
              onClick={handlePublish}
              disabled={saving}
            >
              <Globe className="w-4 h-4 mr-2" />
              {saving ? "Publishing..." : "Publish"}
            </Button>
          </div>
        </div>

        {/* Editor Tabs */}
        <Card className="p-6 animate-fade-in">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="about" className="gap-2">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">About Me</span>
              </TabsTrigger>
              <TabsTrigger value="skills" className="gap-2">
                <Code className="w-4 h-4" />
                <span className="hidden sm:inline">Skills</span>
              </TabsTrigger>
              <TabsTrigger value="projects" className="gap-2">
                <Lightbulb className="w-4 h-4" />
                <span className="hidden sm:inline">Projects</span>
              </TabsTrigger>
              <TabsTrigger value="contact" className="gap-2">
                <Mail className="w-4 h-4" />
                <span className="hidden sm:inline">Contact</span>
              </TabsTrigger>
            </TabsList>

            {/* About Me Tab */}
            <TabsContent value="about" className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">About Me Section</h2>

                {/* Profile Picture */}
                <div className="space-y-2">
                  <Label>Profile Picture</Label>
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center overflow-hidden">
                      {portfolioData.aboutMe?.profilePicture ? (
                        <img
                          src={portfolioData.aboutMe.profilePicture}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-12 h-12 text-muted-foreground" />
                      )}
                    </div>
                    <div className="space-y-2">
                      <input
                        type="file"
                        id="profile-picture"
                        accept="image/*"
                        onChange={handleProfilePictureUpload}
                        className="hidden"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => document.getElementById('profile-picture')?.click()}
                        disabled={uploadingProfile}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        {uploadingProfile ? 'Uploading...' : 'Upload Photo'}
                      </Button>
                      <p className="text-xs text-muted-foreground">
                        Recommended: Square image, at least 400x400px, max 5MB
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tagline */}
                <div className="space-y-2">
                  <Label htmlFor="tagline">Tagline</Label>
                  <Input
                    id="tagline"
                    placeholder="Software Engineer | Problem Solver | Tech Enthusiast"
                    value={portfolioData.aboutMe?.tagline || ""}
                    onChange={(e) =>
                      setPortfolioData({
                        ...portfolioData,
                        aboutMe: { ...portfolioData.aboutMe, tagline: e.target.value },
                      })
                    }
                  />
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell your story..."
                    rows={8}
                    value={portfolioData.aboutMe?.bio || ""}
                    onChange={(e) =>
                      setPortfolioData({
                        ...portfolioData,
                        aboutMe: { ...portfolioData.aboutMe, bio: e.target.value },
                      })
                    }
                  />
                  <p className="text-xs text-muted-foreground">
                    Supports markdown formatting
                  </p>
                </div>
              </div>
            </TabsContent>

            {/* Skills Tab */}
            <TabsContent value="skills" className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h2 className="text-2xl font-bold">Skills Section</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Add your technical and professional skills with proficiency levels
                    </p>
                  </div>
                  <Button
                    onClick={() => {
                      const newSkill = { name: "", level: 50, category: "technical" };
                      setPortfolioData({
                        ...portfolioData,
                        skills: [...(portfolioData.skills || []), newSkill],
                      });
                      toast.success("New skill added");
                    }}
                    className="gradient-primary text-white"
                  >
                    + Add Skill
                  </Button>
                </div>

                {/* Skills List */}
                <div className="space-y-3">
                  {portfolioData.skills && portfolioData.skills.length > 0 ? (
                    portfolioData.skills.map((skill: any, index: number) => (
                      <Card key={index} className="p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-3">
                          <div className="flex-1 space-y-3">
                            <div className="flex items-center gap-3">
                              <Input
                                placeholder="Skill name (e.g., JavaScript)"
                                value={skill.name || ""}
                                onChange={(e) => {
                                  const newSkills = [...portfolioData.skills];
                                  newSkills[index].name = e.target.value;
                                  setPortfolioData({
                                    ...portfolioData,
                                    skills: newSkills,
                                  });
                                }}
                                className="flex-1"
                              />
                              <div className="flex items-center gap-2 min-w-[120px]">
                                <Input
                                  type="range"
                                  min="0"
                                  max="100"
                                  value={skill.level || 50}
                                  onChange={(e) => {
                                    const newSkills = [...portfolioData.skills];
                                    newSkills[index].level = parseInt(e.target.value);
                                    setPortfolioData({
                                      ...portfolioData,
                                      skills: newSkills,
                                    });
                                  }}
                                  className="flex-1 cursor-pointer"
                                />
                                <span className="text-sm font-medium min-w-[45px] text-right">
                                  {skill.level}%
                                </span>
                              </div>
                            </div>
                            {/* Progress Bar Preview */}
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full gradient-primary transition-all duration-300"
                                style={{ width: `${skill.level}%` }}
                              />
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              const newSkills = portfolioData.skills.filter(
                                (_: any, i: number) => i !== index
                              );
                              setPortfolioData({
                                ...portfolioData,
                                skills: newSkills,
                              });
                              toast.success("Skill removed");
                            }}
                            className="hover:bg-destructive/10 hover:text-destructive"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <Card className="border-dashed">
                      <div className="text-center py-12 text-muted-foreground">
                        <Code className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p className="font-medium">No skills added yet</p>
                        <p className="text-sm mt-1">Click "Add Skill" to showcase your expertise!</p>
                      </div>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Projects Tab */}
            <TabsContent value="projects" className="space-y-6">
              <div className="space-y-6">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h2 className="text-2xl font-bold">Projects Showcase</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Showcase your best work. Fields marked with * are required.
                    </p>
                  </div>
                  <Button
                    onClick={() => {
                      const newProject = {
                        title: "",
                        description: "",
                        technologies: [],
                        githubLink: "",
                        liveLink: "",
                        image: "",
                      };
                      setPortfolioData({
                        ...portfolioData,
                        projects: [...(portfolioData.projects || []), newProject],
                      });
                      toast.success("New project added");
                    }}
                    className="gradient-primary text-white"
                  >
                    + Add Project
                  </Button>
                </div>

                {/* Project Cards */}
                <div className="space-y-4">
                  {portfolioData.projects && portfolioData.projects.length > 0 ? (
                    portfolioData.projects.map((project: any, index: number) => (
                      <Card key={index} className="p-5 hover:shadow-md transition-shadow">
                        <div className="space-y-4">
                          <div className="flex justify-between items-start gap-3">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                                <Lightbulb className="w-4 h-4" />
                              </div>
                              <h3 className="text-lg font-semibold">
                                {project.title || `Project ${index + 1}`}
                              </h3>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                const newProjects = portfolioData.projects.filter(
                                  (_: any, i: number) => i !== index
                                );
                                setPortfolioData({
                                  ...portfolioData,
                                  projects: newProjects,
                                });
                                toast.success("Project removed");
                              }}
                              className="hover:bg-destructive/10 hover:text-destructive"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>

                          <div className="grid gap-4">
                            <div className="space-y-1.5">
                              <Label className="text-xs font-medium">Project Title *</Label>
                              <Input
                                placeholder="E-commerce Platform"
                                value={project.title || ""}
                                onChange={(e) => {
                                  const newProjects = [...portfolioData.projects];
                                  newProjects[index].title = e.target.value;
                                  setPortfolioData({
                                    ...portfolioData,
                                    projects: newProjects,
                                  });
                                }}
                              />
                            </div>

                            <div className="space-y-1.5">
                              <Label className="text-xs font-medium">Description *</Label>
                              <Textarea
                                placeholder="Describe your project and its key features..."
                                rows={3}
                                value={project.description || ""}
                                onChange={(e) => {
                                  const newProjects = [...portfolioData.projects];
                                  newProjects[index].description = e.target.value;
                                  setPortfolioData({
                                    ...portfolioData,
                                    projects: newProjects,
                                  });
                                }}
                              />
                            </div>

                            <div className="space-y-1.5">
                              <Label className="text-xs font-medium">Technologies</Label>
                              <Input
                                placeholder="React, Node.js, MongoDB"
                                value={
                                  Array.isArray(project.technologies)
                                    ? project.technologies.join(", ")
                                    : ""
                                }
                                onChange={(e) => {
                                  const newProjects = [...portfolioData.projects];
                                  newProjects[index].technologies = e.target.value
                                    .split(",")
                                    .map((tech: string) => tech.trim())
                                    .filter((tech: string) => tech);
                                  setPortfolioData({
                                    ...portfolioData,
                                    projects: newProjects,
                                  });
                                }}
                              />
                              {project.technologies && project.technologies.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 mt-2">
                                  {project.technologies.map((tech: string, i: number) => (
                                    <span
                                      key={i}
                                      className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>

                            <div className="grid sm:grid-cols-2 gap-3">
                              <div className="space-y-1.5">
                                <Label className="text-xs font-medium">GitHub Link</Label>
                                <Input
                                  placeholder="https://github.com/..."
                                  value={project.githubLink || ""}
                                  onChange={(e) => {
                                    const newProjects = [...portfolioData.projects];
                                    newProjects[index].githubLink = e.target.value;
                                    setPortfolioData({
                                      ...portfolioData,
                                      projects: newProjects,
                                    });
                                  }}
                                />
                              </div>
                              <div className="space-y-1.5">
                                <Label className="text-xs font-medium">Live Demo Link</Label>
                                <Input
                                  placeholder="https://..."
                                  value={project.liveLink || ""}
                                  onChange={(e) => {
                                    const newProjects = [...portfolioData.projects];
                                    newProjects[index].liveLink = e.target.value;
                                    setPortfolioData({
                                      ...portfolioData,
                                      projects: newProjects,
                                    });
                                  }}
                                />
                              </div>
                            </div>

                            <div className="space-y-1.5">
                              <Label className="text-xs font-medium">Project Image</Label>
                              {project.image && (
                                <div className="relative w-full h-40 rounded-lg overflow-hidden bg-muted mb-2">
                                  <img
                                    src={project.image}
                                    alt={project.title || 'Project'}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )}
                              <div className="flex gap-2">
                                <input
                                  type="file"
                                  id={`project-image-${index}`}
                                  accept="image/*"
                                  onChange={(e) => handleProjectImageUpload(e, index)}
                                  className="hidden"
                                />
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    document.getElementById(`project-image-${index}`)?.click()
                                  }
                                  disabled={uploadingProject === index}
                                  className="flex-1"
                                >
                                  <Upload className="w-4 h-4 mr-2" />
                                  {uploadingProject === index ? 'Uploading...' : 'Upload Image'}
                                </Button>
                                <Input
                                  placeholder="Or paste image URL"
                                  value={project.image || ""}
                                  onChange={(e) => {
                                    const newProjects = [...portfolioData.projects];
                                    newProjects[index].image = e.target.value;
                                    setPortfolioData({
                                      ...portfolioData,
                                      projects: newProjects,
                                    });
                                  }}
                                  className="flex-1"
                                />
                              </div>
                              <p className="text-xs text-muted-foreground">
                                Upload an image or paste a URL (max 5MB)
                              </p>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <Card className="border-dashed">
                      <div className="text-center py-12 text-muted-foreground">
                        <Lightbulb className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p className="font-medium">No projects added yet</p>
                        <p className="text-sm mt-1">Click "Add Project" to showcase your work!</p>
                      </div>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Contact Tab */}
            <TabsContent value="contact" className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Contact Information</h2>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    value={portfolioData.contact?.email || ""}
                    onChange={(e) =>
                      setPortfolioData({
                        ...portfolioData,
                        contact: { ...portfolioData.contact, email: e.target.value },
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (Optional)</Label>
                  <Input
                    id="phone"
                    placeholder="+1 (555) 000-0000"
                    value={portfolioData.contact?.phone || ""}
                    onChange={(e) =>
                      setPortfolioData({
                        ...portfolioData,
                        contact: { ...portfolioData.contact, phone: e.target.value },
                      })
                    }
                  />
                </div>

                <div className="space-y-3">
                  <Label>Social Links</Label>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Github className="w-5 h-5 text-muted-foreground" />
                      <Input
                        placeholder="https://github.com/johndoe"
                        value={portfolioData.contact?.github || ""}
                        onChange={(e) =>
                          setPortfolioData({
                            ...portfolioData,
                            contact: { ...portfolioData.contact, github: e.target.value },
                          })
                        }
                      />
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Linkedin className="w-5 h-5 text-muted-foreground" />
                      <Input
                        placeholder="https://linkedin.com/in/johndoe"
                        value={portfolioData.contact?.linkedin || ""}
                        onChange={(e) =>
                          setPortfolioData({
                            ...portfolioData,
                            contact: { ...portfolioData.contact, linkedin: e.target.value },
                          })
                        }
                      />
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Twitter className="w-5 h-5 text-muted-foreground" />
                      <Input
                        placeholder="https://twitter.com/johndoe"
                        value={portfolioData.contact?.twitter || ""}
                        onChange={(e) =>
                          setPortfolioData({
                            ...portfolioData,
                            contact: { ...portfolioData.contact, twitter: e.target.value },
                          })
                        }
                      />
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Globe className="w-5 h-5 text-muted-foreground" />
                      <Input
                        placeholder="https://yourwebsite.com"
                        value={portfolioData.contact?.website || ""}
                        onChange={(e) =>
                          setPortfolioData({
                            ...portfolioData,
                            contact: { ...portfolioData.contact, website: e.target.value },
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="San Francisco, CA"
                    value={portfolioData.contact?.location || ""}
                    onChange={(e) =>
                      setPortfolioData({
                        ...portfolioData,
                        contact: { ...portfolioData.contact, location: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default PortfolioEditor;
