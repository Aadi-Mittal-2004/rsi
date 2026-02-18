import { useState, useEffect, FormEvent } from "react";
import { useLocation } from "react-router-dom";
import { MapPin, Phone, Mail, Send, CheckCircle, AlertCircle } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";

const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

const Contact = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 300);
      }
    }
  }, [location.hash]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          ...formData,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const inputClasses =
    "w-full bg-transparent border border-border rounded-sm px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all duration-300 text-sm tracking-wide";

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 relative inline-block">
              Get in Touch
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-px bg-accent"></span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We'd love to hear from you. Contact us directly to discuss your
              premium natural stone needs.
            </p>
          </div>

          {/* Contact Info Cards */}
          <div className="grid md:grid-cols-3 gap-12 lg:gap-16 max-w-5xl mx-auto">
            <div className="text-center group">
              <div className="mb-6 inline-block transform transition-transform duration-300 group-hover:scale-110">
                <Phone className="h-10 w-10 text-accent" strokeWidth={0.75} />
              </div>
              <h3 className="text-lg font-medium mb-3 tracking-wide">Phone</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-2">
                Reach out to our sales team directly.
              </p>
              <div className="flex flex-col gap-2 mt-4">
                <a href="tel:+919214083550" className="text-foreground text-lg font-medium tracking-wide hover:text-accent transition-colors">
                  +91 9214083550
                </a>
                <a href="tel:+917357923414" className="text-foreground text-lg font-medium tracking-wide hover:text-accent transition-colors">
                  +91 7357923414
                </a>
              </div>
            </div>

            <div className="text-center group">
              <div className="mb-6 inline-block transform transition-transform duration-300 group-hover:scale-110">
                <Mail className="h-10 w-10 text-accent" strokeWidth={0.75} />
              </div>
              <h3 className="text-lg font-medium mb-3 tracking-wide">Email</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-2">For general inquiries and support.</p>
              <a href="mailto:aadi@roopstoneimpex.in" className="text-foreground text-lg font-medium tracking-wide hover:text-accent transition-colors break-all mt-4 inline-block">
                aadi@roopstoneimpex.in
              </a>
            </div>

            <div className="text-center group">
              <div className="mb-6 inline-block transform transition-transform duration-300 group-hover:scale-110">
                <MapPin className="h-10 w-10 text-accent" strokeWidth={0.75} />
              </div>
              <h3 className="text-lg font-medium mb-3 tracking-wide">Address</h3>
              <a
                href="https://maps.app.goo.gl/vCza1eT2qfBgYx9Y9"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground text-lg font-medium tracking-wide hover:text-accent transition-colors mt-4 inline-block"
              >
                Old Ajmer Road, RICCO Industrial Area, Deoli, Rajasthan, India
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="max-w-5xl mx-auto my-24">
            <div className="h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent"></div>
          </div>

          {/* Form + Map Section */}
          <div id="query-form" className="grid lg:grid-cols-2 gap-16 lg:gap-24 max-w-5xl mx-auto pb-16">
            {/* Query Form */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 tracking-wide">
                Send Us a Query
              </h2>
              <p className="text-muted-foreground text-sm mb-10 leading-relaxed">
                Have a question about our stones, pricing, or custom orders? Fill
                out the form below and we'll get back to you shortly.
              </p>

              <form onSubmit={handleSubmit} className="space-y-7">
                <div className="grid sm:grid-cols-2 gap-7">
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium tracking-widest uppercase text-muted-foreground mb-2">
                      Name <span className="text-accent">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-medium tracking-widest uppercase text-muted-foreground mb-2">
                      Email <span className="text-accent">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-7">
                  <div>
                    <label htmlFor="phone" className="block text-xs font-medium tracking-widest uppercase text-muted-foreground mb-2">
                      Phone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.phone}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-xs font-medium tracking-widest uppercase text-muted-foreground mb-2">
                      Subject <span className="text-accent">*</span>
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      placeholder="e.g. Bulk order inquiry"
                      value={formData.subject}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-medium tracking-widest uppercase text-muted-foreground mb-2">
                    Message <span className="text-accent">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell us about your requirements…"
                    value={formData.message}
                    onChange={handleChange}
                    className={`${inputClasses} resize-none`}
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={status === "sending"}
                  variant="outline"
                  size="lg"
                  className="btn-cta-hover px-10 py-8 text-lg hover:border-foreground"
                >
                  {status === "sending" ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" strokeWidth={1.5} />
                      Send Message
                    </>
                  )}
                </Button>

                {/* Status Messages */}
                {status === "success" && (
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm mt-3 animate-fade-in">
                    <CheckCircle className="h-4 w-4" />
                    Your message has been sent successfully! We'll get back to you soon.
                  </div>
                )}
                {status === "error" && (
                  <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm mt-3 animate-fade-in">
                    <AlertCircle className="h-4 w-4" />
                    Something went wrong. Please try again or contact us directly.
                  </div>
                )}
              </form>
            </div>

            {/* Embedded Google Map */}
            <div className="flex flex-col">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 tracking-wide">
                Our Location
              </h2>
              <p className="text-muted-foreground text-sm mb-10 leading-relaxed">
                Visit our factory in the heart of Rajasthan's stone belt.
              </p>
              <div className="flex-1 min-h-[400px] border border-border overflow-hidden shadow-sm">
                <iframe
                  title="Roop Stone Impex Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3577.5!2d75.3834753!3d25.7781625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396ee72f6aaaaaab%3A0x94b6a61d6c89c8ab!2sROOP%20STONE%20IMPEX!5e0!3m2!1sen!2sin!4v1700000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "400px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
              <a
                href="https://maps.app.goo.gl/vCza1eT2qfBgYx9Y9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-sm text-muted-foreground hover:text-accent transition-colors"
              >
                <MapPin className="h-4 w-4" />
                Open in Google Maps →
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Contact;
