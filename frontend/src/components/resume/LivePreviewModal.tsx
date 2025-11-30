import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, X } from 'lucide-react';
import { getTemplate } from './ResumeTemplates';
import { downloadResumePDF } from '@/utils/pdfDownload';
import { toast } from 'sonner';

interface LivePreviewModalProps {
  open: boolean;
  onClose: () => void;
  resumeData: any;
  template: string;
  resumeTitle: string;
}

export const LivePreviewModal: React.FC<LivePreviewModalProps> = ({
  open,
  onClose,
  resumeData,
  template,
  resumeTitle
}) => {
  const [downloading, setDownloading] = React.useState(false);
  const TemplateComponent = getTemplate(template);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await downloadResumePDF('resume-preview-content', resumeTitle || 'resume');
      toast.success('Resume downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download PDF');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl h-[90vh] p-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle>Live Preview</DialogTitle>
            <div className="flex gap-2">
              <Button
                onClick={handleDownload}
                disabled={downloading}
                className="gradient-accent text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                {downloading ? 'Generating PDF...' : 'Download PDF'}
              </Button>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="flex-1 overflow-auto p-6 bg-gray-100">
          <div 
            id="resume-preview-content"
            className="max-w-[210mm] mx-auto bg-white shadow-lg"
            style={{ 
              minHeight: '297mm',
              aspectRatio: '210/297'
            }}
          >
            <TemplateComponent data={resumeData} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
