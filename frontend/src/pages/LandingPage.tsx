import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/layout/Navbar";
import {
  FileEdit,
  Palette,
  FileDown,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Star,
  Eye,
  Lock,
  Award,
  PenTool,
} from "lucide-react";

const LandingPage = () => {
  const features = [
    {
      icon: PenTool,
      title: "Professional Resume Builder",
      description: "Create stunning resumes with our intuitive multi-step builder and live preview.",
    },
    {
      icon: Palette,
      title: "Multiple Templates",
      description: "Choose from a variety of professionally designed templates that stand out.",
    },
    {
      icon: Award,
      title: "Portfolio Showcase",
      description: "Build a beautiful portfolio website to showcase your projects and skills.",
    },
    {
      icon: FileDown,
      title: "PDF Export",
      description: "Download your resume as a high-quality PDF ready to send to employers.",
    },
    {
      icon: Eye,
      title: "Real-time Preview",
      description: "See your changes instantly with our live preview as you build your resume.",
    },
    {
      icon: Lock,
      title: "Secure & Private",
      description: "Your data is encrypted and secure. We never share your information.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer at Google",
      content: "ResumeForge helped me land my dream job! The templates are modern and the builder is so easy to use.",
      rating: 5,
    },
    {
      name: "Michael Rodriguez",
      role: "Product Designer",
      content: "The portfolio feature is incredible. I got 3x more interview calls after sharing my ResumeForge portfolio.",
      rating: 5,
    },
    {
      name: "Emily Thompson",
      role: "Marketing Manager",
      content: "Best resume builder I've used. Clean, professional, and the PDF export quality is outstanding.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32 lg:py-40">
        {/* Decorative Background Elements */}
        <div className="absolute top-20 right-0 w-96 h-96 blob-shape animate-pulse"></div>
        <div className="absolute bottom-20 left-0 w-80 h-80 blob-shape-2 animate-pulse" style={{ animationDelay: "1s" }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm border border-primary/20 text-primary px-5 py-2.5 rounded-full text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              <span>Join 50,000+ professionals building their future</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-bold mb-6 leading-tight">
              Craft Your Perfect Resume & Portfolio
            </h1>
            
            <p className="text-xl sm:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Create professional resumes and stunning portfolios in minutes. 
              Stand out from the crowd and land your dream job.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/signup">
                <Button 
                  size="lg" 
                  className="gradient-primary text-white shadow-primary text-lg h-16 px-10 rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/login">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg h-16 px-10 rounded-2xl border-2 hover:bg-card hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                >
                  Sign In
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>Free forever plan</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-32 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6">
              Everything You Need<br />to Succeed
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to help you stand out and land your dream job
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group p-8 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-fade-in border-2 border-border/50 hover:border-primary/20 rounded-2xl bg-gradient-to-br from-card to-card/50"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 gradient-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-md">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 sm:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Loved by Professionals
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of successful professionals who trust ResumeForge
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-warning text-warning" />
                  ))}
                </div>
                <p className="text-foreground mb-4 italic">"{testimonial.content}"</p>
                <div className="border-t border-border pt-4">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 sm:py-40 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-95"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] blob-shape opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] blob-shape-2 opacity-20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold mb-8 leading-tight">
              Ready to Stand Out?
            </h2>
            <p className="text-xl sm:text-2xl mb-12 text-white/90 max-w-2xl mx-auto leading-relaxed">
              Join thousands of professionals building their dream careers
            </p>
            <Link to="/signup">
              <Button 
                size="lg" 
                className="text-lg h-16 px-12 rounded-2xl bg-white text-primary hover:bg-white/95 hover:shadow-2xl hover:scale-105 transition-all duration-300 font-semibold"
              >
                Start Building Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <p className="text-white/80 mt-6 text-sm">
              No credit card required • Get started in under 2 minutes
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <FileEdit className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">ResumeForge</span>
            </div>
            
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors">Contact Us</a>
            </div>
            
            <p className="text-sm text-muted-foreground">
              © 2024 ResumeForge. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
