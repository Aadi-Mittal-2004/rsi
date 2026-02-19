import { useState } from "react";
import { X, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const UrgencyBanner = () => {
  const [isVisible, setIsVisible] = useState(() => {
    return !sessionStorage.getItem("urgencyBannerDismissed");
  });

  if (!isVisible) return null;

  // Determine the current quarter message
  const now = new Date();
  const month = now.getMonth(); // 0-indexed
  let quarterLabel: string;
  let urgencyMessage: string;

  if (month < 3) {
    quarterLabel = `Q1 ${now.getFullYear()}`;
    urgencyMessage = "Pre-monsoon rate lock available — secure Q2 pricing before April 1st increase";
  } else if (month < 6) {
    quarterLabel = `Q2 ${now.getFullYear()}`;
    urgencyMessage = "Monsoon season approaches — container slots filling fast for June-August delivery";
  } else if (month < 9) {
    quarterLabel = `Q3 ${now.getFullYear()}`;
    urgencyMessage = "Post-monsoon capacity is limited — book Q4 containers now for guaranteed delivery";
  } else {
    quarterLabel = `Q4 ${now.getFullYear()}`;
    urgencyMessage = "Year-end demand surge — limited container availability for January delivery";
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-accent text-black">
      <div className="container mx-auto px-4 py-2.5 flex items-center justify-center gap-3 text-sm">
        <AlertTriangle className="h-4 w-4 flex-shrink-0 hidden sm:block" />
        <span className="font-semibold hidden sm:inline">{quarterLabel}:</span>
        <span className="text-center text-xs sm:text-sm">
          {urgencyMessage}
          <Link
            to="/contact#query-form"
            className="font-bold underline underline-offset-2 ml-1.5 hover:no-underline"
          >
            Secure your allocation →
          </Link>
        </span>
        <button
          onClick={() => {
            setIsVisible(false);
            sessionStorage.setItem("urgencyBannerDismissed", "true");
          }}
          className="ml-2 flex-shrink-0 hover:bg-black/10 rounded p-0.5 transition-colors"
          aria-label="Dismiss banner"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default UrgencyBanner;
