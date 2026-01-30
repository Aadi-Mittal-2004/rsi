import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageTransition, { slideUp, staggerContainer } from "@/components/PageTransition";
import { Section } from "@/components/brochure/Section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { ArrowLeft, CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import { TermsModal } from "@/components/TermsModal";

// Google Form configuration
const GOOGLE_FORM_ACTION_URL = "https://docs.google.com/forms/d/e/1FAIpQLScRKwp2_FssRnzl1KqnB5pUnv5oBQhQR8MzgOb5xdFncROE8w/formResponse";

const FORM_FIELDS = {
  email: "entry.1556369182",
  name: "entry.2092238618",
  mobile: "entry.1783094998",
  college: "entry.479301265",
  preferredField: "entry.1734043162",
  hasTeam: "entry.1042120807",
  teamName: "entry.1833869246",
  referralSource: "entry.1515809375",
};

const PREFERRED_FIELDS = ["Design", "Marketing", "Geology", "Content Creation"];
const REFERRAL_SOURCES = ["Social Media", "College Noticeboard/ Email", "Friend/ Colleague", "Other"];

const Apply = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    mobile: "",
    college: "",
    preferredFields: [] as string[],
    hasTeam: "",
    teamName: "",
    referralSource: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [hasAgreedToTerms, setHasAgreedToTerms] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      preferredFields: checked
        ? [...prev.preferredFields, field]
        : prev.preferredFields.filter((f) => f !== field),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.email || !formData.name || !formData.mobile || formData.preferredFields.length === 0 || !formData.hasTeam || !formData.referralSource) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!hasAgreedToTerms) {
      toast.error("You must agree to the Terms & Conditions to apply.");
      return;
    }

    setIsSubmitting(true);

    // Build form data for submission
    const formParams = new URLSearchParams();
    formParams.append(FORM_FIELDS.email, formData.email);
    formParams.append(FORM_FIELDS.name, formData.name);
    formParams.append(FORM_FIELDS.mobile, formData.mobile);
    formParams.append(FORM_FIELDS.college, formData.college);
    
    // Add each selected preferred field
    formData.preferredFields.forEach((field) => {
      formParams.append(FORM_FIELDS.preferredField, field);
    });
    
    formParams.append(FORM_FIELDS.hasTeam, formData.hasTeam);
    if (formData.hasTeam === "Yes" && formData.teamName) {
      formParams.append(FORM_FIELDS.teamName, formData.teamName);
    }
    formParams.append(FORM_FIELDS.referralSource, formData.referralSource);

    try {
      // Submit via fetch with no-cors mode (will succeed but won't return response)
      await fetch(GOOGLE_FORM_ACTION_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formParams.toString(),
      });

      setIsSubmitted(true);
      toast.success("Application submitted successfully!");
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-background text-foreground">
          <div className="pt-20">
            <Section id="success" eyebrow="APPLICATION" title="Application Submitted!" className="py-14 md:py-20">
              <motion.div
                initial="initial"
                animate="animate"
                variants={staggerContainer}
                className="max-w-2xl mx-auto text-center"
              >
                <motion.div variants={slideUp} className="flex justify-center mb-8">
                  <div className="rounded-full bg-accent/10 p-6">
                    <CheckCircle2 className="h-16 w-16 text-accent" />
                  </div>
                </motion.div>
                <motion.p variants={slideUp} className="text-lg text-muted-foreground mb-8">
                  Thank you for applying to The Roop Stone Product Incubator 2026. We've received your application and will be in touch soon.
                </motion.p>
                <motion.div variants={slideUp} className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" size="lg" asChild className="border-accent/40 hover:border-accent">
                    <Link to="/competition">Back to Competition</Link>
                  </Button>
                  <Button variant="ghost" size="lg" asChild>
                    <Link to="/">Go to Homepage</Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild className="border-green-500/40 hover:border-green-500 hover:bg-green-500/10 hover:text-green-500">
                    <a href="https://chat.whatsapp.com/KjFTUrfPmGMHnkSH35vPTc" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Join WhatsApp Group
                    </a>
                  </Button>
                </motion.div>
              </motion.div>
            </Section>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-background text-foreground">
        <div className="pt-20">
          {/* Hero Section */}
          <header className="relative overflow-hidden">
            <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/25 to-background" />
            <div className="container relative py-14 md:py-20">
              <Link
                to="/competition"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors mb-6"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Competition
              </Link>
              <p className="text-sm tracking-[0.28em] text-accent">APPLICATION</p>
              <h1 className="mt-4 text-balance font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                THE ROOP STONE PRODUCT INCUBATOR 2026
              </h1>
              <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                Complete the form below to apply for the residency program. All fields marked with <span className="text-accent">*</span> are required.
              </p>
            </div>
          </header>

          {/* Form Section */}
          <main className="relative pb-20">
            <div className="container">
              <motion.form
                initial="initial"
                animate="animate"
                variants={staggerContainer}
                onSubmit={handleSubmit}
                className="max-w-2xl mx-auto space-y-8"
              >
                {/* Personal Information */}
                <motion.div variants={slideUp}>
                  <Card className="border-green-500/20 bg-green-500/5">
                    <CardContent className="p-6 flex items-center justify-between gap-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-green-500">Join our Community</p>
                        <p className="text-xs text-muted-foreground">Get updates and ask queries in our WhatsApp group.</p>
                      </div>
                      <Button variant="outline" size="sm" asChild className="shrink-0 border-green-500/40 hover:border-green-500 hover:bg-green-500/10 hover:text-green-500">
                        <a href="https://chat.whatsapp.com/KjFTUrfPmGMHnkSH35vPTc" target="_blank" rel="noopener noreferrer">
                          <MessageCircle className="mr-2 h-4 w-4" />
                          Join Group
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Personal Information */}
                <motion.div variants={slideUp}>
                  <Card className="border-0 bg-[#111111]">
                    <CardContent className="p-6 md:p-8 space-y-6">
                      <div>
                        <p className="text-xs tracking-[0.18em] text-accent mb-4">PERSONAL INFORMATION</p>
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-foreground">
                          Email <span className="text-accent">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="bg-[#1A1A1A] border-white/10 focus:border-accent placeholder:text-muted-foreground/50"
                          required
                        />
                      </div>

                      {/* Name */}
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-foreground">
                          Name <span className="text-accent">*</span>
                        </Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className="bg-[#1A1A1A] border-white/10 focus:border-accent placeholder:text-muted-foreground/50"
                          required
                        />
                      </div>

                      {/* Mobile */}
                      <div className="space-y-2">
                        <Label htmlFor="mobile" className="text-foreground">
                          Mobile Number (WhatsApp) <span className="text-accent">*</span>
                        </Label>
                        <Input
                          id="mobile"
                          type="tel"
                          placeholder="+91 9876543210"
                          value={formData.mobile}
                          onChange={(e) => handleInputChange("mobile", e.target.value)}
                          className="bg-[#1A1A1A] border-white/10 focus:border-accent placeholder:text-muted-foreground/50"
                          required
                        />
                      </div>

                      {/* College */}
                      <div className="space-y-2">
                        <Label htmlFor="college" className="text-foreground">
                          College Name
                        </Label>
                        <Input
                          id="college"
                          type="text"
                          placeholder="Your college or university"
                          value={formData.college}
                          onChange={(e) => handleInputChange("college", e.target.value)}
                          className="bg-[#1A1A1A] border-white/10 focus:border-accent placeholder:text-muted-foreground/50"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Preferred Field */}
                <motion.div variants={slideUp}>
                  <Card className="border-0 bg-[#111111]">
                    <CardContent className="p-6 md:p-8 space-y-6">
                      <div>
                        <p className="text-xs tracking-[0.18em] text-accent mb-2">YOUR EXPERTISE</p>
                        <p className="text-sm text-muted-foreground">Select all fields that apply to you.</p>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-foreground">
                          Preferred Field <span className="text-accent">*</span>
                        </Label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                          {PREFERRED_FIELDS.map((field) => (
                            <div
                              key={field}
                              className="flex items-center space-x-3 rounded-lg border border-white/10 bg-[#1A1A1A] p-4 hover:border-accent/40 transition-colors"
                            >
                              <Checkbox
                                id={`field-${field}`}
                                checked={formData.preferredFields.includes(field)}
                                onCheckedChange={(checked) => handleCheckboxChange(field, checked as boolean)}
                                className="border-white/30 data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                              />
                              <Label
                                htmlFor={`field-${field}`}
                                className="text-sm font-normal text-foreground cursor-pointer flex-1"
                              >
                                {field}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Team Information */}
                <motion.div variants={slideUp}>
                  <Card className="border-0 bg-[#111111]">
                    <CardContent className="p-6 md:p-8 space-y-6">
                      <div>
                        <p className="text-xs tracking-[0.18em] text-accent mb-4">TEAM INFORMATION</p>
                      </div>

                      {/* Have a Team? */}
                      <div className="space-y-3">
                        <Label className="text-foreground">
                          Have a Team? <span className="text-accent">*</span>
                        </Label>
                        <RadioGroup
                          value={formData.hasTeam}
                          onValueChange={(value) => handleInputChange("hasTeam", value)}
                          className="flex gap-6 pt-1"
                        >
                          {["Yes", "No"].map((option) => (
                            <div key={option} className="flex items-center space-x-2">
                              <RadioGroupItem
                                value={option}
                                id={`team-${option}`}
                                className="border-white/30 text-accent data-[state=checked]:border-accent"
                              />
                              <Label
                                htmlFor={`team-${option}`}
                                className="text-sm font-normal text-foreground cursor-pointer"
                              >
                                {option}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>

                      {/* Team Name (conditional) */}
                      {formData.hasTeam === "Yes" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-2"
                        >
                          <Label htmlFor="teamName" className="text-foreground">
                            Team Name
                          </Label>
                          <Input
                            id="teamName"
                            type="text"
                            placeholder="Your team's name"
                            value={formData.teamName}
                            onChange={(e) => handleInputChange("teamName", e.target.value)}
                            className="bg-[#1A1A1A] border-white/10 focus:border-accent placeholder:text-muted-foreground/50"
                          />
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Referral Source */}
                <motion.div variants={slideUp}>
                  <Card className="border-0 bg-[#111111]">
                    <CardContent className="p-6 md:p-8 space-y-6">
                      <div>
                        <p className="text-xs tracking-[0.18em] text-accent mb-4">HOW DID YOU FIND US?</p>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-foreground">
                          How did you hear about this event? <span className="text-accent">*</span>
                        </Label>
                        <RadioGroup
                          value={formData.referralSource}
                          onValueChange={(value) => handleInputChange("referralSource", value)}
                          className="grid gap-3 pt-1"
                        >
                          {REFERRAL_SOURCES.map((source) => (
                            <div
                              key={source}
                              className="flex items-center space-x-3 rounded-lg border border-white/10 bg-[#1A1A1A] p-4 hover:border-accent/40 transition-colors"
                            >
                              <RadioGroupItem
                                value={source}
                                id={`source-${source}`}
                                className="border-white/30 text-accent data-[state=checked]:border-accent"
                              />
                              <Label
                                htmlFor={`source-${source}`}
                                className="text-sm font-normal text-foreground cursor-pointer flex-1"
                              >
                                {source}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Terms and Conditions */}
                <motion.div variants={slideUp} className="flex items-start space-x-3 pt-2 px-1">
                  <Checkbox
                    id="terms"
                    checked={hasAgreedToTerms}
                    onCheckedChange={(checked) => setHasAgreedToTerms(checked as boolean)}
                    className="mt-1 border-white/30 data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-muted-foreground"
                    >
                      I agree to the{" "}
                      <button
                        type="button"
                        onClick={() => setShowTerms(true)}
                        className="text-accent hover:underline underline-offset-4"
                      >
                        Terms & Conditions
                      </button>
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      You must agree to the terms to submit your application.
                    </p>
                  </div>
                </motion.div>

                {/* Submit Button */}
                <motion.div variants={slideUp} className="flex flex-col gap-4 pt-4">
                  <Button
                    type="submit"
                    variant="outline"
                    size="lg"
                    disabled={isSubmitting}
                    className="relative w-full border-accent/40 hover:border-accent hover:text-accent transition-colors font-medium text-base py-6 overflow-hidden group"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <span className="relative z-10">Submit Application</span>
                        <span
                          aria-hidden
                          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-accent/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-700"
                        />
                      </>
                    )}
                  </Button>
                  <p className="text-center text-xs text-muted-foreground/60">
                    By submitting, you agree to be contacted regarding The Roop Stone Product Incubator 2026.
                  </p>
                </motion.div>
              </motion.form>
            </div>
          </main>
        </div>
      </div>

      {/* Hidden iframe for form submission fallback */}
      <iframe ref={iframeRef} name="hidden_iframe" style={{ display: "none" }} />
      
      <TermsModal open={showTerms} onOpenChange={setShowTerms} />
    </PageTransition>
  );
};

export default Apply;
