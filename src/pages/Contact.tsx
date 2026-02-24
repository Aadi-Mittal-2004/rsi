import { useState, useEffect, FormEvent } from "react";
import { useLocation } from "react-router-dom";
import { MapPin, Phone, Mail, Send, CheckCircle, AlertCircle, ArrowRight, ArrowLeft, ChevronRight, Gem, Landmark, Mountain, Layers, Sparkles, CircleHelp } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

const stoneTypes = [
  { id: "quartzite", label: "Quartzite", icon: Gem },
  { id: "sandstone", label: "Sandstone", icon: Landmark },
  { id: "limestone", label: "Limestone", icon: Mountain },
  { id: "slate", label: "Slate", icon: Layers },
  { id: "marble", label: "Marble", icon: Sparkles },
  { id: "other", label: "Not Sure / Multiple", icon: CircleHelp },
];

const quantityOptions = [
  { id: "sample", label: "Samples First" },
  { id: "1-5", label: "1 to 5 Containers" },
  { id: "5-20", label: "5 to 20 Containers" },
  { id: "20+", label: "20+ Containers" },
  { id: "ongoing", label: "Ongoing Supply" },
];

const Contact = () => {
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 300);
      }
    }
  }, [location.hash]);

  // Multi-step form data
  const [formData, setFormData] = useState({
    stoneType: "",
    quantity: "",
    name: "",
    email: "",
    phone: "",
    country: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New Quote Request: ${formData.stoneType} — ${formData.quantity}`,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          stone_type: formData.stoneType,
          quantity: formData.quantity,
          message: formData.message,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setStatus("success");
        // Don't reset immediately, show success message
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const canProceedStep1 = formData.stoneType !== "";
  const canProceedStep2 = formData.quantity !== "";

  const inputClasses =
    "w-full bg-transparent border border-border rounded-sm px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all duration-300 text-sm tracking-wide";

  const stepVariants = {
    enter: { opacity: 0, x: 30 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
  };

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 relative inline-block">
              Let's Talk Stone
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-px bg-accent"></span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Most buyers don't reach out until they've already been burned by a bad supplier.
              You're smarter than that. Tell us what you need, we respond within 4 hours.
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
                Speak directly to our export team.
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
              <p className="text-muted-foreground text-sm leading-relaxed mb-2">For detailed inquiries and quote requests.</p>
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
            {/* Multi-Step Query Form */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2 tracking-wide">
                Request a Quote
              </h2>
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                Tell us the stone type, quantity, and destination, we'll send you a detailed
                quote with FOB pricing within 24 hours.
              </p>

              {/* Progress Steps */}
              <div className="flex items-center gap-2 mb-10">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                        step < currentStep
                          ? "bg-accent text-black"
                          : step === currentStep
                          ? "bg-accent/20 text-accent border border-accent"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {step < currentStep ? <CheckCircle className="h-4 w-4" /> : step}
                    </div>
                    {step < 3 && (
                      <div
                        className={`w-12 h-px transition-all duration-300 ${
                          step < currentStep ? "bg-accent" : "bg-border"
                        }`}
                      />
                    )}
                  </div>
                ))}
                <span className="ml-3 text-xs text-muted-foreground">
                  Step {currentStep} of {totalSteps}
                </span>
              </div>

              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-500/10 border border-green-500/20 rounded-lg p-8 text-center"
                >
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Quote Request Received!</h3>
                  <p className="text-muted-foreground mb-8">
                    Thank you, {formData.name}. We have received your request for{" "}
                    <span className="text-accent">{formData.stoneType}</span>. We will send you a detailed
                    FOB quote to <strong>{formData.email}</strong> within 24 hours.
                  </p>
                  <Button
                    onClick={() => {
                      setFormData({
                        stoneType: "",
                        quantity: "",
                        name: "",
                        email: "",
                        phone: "",
                        country: "",
                        message: "",
                      });
                      setCurrentStep(1);
                      setStatus("idle");
                    }}
                    className="bg-accent text-[#F7F5F3] hover:bg-accent/90 px-8 py-3 rounded-full"
                  >
                    Send Another Request
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                  {/* STEP 1: Stone Type (trivial commitment) */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      variants={stepVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.2 }}
                    >
                      <h3 className="text-lg font-semibold mb-2">What stone are you looking for?</h3>
                      <p className="text-xs text-muted-foreground mb-6">Select one to get started — takes 30 seconds.</p>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                        {stoneTypes.map((stone) => (
                          <button
                            key={stone.id}
                            type="button"
                            onClick={() => setFormData((prev) => ({ ...prev, stoneType: stone.label }))}
                            className={`group p-4 rounded-sm border text-left transition-all duration-200 hover:border-accent/50 ${
                              formData.stoneType === stone.label
                                ? "border-accent bg-accent/10 text-foreground"
                                : "border-border text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            <span className={`mb-3 block transition-colors duration-200 ${
                              formData.stoneType === stone.label ? "text-accent" : "text-muted-foreground group-hover:text-accent"
                            }`}>
                              <stone.icon className="h-7 w-7" strokeWidth={1.5} />
                            </span>
                            <span className="text-sm font-medium">{stone.label}</span>
                          </button>
                        ))}
                      </div>

                      <Button
                        type="button"
                        disabled={!canProceedStep1}
                        onClick={() => setCurrentStep(2)}
                        className="bg-accent text-[#F7F5F3] hover:bg-accent/90 px-8 py-6 text-sm font-semibold disabled:opacity-40"
                      >
                        <span className="mr-2">Next: Quantity</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  )}

                  {/* STEP 2: Quantity (slightly larger commitment) */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      variants={stepVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.2 }}
                    >
                      <h3 className="text-lg font-semibold mb-2">How much do you need?</h3>
                      <p className="text-xs text-muted-foreground mb-6">
                        Selected: <span className="text-accent font-medium">{formData.stoneType}</span>
                      </p>

                      <div className="space-y-3 mb-8">
                        {quantityOptions.map((option) => (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => setFormData((prev) => ({ ...prev, quantity: option.label }))}
                            className={`w-full p-4 rounded-sm border text-left transition-all duration-200 flex items-center justify-between hover:border-accent/50 ${
                              formData.quantity === option.label
                                ? "border-accent bg-accent/10 text-foreground"
                                : "border-border text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            <span className="text-sm font-medium">{option.label}</span>
                            <ChevronRight className={`h-4 w-4 transition-opacity ${
                              formData.quantity === option.label ? "opacity-100 text-accent" : "opacity-0"
                            }`} />
                          </button>
                        ))}
                      </div>

                      <div className="flex gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setCurrentStep(1)}
                          className="px-6 py-6 text-sm"
                        >
                          <ArrowLeft className="h-4 w-4 mr-2" />
                          Back
                        </Button>
                        <Button
                          type="button"
                          disabled={!canProceedStep2}
                          onClick={() => setCurrentStep(3)}
                          className="bg-accent text-[#F7F5F3] hover:bg-accent/90 px-8 py-6 text-sm font-semibold disabled:opacity-40"
                        >
                          <span className="mr-2">Next: Your Details</span>
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: Contact Details (the real ask) */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      variants={stepVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.2 }}
                    >
                      <h3 className="text-lg font-semibold mb-1">Almost done — where should we send the quote?</h3>
                      <p className="text-xs text-muted-foreground mb-6">
                        <span className="text-accent font-medium">{formData.stoneType}</span> · {formData.quantity}
                      </p>

                      <div className="space-y-5">
                        <div className="grid sm:grid-cols-2 gap-5">
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

                        <div className="grid sm:grid-cols-2 gap-5">
                          <div>
                            <label htmlFor="phone" className="block text-xs font-medium tracking-widest uppercase text-muted-foreground mb-2">
                              Phone / WhatsApp
                            </label>
                            <input
                              id="phone"
                              name="phone"
                              type="tel"
                              placeholder="+1 XXX XXX XXXX"
                              value={formData.phone}
                              onChange={handleChange}
                              className={inputClasses}
                            />
                          </div>
                          <div>
                            <label htmlFor="country" className="block text-xs font-medium tracking-widest uppercase text-muted-foreground mb-2">
                              Destination Country <span className="text-accent">*</span>
                            </label>
                            <input
                              id="country"
                              name="country"
                              type="text"
                              required
                              placeholder="e.g. United Kingdom"
                              value={formData.country}
                              onChange={handleChange}
                              className={inputClasses}
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="message" className="block text-xs font-medium tracking-widest uppercase text-muted-foreground mb-2">
                            Specifications (optional)
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            rows={3}
                            placeholder="Size, thickness, finish, quantity in sq.m..."
                            value={formData.message}
                            onChange={handleChange}
                            className={`${inputClasses} resize-none`}
                          />
                        </div>
                      </div>

                      <div className="flex gap-3 mt-8">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setCurrentStep(2)}
                          className="px-6 py-6 text-sm"
                        >
                          <ArrowLeft className="h-4 w-4 mr-2" />
                          Back
                        </Button>
                        <Button
                          type="submit"
                          disabled={status === "sending"}
                          className="bg-accent text-[#F7F5F3] hover:bg-accent/90 px-8 py-6 text-sm font-semibold flex-1"
                        >
                          {status === "sending" ? (
                            <>
                              <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                              </svg>
                              Sending…
                            </>
                          ) : (
                            <>
                              <Send className="h-4 w-4 mr-2" strokeWidth={1.5} />
                              Get My Quote
                            </>
                          )}
                        </Button>
                      </div>

                      {/* Status Messages */}

                      {status === "error" && (
                        <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm mt-4 animate-fade-in p-4 bg-red-500/10 rounded-sm">
                          <AlertCircle className="h-5 w-5 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Something went wrong.</p>
                            <p className="text-xs mt-1 opacity-80">Please try again or WhatsApp us directly at +91 9214083550.</p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
              )}
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
