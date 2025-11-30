import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  User,
  Mail,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Globe,
  ExternalLink,
  Send,
} from "lucide-react";
import { toast } from "sonner";
import { portfolioAPI } from "@/services/api";

const PortfolioView = () => {
  const { username } = useParams();
  const [portfolio, setPortfolio] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    if (username) {
      loadPortfolio();
    }
  }, [username]);

  const loadPortfolio = async () => {
    try {
      const data = await portfolioAPI.getBySlug(username!);
      setPortfolio(data.portfolio);
    } catch (error) {
      toast.error("Portfolio not found");
    } finally {
      setLoading(false);
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent successfully!");
    setContactForm({ name: "", email: "", message: "" });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <User className="w-10 h-10 text-muted-foreground" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Portfolio Not Found</h1>
          <p className="text-muted-foreground mb-6">
            This portfolio doesn't exist or hasn't been published yet.
          </p>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>If this is your portfolio:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Make sure you've saved your portfolio</li>
              <li>Click the "Publish" button to make it live</li>
              <li>Check that you're using the correct URL</li>
            </ul>
          </div>
          <a href="/portfolio-editor" className="inline-block mt-6">
            <Button className="gradient-primary text-white">
              Go to Portfolio Editor
            </Button>
          </a>
        </div>
      </div>
    );
  }

  const skills = portfolio.skills || [];
  const projects = portfolio.projects || [];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-accent/10 to-background overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            {/* Profile Picture */}
            <div className="w-32 h-32 mx-auto mb-8 rounded-full gradient-primary p-1">
              <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                <User className="w-16 h-16 text-muted-foreground" />
              </div>
            </div>

            {/* Name and Title */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4">
              {portfolio.user?.fullName || 'User'}
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-8">
              {portfolio.aboutMe?.tagline || 'Professional Developer'}
            </p>

            {/* Social Links */}
            <div className="flex justify-center gap-4 mb-12">
              {portfolio.contact?.github && (
                <a
                  href={portfolio.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-card hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg hover:scale-110"
                >
                  <Github className="w-5 h-5" />
                </a>
              )}
              {portfolio.contact?.linkedin && (
                <a
                  href={portfolio.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-card hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg hover:scale-110"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {portfolio.contact?.twitter && (
                <a
                  href={portfolio.contact.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-card hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg hover:scale-110"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              {portfolio.contact?.website && (
                <a
                  href={portfolio.contact.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-card hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg hover:scale-110"
                >
                  <Globe className="w-5 h-5" />
                </a>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#contact">
                <Button
                  size="lg"
                  className="gradient-primary text-white shadow-primary hover:scale-105 transition-transform"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Get In Touch
                </Button>
              </a>
              <a href="#projects">
                <Button
                  size="lg"
                  variant="outline"
                  className="hover:scale-105 transition-transform"
                >
                  View My Work
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center p-2">
            <div className="w-1 h-3 bg-primary rounded-full"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">About Me</h2>
            <Card className="p-8">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {portfolio.aboutMe?.bio || 'No bio available yet.'}
              </p>
              {portfolio.contact?.email && (
                <div className="flex items-center gap-2 mt-6 text-muted-foreground">
                  <Mail className="w-5 h-5" />
                  <span>{portfolio.contact.email}</span>
                </div>
              )}
              {portfolio.contact?.phone && (
                <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                  <MapPin className="w-5 h-5" />
                  <span>{portfolio.contact.phone}</span>
                </div>
              )}
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Skills & Expertise</h2>
            <Card className="p-8">
              {skills.length > 0 ? (
                <div className="space-y-6">
                  {skills.map((skill: any, index: number) => (
                    <div key={skill.name} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-lg">{skill.name}</span>
                        <span className="text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full gradient-primary transition-all duration-1000 ease-out"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground">No skills added yet.</p>
              )}
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Featured Projects</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.length > 0 ? (
                projects.map((project: any, index: number) => (
                  <Card
                    key={project._id || index}
                    className="p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 group animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Project Image Placeholder */}
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg mb-4 flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-colors">
                      {project.image ? (
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover rounded-lg" />
                      ) : (
                        <Globe className="w-12 h-12 text-muted-foreground" />
                      )}
                    </div>

                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground mb-4 text-sm">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech: string) => (
                          <span
                            key={tech}
                            className="text-xs bg-accent/10 text-accent px-2 py-1 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Links */}
                    <div className="flex gap-2">
                      {project.githubLink && (
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex-1">
                          <Button variant="outline" size="sm" className="w-full">
                            <Github className="w-4 h-4 mr-1" />
                            Code
                          </Button>
                        </a>
                      )}
                      {project.liveLink && (
                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex-1">
                          <Button size="sm" className="w-full gradient-accent text-white">
                            <ExternalLink className="w-4 h-4 mr-1" />
                            Demo
                          </Button>
                        </a>
                      )}
                    </div>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">No projects added yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold mb-4 text-center">Get In Touch</h2>
            <p className="text-center text-muted-foreground mb-12">
              Have a project in mind or want to collaborate? I'd love to hear from you!
            </p>

            <Card className="p-8">
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={contactForm.name}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-email">Email</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={contactForm.email}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, email: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell me about your project..."
                    rows={6}
                    value={contactForm.message}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, message: e.target.value })
                    }
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full gradient-primary text-white shadow-primary h-12"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>

              {/* Contact Info */}
              {portfolio.contact?.email && (
                <div className="mt-8 pt-8 border-t border-border text-center">
                  <p className="text-muted-foreground mb-4">Or reach me directly at:</p>
                  <a
                    href={`mailto:${portfolio.contact.email}`}
                    className="text-primary hover:underline font-medium"
                  >
                    {portfolio.contact.email}
                  </a>
                </div>
              )}
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-card border-t border-border">
        <div className="container mx-auto px-4">
          <p className="text-center text-muted-foreground">
            © 2024 {portfolio.user?.fullName || 'User'}. Built with ❤️ using ResumeForge
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PortfolioView;
