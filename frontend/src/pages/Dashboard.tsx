import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  FileText,
  Plus,
  Eye,
  Edit,
  Download,
  Briefcase,
  TrendingUp,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { resumeAPI, portfolioAPI } from "@/services/api";

const Dashboard = () => {
  const { user } = useAuth();
  const [resumes, setResumes] = useState<any[]>([]);
  const [portfolio, setPortfolio] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [resumesData, portfolioData] = await Promise.allSettled([
        resumeAPI.getAll(),
        portfolioAPI.getMy()
      ]);

      if (resumesData.status === 'fulfilled') {
        setResumes(resumesData.value.resumes || []);
      }

      if (portfolioData.status === 'fulfilled') {
        setPortfolio(portfolioData.value.portfolio);
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const userName = user?.fullName?.split(' ')[0] || 'User';
  const stats = {
    totalResumes: resumes.length,
    portfolioViews: portfolio?.views || 0,
    lastUpdated: resumes.length > 0 
      ? new Date(resumes[0].updatedAt).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        })
      : 'Never',
  };

  const recentResumes = resumes.slice(0, 3);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar isAuthenticated userName={userName} />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading your dashboard...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated userName={userName} />

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-10 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, {userName}! 👋
          </h1>
          <p className="text-lg text-muted-foreground">
            Ready to take the next step in your career journey?
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-10 animate-fade-in">
          <Card className="p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Resumes</p>
                <p className="text-3xl font-bold">{stats.totalResumes}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 gradient-accent rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Portfolio Views</p>
                <p className="text-3xl font-bold">{stats.portfolioViews}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-success rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Updated</p>
                <p className="text-xl font-bold">{stats.lastUpdated}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-10 animate-fade-in-up">
          <Card className="p-8 border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 gradient-primary rounded-xl flex items-center justify-center">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">Resume Builder</h3>
                <p className="text-muted-foreground">
                  Create a new professional resume or edit your existing ones
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Link to="/resume-builder" className="flex-1">
                <Button className="w-full gradient-primary text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New
                </Button>
              </Link>
              <Link to="/my-resumes" className="flex-1">
                <Button variant="outline" className="w-full">
                  <Eye className="w-4 h-4 mr-2" />
                  View All
                </Button>
              </Link>
            </div>
          </Card>

          <Card className="p-8 border-2 border-accent/20 hover:border-accent/40 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 gradient-accent rounded-xl flex items-center justify-center">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">My Portfolio</h3>
                <p className="text-muted-foreground">
                  Showcase your projects and skills with a beautiful portfolio
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Link to="/portfolio-editor" className="flex-1">
                <Button className="w-full gradient-accent text-white">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Portfolio
                </Button>
              </Link>
              {portfolio && (
                <Link to={`/portfolio/${portfolio.slug}`} className="flex-1">
                  <Button variant="outline" className="w-full">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                </Link>
              )}
            </div>
          </Card>
        </div>

        {/* Recent Resumes */}
        <div className="animate-fade-in-up">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">Recent Resumes</h2>
            <Link to="/my-resumes">
              <Button variant="outline">View All</Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {recentResumes.length > 0 ? (
              recentResumes.map((resume, index) => (
                <Card
                  key={resume._id}
                  className="overflow-hidden hover:shadow-lg transition-all duration-300 group hover:scale-105"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Thumbnail */}
                  <div className="aspect-[8.5/11] bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center relative overflow-hidden">
                    <FileText className="w-20 h-20 text-primary/30" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{resume.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Template: {resume.template} • Edited {new Date(resume.updatedAt).toLocaleDateString()}
                    </p>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Link to={`/resume-builder?id=${resume._id}`} className="flex-1">
                        <Button size="sm" variant="outline" className="w-full">
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                      </Link>
                      <Button size="sm" variant="outline">
                        <Download className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <FileText className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No resumes yet</h3>
                <p className="text-muted-foreground mb-4">Create your first professional resume to get started</p>
                <Link to="/resume-builder">
                  <Button className="gradient-primary text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Resume
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
