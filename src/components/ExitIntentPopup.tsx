import { useState, useEffect, useCallback } from "react";
import { X, Download, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import QualityChecklistModal from "@/components/QualityChecklistModal";

const ExitIntentPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);

  const handleMouseLeave = useCallback(
    (e: MouseEvent) => {
      // Only trigger when mouse moves toward the top of the viewport (browser chrome)
      if (e.clientY <= 5 && !isDismissed && !isVisible) {
        // Check if already shown this session
        const alreadyShown = sessionStorage.getItem("exitPopupShown");
        if (!alreadyShown) {
          setIsVisible(true);
          sessionStorage.setItem("exitPopupShown", "true");
        }
      }
    },
    [isDismissed, isVisible]
  );

  useEffect(() => {
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [handleMouseLeave]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
  };

  const handleOpenChecklist = () => {
    setIsVisible(false);
    setIsChecklistOpen(true);
  };

  return (
    <>
      {isVisible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
            onClick={handleDismiss}
          />

          {/* Popup */}
          <div className="relative bg-card border border-border rounded-lg shadow-2xl max-w-lg w-full p-8 md:p-10 animate-scale-in z-10">
            {/* Close button */}
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close popup"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Content */}
            <div className="text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-5">
                <Download className="h-6 w-6 text-accent" />
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                Before you go —
              </h3>

              <p className="text-lg text-foreground font-medium mb-2">
                Are you sure you want to risk your next shipment?
              </p>

              <p className="text-sm text-muted-foreground mb-8 leading-relaxed max-w-md mx-auto">
                Most stone importers who leave without comparing packing methods end up
                paying 15-25% more in breakage losses. Get our free 14-Point Quality
                Checklist — the same protocol we use for every container.
              </p>

              {/* CTA Buttons */}
              <div className="space-y-3">
                <Button
                  size="lg"
                  className="w-full bg-accent text-[#F7F5F3] hover:bg-accent/90 py-6 text-base font-semibold"
                  onClick={handleOpenChecklist}
                >
                  <span className="mr-2">Get the Free Checklist</span>
                  <ArrowRight className="h-5 w-5" />
                </Button>

                <button
                  onClick={handleDismiss}
                  className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors"
                >
                  No thanks, I'll take the risk →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <QualityChecklistModal
        open={isChecklistOpen}
        onOpenChange={setIsChecklistOpen}
      />
    </>
  );
};

export default ExitIntentPopup;
