import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  FileText,
  Plus,
  Edit,
  Download,
  Trash2,
  Search,
  Filter,
  MoreVertical,
  Eye,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { resumeAPI } from "@/services/api";
import { getTemplate } from "@/components/resume/ResumeTemplates";

// Mini preview component for thumbnails
const ResumePreviewThumbnail = ({ resume }: any) => {
  const TemplateComponent = getTemplate(resume.template || 'blue-compact');
  return (
    <div className="bg-white">
      <TemplateComponent data={resume} />
    </div>
  );
};

const MyResumes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedResume, setSelectedResume] = useState<string | null>(null);
  const [resumes, setResumes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResumes();
  }, []);

  const loadResumes = async () => {
    try {
      const data = await resumeAPI.getAll();
      setResumes(data.resumes || []);
    } catch (error) {
      toast.error("Failed to load resumes");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedResume) return;
    try {
      await resumeAPI.delete(selectedResume);
      toast.success("Resume deleted successfully");
      setResumes(resumes.filter(r => r._id !== selectedResume));
    } catch (error) {
      toast.error("Failed to delete resume");
    } finally {
      setDeleteDialogOpen(false);
      setSelectedResume(null);
    }
  };

  const handleDownload = async (id: string, title: string) => {
    toast.info("Generating PDF...");
    // PDF download will be implemented
  };

  const filteredResumes = resumes.filter((resume) =>
    resume.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 animate-fade-in">
          <div>
            <h1 className="text-4xl font-bold mb-2">My Resumes</h1>
            <p className="text-muted-foreground">
              Manage and edit your professional resumes
            </p>
          </div>
          <Link to="/resume-builder">
            <Button className="gradient-primary text-white shadow-primary">
              <Plus className="w-4 h-4 mr-2" />
              Create New Resume
            </Button>
          </Link>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-fade-in">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search resumes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>

        {/* Resumes Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading resumes...</p>
            </div>
          </div>
        ) : filteredResumes.length === 0 ? (
          <Card className="p-12 text-center">
            <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No resumes found</h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery
                ? "Try adjusting your search query"
                : "Create your first resume to get started"}
            </p>
            {!searchQuery && (
              <Link to="/resume-builder">
                <Button className="gradient-primary text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Resume
                </Button>
              </Link>
            )}
          </Card>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResumes.map((resume, index) => (
              <Card
                key={resume._id}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 group animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Thumbnail Preview */}
                <div className="aspect-[8.5/11] bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden cursor-pointer border-b-2 border-border">
                  <Link to={`/resume-builder?id=${resume._id}`} className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <FileText className="w-20 h-20 text-primary/30 mx-auto mb-2" />
                      <p className="text-xs text-muted-foreground font-medium capitalize">{resume.template}</p>
                    </div>
                  </Link>
                  
                  {/* Status Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        resume.isPublished ? "bg-success text-white" : "bg-warning text-white"
                      }`}>
                      {resume.isPublished ? "Published" : "Draft"}
                    </span>
                  </div>

                  {/* Hover Actions */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 z-10">
                    <div className="flex gap-2">
                      <Link to={`/resume-builder?id=${resume._id}`}>
                        <Button size="sm" className="gradient-primary text-white">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg truncate">{resume.title}</h3>
                      <p className="text-sm text-muted-foreground">Template: {resume.template}</p>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Link to={`/resume-builder?id=${resume._id}`}>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem onClick={() => handleDownload(resume._id, resume.title)}>
                          <Download className="w-4 h-4 mr-2" />
                          Download PDF
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => {
                            setSelectedResume(resume._id);
                            setDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <p className="text-xs text-muted-foreground mb-4">
                    Last edited: {new Date(resume.updatedAt).toLocaleDateString()}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Link to={`/resume-builder?id=${resume._id}`} className="flex-1">
                      <Button size="sm" variant="outline" className="w-full">
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                    </Link>
                    <Button size="sm" variant="outline" onClick={() => handleDownload(resume._id, resume.title)}>
                      <Download className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              resume from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MyResumes;
