import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Phone, ShieldCheck, Package, Clock, AlertTriangle, CheckCircle2, XCircle, RefreshCw } from "lucide-react";
import PageTransition from "@/components/PageTransition";

const ReturnPolicy = () => {
  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Hero Header */}
        <section className="pt-24 pb-16 px-4">
          <div className="container mx-auto max-w-4xl">
            {/* Breadcrumb */}
            <Link
              to="/"
              className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 mb-8"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" strokeWidth={1} />
              <span>Back to Home</span>
            </Link>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">Return & Refund Policy</h1>
            <p className="text-accent text-lg font-medium mb-2">Roop Stone Impex</p>
            <p className="text-sm text-muted-foreground font-medium">
              Effective Date: January 1, 2025 &nbsp;|&nbsp; Last Updated: May 26, 2025
            </p>
          </div>
        </section>

        {/* Key Highlights */}
        <section className="pb-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="bg-card border border-border rounded-lg p-6 text-center group hover:border-accent/40 transition-all duration-300">
                <div className="mb-4 inline-block transform transition-transform duration-300 group-hover:scale-110">
                  <Clock className="h-8 w-8 text-accent mx-auto" strokeWidth={0.75} />
                </div>
                <h3 className="text-sm font-medium mb-1">Report Within</h3>
                <p className="text-2xl font-bold text-accent">48 Hours</p>
                <p className="text-xs text-muted-foreground mt-1">of delivery receipt</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 text-center group hover:border-accent/40 transition-all duration-300">
                <div className="mb-4 inline-block transform transition-transform duration-300 group-hover:scale-110">
                  <ShieldCheck className="h-8 w-8 text-accent mx-auto" strokeWidth={0.75} />
                </div>
                <h3 className="text-sm font-medium mb-1">Quality Guarantee</h3>
                <p className="text-2xl font-bold text-accent">14-Point</p>
                <p className="text-xs text-muted-foreground mt-1">inspection protocol</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 text-center group hover:border-accent/40 transition-all duration-300">
                <div className="mb-4 inline-block transform transition-transform duration-300 group-hover:scale-110">
                  <RefreshCw className="h-8 w-8 text-accent mx-auto" strokeWidth={0.75} />
                </div>
                <h3 className="text-sm font-medium mb-1">Resolution</h3>
                <p className="text-2xl font-bold text-accent">Replacement</p>
                <p className="text-xs text-muted-foreground mt-1">or credit issued</p>
              </div>
            </div>
          </div>
        </section>

        {/* Policy Content */}
        <section className="pb-20 px-4">
          <div className="container mx-auto max-w-4xl space-y-12">

            {/* 1. Overview */}
            <div>
              <h2 className="text-2xl font-bold mb-4 relative inline-block">
                1. Overview
                <span className="absolute bottom-0 left-0 w-12 h-px bg-accent"></span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                At Roop Stone Impex, we stand behind the quality of every stone we ship. Natural stone is a product of nature, and minor variations in color, veining, texture, and shade are inherent characteristics — not defects. This policy outlines the terms under which returns, replacements, or refunds may be processed for orders placed through our website or direct inquiries.
              </p>
            </div>

            {/* 2. Eligibility for Returns */}
            <div>
              <h2 className="text-2xl font-bold mb-4 relative inline-block">
                2. Eligibility for Returns & Claims
                <span className="absolute bottom-0 left-0 w-12 h-px bg-accent"></span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We accept return or replacement claims only under the following circumstances:
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="font-medium text-sm">Damaged During Transit</p>
                    <p className="text-sm text-muted-foreground">Stones that arrive broken, cracked, or chipped due to shipping/handling damage, supported by photographic evidence at the time of delivery.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="font-medium text-sm">Wrong Product Shipped</p>
                    <p className="text-sm text-muted-foreground">If the stone type, finish, size, or specification received does not match the confirmed order and proforma invoice.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="font-medium text-sm">Significant Quality Defects</p>
                    <p className="text-sm text-muted-foreground">Material that fails to meet the agreed-upon specifications regarding thickness tolerance, dimensional accuracy, or structural integrity beyond natural variation.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Non-Returnable Conditions */}
            <div>
              <h2 className="text-2xl font-bold mb-4 relative inline-block">
                3. Non-Returnable Conditions
                <span className="absolute bottom-0 left-0 w-12 h-px bg-accent"></span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Returns or claims will <strong className="text-foreground">not</strong> be accepted in the following cases:
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg">
                  <XCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <p className="text-sm text-muted-foreground">Natural variations in color, shade, veining, texture, or fossil content — these are inherent to natural stone and are not considered defects.</p>
                </div>
                <div className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg">
                  <XCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <p className="text-sm text-muted-foreground">Products that have been installed, cut, modified, or altered after delivery.</p>
                </div>
                <div className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg">
                  <XCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <p className="text-sm text-muted-foreground">Damage caused by improper handling, storage, or installation at the buyer's end.</p>
                </div>
                <div className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg">
                  <XCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <p className="text-sm text-muted-foreground">Claims reported after 48 hours of delivery receipt without prior written notice.</p>
                </div>
                <div className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg">
                  <XCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <p className="text-sm text-muted-foreground">Custom or made-to-order products manufactured to buyer-specific dimensions or finishes.</p>
                </div>
              </div>
            </div>

            {/* 4. How to Report a Claim */}
            <div>
              <h2 className="text-2xl font-bold mb-4 relative inline-block">
                4. How to Report a Claim
                <span className="absolute bottom-0 left-0 w-12 h-px bg-accent"></span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                To initiate a return or replacement claim, please follow these steps within <strong className="text-foreground">48 hours</strong> of receiving your order:
              </p>

              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                  <div>
                    <p className="font-medium text-sm">Document the Issue</p>
                    <p className="text-sm text-muted-foreground">Take clear photographs and/or video of the damaged or incorrect material, including close-up shots and images of the packaging.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                  <div>
                    <p className="font-medium text-sm">Contact Us</p>
                    <p className="text-sm text-muted-foreground">
                      Email us at <a href="mailto:aadi@roopstoneimpex.in" className="text-accent hover:underline">aadi@roopstoneimpex.in</a> or call <a href="tel:+919214083550" className="text-accent hover:underline">+91 9214083550</a> with your order number, description of the issue, and supporting photographs.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                  <div>
                    <p className="font-medium text-sm">Await Assessment</p>
                    <p className="text-sm text-muted-foreground">Our quality team will review your claim within 3–5 business days and respond with a resolution.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 5. Resolution Options */}
            <div>
              <h2 className="text-2xl font-bold mb-4 relative inline-block">
                5. Resolution Options
                <span className="absolute bottom-0 left-0 w-12 h-px bg-accent"></span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Upon approval of your claim, we will offer one of the following resolutions:
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg">
                  <Package className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="font-medium text-sm">Replacement</p>
                    <p className="text-sm text-muted-foreground">We will manufacture and ship replacement material at no additional cost. Replacement timelines depend on the product type and order size (typically 3–6 weeks).</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg">
                  <RefreshCw className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="font-medium text-sm">Credit Note</p>
                    <p className="text-sm text-muted-foreground">A credit note may be issued for the value of the defective material, which can be applied toward a future order.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg">
                  <ShieldCheck className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="font-medium text-sm">Partial Refund</p>
                    <p className="text-sm text-muted-foreground">In cases where replacement is not feasible, a partial refund proportional to the defective quantity may be issued via bank transfer within 15–30 business days.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 6. Shipping Costs for Returns */}
            <div>
              <h2 className="text-2xl font-bold mb-4 relative inline-block">
                6. Shipping Costs
                <span className="absolute bottom-0 left-0 w-12 h-px bg-accent"></span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                If the return is due to a manufacturing defect or incorrect shipment on our end, Roop Stone Impex will bear the cost of return shipping and replacement delivery. If the claim is not covered under this policy, the buyer will be responsible for any associated shipping costs.
              </p>
            </div>

            {/* 7. Order Cancellation */}
            <div>
              <h2 className="text-2xl font-bold mb-4 relative inline-block">
                7. Order Cancellation
                <span className="absolute bottom-0 left-0 w-12 h-px bg-accent"></span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Orders may be cancelled <strong className="text-foreground">before production begins</strong>. Once fabrication has started, cancellation is subject to a restocking fee of up to 30% of the order value, depending on the stage of production.
                </p>
                <p>
                  Custom or made-to-order products <strong className="text-foreground">cannot be cancelled</strong> once production has commenced, as these are manufactured to your specific requirements.
                </p>
              </div>
            </div>

            {/* 8. Samples */}
            <div>
              <h2 className="text-2xl font-bold mb-4 relative inline-block">
                8. Samples
                <span className="absolute bottom-0 left-0 w-12 h-px bg-accent"></span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We strongly recommend ordering physical samples before placing bulk orders. Samples represent the general character of the stone but may not be an exact match to the final batch due to the natural formation process. Samples are non-refundable; however, sample costs may be adjusted against your bulk order.
              </p>
            </div>

            {/* 9. International Orders */}
            <div>
              <h2 className="text-2xl font-bold mb-4 relative inline-block">
                9. International Orders
                <span className="absolute bottom-0 left-0 w-12 h-px bg-accent"></span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                For international shipments, claims must be filed with supporting documentation (photographs, delivery receipts, and inspection reports) within 48 hours of goods being received at the destination port or warehouse. Claims related to customs duties, import taxes, or local handling are the responsibility of the buyer.
              </p>
            </div>

            {/* 10. Dispute Resolution */}
            <div>
              <h2 className="text-2xl font-bold mb-4 relative inline-block">
                10. Dispute Resolution
                <span className="absolute bottom-0 left-0 w-12 h-px bg-accent"></span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                In the event of any dispute arising from a return or refund claim, both parties agree to first attempt resolution through direct communication. If a resolution cannot be reached, the matter shall be subject to the jurisdiction of the courts in Tonk, Rajasthan, India.
              </p>
            </div>

            {/* Important Notice */}
            <div className="bg-card border border-accent/20 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="font-medium text-sm mb-2">Important Notice</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    This return policy is subject to change without prior notice. The policy applicable at the time of purchase will govern your order. We encourage all buyers to review this page before placing an order. By placing an order with Roop Stone Impex, you acknowledge and agree to the terms outlined in this policy.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="border-t border-border pt-10">
              <h2 className="text-2xl font-bold mb-6 relative inline-block">
                Contact Us
                <span className="absolute bottom-0 left-0 w-12 h-px bg-accent"></span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                If you have any questions about this Return & Refund Policy, please reach out to us:
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <a
                  href="mailto:aadi@roopstoneimpex.in"
                  className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:border-accent/40 transition-all duration-300 group"
                >
                  <Mail className="h-5 w-5 text-accent group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-medium">aadi@roopstoneimpex.in</p>
                  </div>
                </a>
                <a
                  href="tel:+919214083550"
                  className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:border-accent/40 transition-all duration-300 group"
                >
                  <Phone className="h-5 w-5 text-accent group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="text-sm font-medium">+91 9214083550</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default ReturnPolicy;
