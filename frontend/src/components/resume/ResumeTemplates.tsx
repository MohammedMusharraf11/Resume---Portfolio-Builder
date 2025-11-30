// Professional Resume Templates inspired by Enhancv
import React from 'react';

interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    linkedin: string;
    location: string;
    professionalSummary: string;
  };
  education: Array<{
    degree: string;
    institution: string;
    year: string;
    gpa: string;
  }>;
  experience: Array<{
    jobTitle: string;
    company: string;
    duration: string;
    currentlyWorking?: boolean;
    responsibilities: string[];
  }>;
  skills: {
    technical: string[];
    soft: string[];
  };
  projects: Array<{
    title: string;
    description: string;
    technologies: string[];
    link: string;
  }>;
  achievements: string[];
  certifications: string[];
}

interface TemplateProps {
  data: ResumeData;
}

// Template 1: Blue Compact (Two-column with photo)
export const BlueCompactTemplate: React.FC<TemplateProps> = ({ data }) => (
  <div className="bg-white w-full h-full p-8 text-gray-900" style={{ fontFamily: 'Arial, sans-serif' }}>
    {/* Header with Photo */}
    <div className="flex justify-between items-start mb-6 pb-4 border-b-2 border-blue-500">
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-blue-600 mb-2">{data.personalInfo.fullName || 'Your Name'}</h1>
        <p className="text-sm text-gray-600 mb-1">{data.personalInfo.email}</p>
        <p className="text-sm text-gray-600 mb-1">{data.personalInfo.phone}</p>
        <p className="text-sm text-gray-600">{data.personalInfo.location}</p>
        {data.personalInfo.linkedin && <p className="text-sm text-blue-600">{data.personalInfo.linkedin}</p>}
      </div>
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
        {data.personalInfo.fullName?.charAt(0) || 'U'}
      </div>
    </div>

    <div className="grid grid-cols-3 gap-6">
      {/* Left Column - 2/3 width */}
      <div className="col-span-2 space-y-4">
        {/* Experience */}
        {data.experience.some(e => e.jobTitle) && (
          <div>
            <h2 className="text-lg font-bold text-blue-600 mb-3 uppercase tracking-wide">Experience</h2>
            {data.experience.map((exp, idx) => (
              exp.jobTitle && (
                <div key={idx} className="mb-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-base">{exp.jobTitle}</h3>
                    <span className="text-xs text-gray-500">{exp.duration}</span>
                  </div>
                  <p className="text-sm text-blue-600 mb-2">{exp.company}</p>
                  {exp.responsibilities.filter(Boolean).length > 0 && (
                    <ul className="list-disc list-inside text-xs space-y-1 text-gray-700">
                      {exp.responsibilities.filter(Boolean).map((resp, i) => (
                        <li key={i}>{resp}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )
            ))}
          </div>
        )}

        {/* Education */}
        {data.education.some(e => e.degree) && (
          <div>
            <h2 className="text-lg font-bold text-blue-600 mb-3 uppercase tracking-wide">Education</h2>
            {data.education.map((edu, idx) => (
              edu.degree && (
                <div key={idx} className="mb-3">
                  <h3 className="font-bold text-sm">{edu.degree}</h3>
                  <p className="text-xs text-gray-600">{edu.institution} • {edu.year}</p>
                  {edu.gpa && <p className="text-xs text-gray-600">GPA: {edu.gpa}</p>}
                </div>
              )
            ))}
          </div>
        )}
      </div>

      {/* Right Column - 1/3 width */}
      <div className="space-y-4">
        {/* Summary */}
        {data.personalInfo.professionalSummary && (
          <div>
            <h2 className="text-lg font-bold text-blue-600 mb-2 uppercase tracking-wide">Summary</h2>
            <p className="text-xs text-gray-700 leading-relaxed">{data.personalInfo.professionalSummary}</p>
          </div>
        )}

        {/* Skills */}
        {(data.skills.technical.length > 0 || data.skills.soft.length > 0) && (
          <div>
            <h2 className="text-lg font-bold text-blue-600 mb-2 uppercase tracking-wide">Skills</h2>
            {data.skills.technical.length > 0 && (
              <div className="mb-2">
                <div className="flex flex-wrap gap-1">
                  {data.skills.technical.map((skill, idx) => (
                    <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{skill}</span>
                  ))}
                </div>
              </div>
            )}
            {data.skills.soft.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {data.skills.soft.map((skill, idx) => (
                  <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">{skill}</span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Achievements */}
        {data.achievements.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-blue-600 mb-2 uppercase tracking-wide">Key Achievements</h2>
            <ul className="space-y-1">
              {data.achievements.map((ach, idx) => (
                <li key={idx} className="text-xs text-gray-700 flex items-start">
                  <span className="text-blue-600 mr-1">★</span>
                  <span>{ach}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Certifications */}
        {data.certifications.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-blue-600 mb-2 uppercase tracking-wide">Certifications</h2>
            <ul className="space-y-1">
              {data.certifications.map((cert, idx) => (
                <li key={idx} className="text-xs text-gray-700">• {cert}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  </div>
);

// Template 2: Clean Professional (Single column, centered)
export const CleanProfessionalTemplate: React.FC<TemplateProps> = ({ data }) => (
  <div className="bg-white w-full h-full p-8 text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
    {/* Header */}
    <div className="text-center mb-6 pb-4 border-b-2 border-gray-800">
      <h1 className="text-4xl font-bold mb-2">{data.personalInfo.fullName || 'Your Name'}</h1>
      <p className="text-sm text-gray-600">
        {data.personalInfo.email} • {data.personalInfo.phone} • {data.personalInfo.location}
      </p>
      {data.personalInfo.linkedin && <p className="text-sm text-gray-600">{data.personalInfo.linkedin}</p>}
    </div>

    {/* Summary */}
    {data.personalInfo.professionalSummary && (
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-3 text-center">Summary</h2>
        <p className="text-sm text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">
          {data.personalInfo.professionalSummary}
        </p>
      </div>
    )}

    {/* Experience */}
    {data.experience.some(e => e.jobTitle) && (
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4 text-center border-b border-gray-300 pb-2">Experience</h2>
        {data.experience.map((exp, idx) => (
          exp.jobTitle && (
            <div key={idx} className="mb-4">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold text-base">{exp.company}</h3>
                <span className="text-sm text-gray-500">{exp.duration}</span>
              </div>
              <p className="text-sm italic text-gray-600 mb-2">{exp.jobTitle}</p>
              {exp.responsibilities.filter(Boolean).length > 0 && (
                <ul className="list-disc list-inside text-sm space-y-1 text-gray-700">
                  {exp.responsibilities.filter(Boolean).map((resp, i) => (
                    <li key={i}>{resp}</li>
                  ))}
                </ul>
              )}
            </div>
          )
        ))}
      </div>
    )}

    {/* Skills */}
    {(data.skills.technical.length > 0 || data.skills.soft.length > 0) && (
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-3 text-center border-b border-gray-300 pb-2">Skills</h2>
        <div className="text-center">
          <p className="text-sm text-gray-700">
            {[...data.skills.technical, ...data.skills.soft].join(' • ')}
          </p>
        </div>
      </div>
    )}

    {/* Education */}
    {data.education.some(e => e.degree) && (
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-3 text-center border-b border-gray-300 pb-2">Education</h2>
        {data.education.map((edu, idx) => (
          edu.degree && (
            <div key={idx} className="mb-3 text-center">
              <h3 className="font-bold text-sm">{edu.institution}</h3>
              <p className="text-sm text-gray-600">{edu.degree} • {edu.year}</p>
              {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
            </div>
          )
        ))}
      </div>
    )}

    {/* Achievements */}
    {data.achievements.length > 0 && (
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-3 text-center border-b border-gray-300 pb-2">Key Achievements</h2>
        <div className="grid grid-cols-2 gap-3">
          {data.achievements.map((ach, idx) => (
            <div key={idx} className="text-sm text-gray-700 text-center p-2 bg-gray-50 rounded">
              {ach}
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

// Template 3: Modern Two-Column (Sidebar layout)
export const ModernTwoColumnTemplate: React.FC<TemplateProps> = ({ data }) => (
  <div className="bg-white w-full h-full flex text-gray-900" style={{ fontFamily: 'Helvetica, sans-serif' }}>
    {/* Left Sidebar - 1/3 */}
    <div className="w-1/3 bg-gray-800 text-white p-6">
      <div className="mb-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-3xl font-bold mx-auto mb-4">
          {data.personalInfo.fullName?.charAt(0) || 'U'}
        </div>
        <h1 className="text-2xl font-bold text-center mb-2">{data.personalInfo.fullName || 'Your Name'}</h1>
      </div>

      {/* Contact */}
      <div className="mb-6">
        <h2 className="text-sm font-bold mb-3 uppercase tracking-wide border-b border-gray-600 pb-2">Contact</h2>
        <div className="space-y-2 text-xs">
          <p>{data.personalInfo.email}</p>
          <p>{data.personalInfo.phone}</p>
          <p>{data.personalInfo.location}</p>
          {data.personalInfo.linkedin && <p className="text-teal-300">{data.personalInfo.linkedin}</p>}
        </div>
      </div>

      {/* Skills */}
      {(data.skills.technical.length > 0 || data.skills.soft.length > 0) && (
        <div className="mb-6">
          <h2 className="text-sm font-bold mb-3 uppercase tracking-wide border-b border-gray-600 pb-2">Skills</h2>
          <div className="space-y-3">
            {data.skills.technical.length > 0 && (
              <div>
                <p className="text-xs font-semibold mb-2 text-teal-300">Technical</p>
                <div className="space-y-1">
                  {data.skills.technical.map((skill, idx) => (
                    <div key={idx} className="text-xs">
                      <div className="flex justify-between mb-1">
                        <span>{skill}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-1">
                        <div className="bg-teal-400 h-1 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {data.skills.soft.length > 0 && (
              <div>
                <p className="text-xs font-semibold mb-2 text-teal-300">Soft Skills</p>
                <div className="flex flex-wrap gap-1">
                  {data.skills.soft.map((skill, idx) => (
                    <span key={idx} className="text-xs bg-gray-700 px-2 py-1 rounded">{skill}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.some(e => e.degree) && (
        <div className="mb-6">
          <h2 className="text-sm font-bold mb-3 uppercase tracking-wide border-b border-gray-600 pb-2">Education</h2>
          {data.education.map((edu, idx) => (
            edu.degree && (
              <div key={idx} className="mb-3">
                <p className="text-xs font-bold">{edu.degree}</p>
                <p className="text-xs text-gray-400">{edu.institution}</p>
                <p className="text-xs text-gray-400">{edu.year}</p>
              </div>
            )
          ))}
        </div>
      )}

      {/* Certifications */}
      {data.certifications.length > 0 && (
        <div>
          <h2 className="text-sm font-bold mb-3 uppercase tracking-wide border-b border-gray-600 pb-2">Certifications</h2>
          <ul className="space-y-1">
            {data.certifications.map((cert, idx) => (
              <li key={idx} className="text-xs">• {cert}</li>
            ))}
          </ul>
        </div>
      )}
    </div>

    {/* Right Content - 2/3 */}
    <div className="w-2/3 p-8">
      {/* Summary */}
      {data.personalInfo.professionalSummary && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3 text-teal-600 uppercase tracking-wide">Professional Summary</h2>
          <p className="text-sm text-gray-700 leading-relaxed">{data.personalInfo.professionalSummary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.some(e => e.jobTitle) && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4 text-teal-600 uppercase tracking-wide">Experience</h2>
          {data.experience.map((exp, idx) => (
            exp.jobTitle && (
              <div key={idx} className="mb-4 border-l-2 border-teal-500 pl-4">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-base">{exp.jobTitle}</h3>
                  <span className="text-xs text-gray-500">{exp.duration}</span>
                </div>
                <p className="text-sm text-teal-600 mb-2">{exp.company}</p>
                {exp.responsibilities.filter(Boolean).length > 0 && (
                  <ul className="list-disc list-inside text-sm space-y-1 text-gray-700">
                    {exp.responsibilities.filter(Boolean).map((resp, i) => (
                      <li key={i}>{resp}</li>
                    ))}
                  </ul>
                )}
              </div>
            )
          ))}
        </div>
      )}

      {/* Projects */}
      {data.projects.some(p => p.title) && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4 text-teal-600 uppercase tracking-wide">Projects</h2>
          {data.projects.map((proj, idx) => (
            proj.title && (
              <div key={idx} className="mb-3">
                <h3 className="font-bold text-sm">{proj.title}</h3>
                <p className="text-xs text-gray-700 mb-1">{proj.description}</p>
                {proj.technologies.length > 0 && (
                  <p className="text-xs text-teal-600">Tech: {proj.technologies.join(', ')}</p>
                )}
              </div>
            )
          ))}
        </div>
      )}

      {/* Achievements */}
      {data.achievements.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-3 text-teal-600 uppercase tracking-wide">Key Achievements</h2>
          <ul className="space-y-2">
            {data.achievements.map((ach, idx) => (
              <li key={idx} className="text-sm text-gray-700 flex items-start">
                <span className="text-teal-600 mr-2">▸</span>
                <span>{ach}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </div>
);

// Template selector component
export const getTemplate = (templateName: string) => {
  switch (templateName) {
    case 'blue-compact':
      return BlueCompactTemplate;
    case 'clean-professional':
      return CleanProfessionalTemplate;
    case 'modern-two-column':
      return ModernTwoColumnTemplate;
    default:
      return BlueCompactTemplate;
  }
};
