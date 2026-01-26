'use client';

import { useState, useEffect, useRef } from 'react';
import anime from 'animejs';
import { 
  Send, 
  Mail, 
  Briefcase, 
  Code, 
  Smartphone, 
  Palette, 
  Video, 
  MessageSquare,
  Clock,
  CheckCircle,
  ArrowRight,
  Github,
  Linkedin,
  Twitter
} from 'lucide-react';

const socialLinks = [
  {
    id: 1,
    name: 'GitHub',
    url: 'https://github.com/kabirnagdev',
    icon: Github,
  },
  {
    id: 2,
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/kabir-nagdev-8a330a2b4/',
    icon: Linkedin,
  },
  {
    id: 3,
    name: 'Twitter',
    url: 'https://x.com/kabirnagdevv',
    icon: Twitter,
  },
];

const serviceTypes = [
  {
    id: 'web',
    name: 'Web Development',
    icon: Code,
    description: 'Full-stack web applications, websites, and web services',
  },
  {
    id: 'app',
    name: 'App Development',
    icon: Smartphone,
    description: 'Cross-platform mobile apps with Flutter',
  },
  {
    id: 'design',
    name: 'UI/UX Design',
    icon: Palette,
    description: 'User interfaces, branding, and visual design',
  },
  {
    id: 'video',
    name: 'Video Editing',
    icon: Video,
    description: 'Professional video editing and motion graphics',
  },
  {
    id: 'consult',
    name: 'Consultation',
    icon: MessageSquare,
    description: 'Tech advice, code review, and project planning',
  },
  {
    id: 'other',
    name: 'Other',
    icon: Briefcase,
    description: 'Custom projects and collaborations',
  },
];

export default function Connect() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    budget: '',
    timeline: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate title
            anime({
              targets: sectionRef.current?.querySelector('.section-title'),
              opacity: [0, 1],
              translateY: [30, 0],
              easing: 'easeOutExpo',
              duration: 800,
            });

            // Animate service cards
            anime({
              targets: servicesRef.current?.querySelectorAll('.service-card'),
              opacity: [0, 1],
              translateY: [20, 0],
              scale: [0.95, 1],
              easing: 'easeOutExpo',
              duration: 600,
              delay: anime.stagger(100, { start: 300 }),
            });

            // Animate form section
            anime({
              targets: formRef.current,
              opacity: [0, 1],
              translateY: [30, 0],
              easing: 'easeOutExpo',
              duration: 800,
              delay: 800,
            });

            // Animate social links
            anime({
              targets: sectionRef.current?.querySelectorAll('.social-link'),
              opacity: [0, 1],
              translateX: [-20, 0],
              easing: 'easeOutExpo',
              duration: 600,
              delay: anime.stagger(100, { start: 1000 }),
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(selectedService === serviceId ? null : serviceId);
    
    // Animate selection
    anime({
      targets: `.service-card[data-id="${serviceId}"]`,
      scale: [1, 1.02, 1],
      duration: 300,
      easing: 'easeOutElastic(1, .5)',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Build mailto link with form data
    const selectedServiceName = serviceTypes.find(s => s.id === selectedService)?.name || 'General Inquiry';
    const subject = encodeURIComponent(`[${selectedServiceName}] Project Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Hi Kabir,\n\n` +
      `I'm reaching out regarding: ${selectedServiceName}\n\n` +
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Budget: ${formData.budget || 'Not specified'}\n` +
      `Timeline: ${formData.timeline || 'Not specified'}\n\n` +
      `Message:\n${formData.message}\n\n` +
      `Looking forward to hearing from you!`
    );

    // Simulate brief loading then open email
    setTimeout(() => {
      window.location.href = `mailto:kabirnagdev@outlook.com?subject=${subject}&body=${body}`;
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset after showing success
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', budget: '', timeline: '', message: '' });
        setSelectedService(null);
      }, 3000);
    }, 500);
  };

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16 section-title opacity-0">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let's Work Together
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind? I'd love to hear about it. Select a service below and let's discuss how I can help bring your ideas to life.
          </p>
          <div className="w-20 h-1 bg-primary mx-auto mt-6" />
        </div>

        {/* Services Selection */}
        <div ref={servicesRef} className="mb-16">
          <h3 className="text-lg font-semibold text-foreground mb-6 text-center">What can I help you with?</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {serviceTypes.map((service) => {
              const IconComponent = service.icon;
              const isSelected = selectedService === service.id;
              
              return (
                <button
                  key={service.id}
                  data-id={service.id}
                  onClick={() => handleServiceSelect(service.id)}
                  className={`service-card opacity-0 p-4 rounded-xl border transition-all duration-300 text-left group ${
                    isSelected 
                      ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20' 
                      : 'border-primary/10 bg-secondary/20 hover:border-primary/30 hover:bg-secondary/40'
                  }`}
                >
                  <div className={`p-2 rounded-lg w-fit mb-3 transition-colors duration-300 ${
                    isSelected ? 'bg-primary/20' : 'bg-primary/10 group-hover:bg-primary/15'
                  }`}>
                    <IconComponent className={`w-5 h-5 transition-colors duration-300 ${
                      isSelected ? 'text-primary' : 'text-primary/70 group-hover:text-primary'
                    }`} />
                  </div>
                  <h4 className={`text-sm font-medium mb-1 transition-colors duration-300 ${
                    isSelected ? 'text-foreground' : 'text-foreground/80'
                  }`}>
                    {service.name}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {service.description}
                  </p>
                  {isSelected && (
                    <div className="mt-2 flex items-center gap-1 text-xs text-primary">
                      <CheckCircle className="w-3 h-3" />
                      Selected
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Form */}
          <div ref={formRef} className="lg:col-span-3 opacity-0">
            <div className="glass-card-hover p-8">
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary" />
                Send a Message
              </h3>
              
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">Message Ready!</h4>
                  <p className="text-muted-foreground">Your email client should open with the message. Looking forward to connecting!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground/80 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-secondary/30 border border-primary/10 rounded-lg focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all duration-300 text-foreground placeholder:text-muted-foreground"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground/80 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-secondary/30 border border-primary/10 rounded-lg focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all duration-300 text-foreground placeholder:text-muted-foreground"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-foreground/80 mb-2">
                        Budget Range
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-[#0a0a0f] border border-primary/10 rounded-lg focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all duration-300 text-foreground [&>option]:bg-[#0a0a0f] [&>option]:text-foreground"
                      >
                        <option value="">Select budget</option>
                        <option value="< $500">Less than $500</option>
                        <option value="$500 - $1,000">$500 - $1,000</option>
                        <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                        <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                        <option value="$10,000+">$10,000+</option>
                        <option value="Let's discuss">Let's discuss</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="timeline" className="block text-sm font-medium text-foreground/80 mb-2">
                        Timeline
                      </label>
                      <select
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-[#0a0a0f] border border-primary/10 rounded-lg focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all duration-300 text-foreground [&>option]:bg-[#0a0a0f] [&>option]:text-foreground"
                      >
                        <option value="">Select timeline</option>
                        <option value="ASAP">ASAP</option>
                        <option value="1-2 weeks">1-2 weeks</option>
                        <option value="1 month">1 month</option>
                        <option value="2-3 months">2-3 months</option>
                        <option value="3+ months">3+ months</option>
                        <option value="Flexible">Flexible</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground/80 mb-2">
                      Project Details *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-secondary/30 border border-primary/10 rounded-lg focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all duration-300 text-foreground placeholder:text-muted-foreground resize-none"
                      placeholder="Tell me about your project, goals, and any specific requirements..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Preparing...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Contact */}
            <div className="glass-card-hover p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Quick Contact</h3>
              <a
                href="mailto:kabirnagdev@outlook.com"
                className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg hover:bg-primary/10 border border-primary/10 hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email me at</p>
                  <p className="text-foreground font-medium">kabirnagdev@outlook.com</p>
                </div>
              </a>
            </div>

            {/* Response Time */}
            <div className="glass-card-hover p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Response Time</h3>
                  <p className="text-sm text-muted-foreground">Usually within 24-48 hours</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span>Free initial consultation</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span>Clear project timeline</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span>Regular progress updates</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="glass-card-hover p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Connect Elsewhere</h3>
              <div className="space-y-3">
                {socialLinks.map((link) => {
                  const IconComponent = link.icon;
                  return (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link opacity-0 flex items-center gap-3 p-3 bg-secondary/30 rounded-lg hover:bg-primary/10 border border-primary/10 hover:border-primary/30 transition-all duration-300 group"
                    >
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                        <IconComponent className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-foreground font-medium">{link.name}</span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Availability Status */}
            <div className="glass-card-hover p-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-75" />
                </div>
                <div>
                  <p className="text-foreground font-medium">Currently Available</p>
                  <p className="text-sm text-muted-foreground">Open for new projects</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground">
            Prefer a quick chat? Feel free to reach out on any platform above.
          </p>
        </div>
      </div>
    </section>
  );
}
