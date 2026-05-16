import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle2, MessageCircle, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

interface QualityChecklistModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const checklistSteps = [
  {
    title: "Raw Block Inspection",
    description:
      "Verify quarry block for structural cracks, fossils, and veins before cutting.",
  },
  {
    title: "Dimensional Accuracy Check",
    description:
      "Measure every piece against ordered specs (length × width × thickness ±1 mm).",
  },
  {
    title: "Thickness Calibration",
    description:
      "Gauge calibrated thickness across 5 points per slab to ensure uniform cut.",
  },
  {
    title: "Surface Finish Verification",
    description:
      "Inspect flamed, brushed, polished, or tumbled finish matches the approved sample.",
  },
  {
    title: "Shade Sorting & Matching",
    description:
      "Sort each piece by shade range; separate lots to prevent mismatch in one container.",
  },
  {
    title: "Edge & Arris Integrity",
    description:
      "Check all edges for chips, hairline cracks, and burrs; reject or re-cut as needed.",
  },
  {
    title: "Moisture Content Test",
    description:
      "Ensure stone is air-dried to acceptable moisture level before packing.",
  },
  {
    title: "Piece-by-Piece Visual Screening",
    description:
      "Final visual scan: surface stains, pitting, discoloration, or fill defects.",
  },
  {
    title: "Foam & Cardboard Interleaving",
    description:
      "Place EPE foam sheets between each piece; cardboard wrap high-value items.",
  },
  {
    title: "Wooden Crate Construction",
    description:
      "Build or select export-grade wooden crate; fumigate per ISPM-15 standards.",
  },
  {
    title: "Weight Distribution & Stacking",
    description:
      "Stack pieces vertically or flat per stone type; balance weight evenly across crate.",
  },
  {
    title: "Crate Strapping & Reinforcement",
    description:
      "Steel-band crate at intervals; add corner protectors on fragile edges.",
  },
  {
    title: "Weatherproof Wrapping",
    description:
      "Stretch-wrap entire crate in weather-sealed plastic; add silica gel packs for moisture control.",
  },
  {
    title: "Container Loading & Photo Documentation",
    description:
      "Photograph each crate inside container; share loading report with client.",
  },
];

const WHATSAPP_NUMBER = "917357923414";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi, I'd like to receive the 14-Point Quality Checklist for my next stone shipment."
);

export const QualityChecklistModal = ({
  open,
  onOpenChange,
}: QualityChecklistModalProps) => {
  const handleDownload = async () => {
    // Determine the base URL for the image
    const imgUrl = '/stone_factory_pdf.png';
    const response = await fetch(imgUrl);
    const blob = await response.blob();
    const base64Img = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });

    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(22);
    doc.setTextColor(30, 30, 30);
    doc.text("Roop Stone Impex", 105, 20, { align: "center" });

    doc.setFontSize(16);
    doc.setTextColor(30, 30, 30); // Neutral dark grey
    doc.text("14-Point Quality & Packing Checklist", 105, 30, { align: "center" });

    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(
      "The same protocol we follow for every container — refined over 43 years and thousands of shipments.",
      105,
      40,
      { align: "center", maxWidth: 170 }
    );

    // Add AI Image
    try {
      doc.addImage(base64Img, 'PNG', 15, 45, 180, 100);
    } catch (e) {
      console.error("Failed to add image to PDF", e);
    }

    // Table
    autoTable(doc, {
      startY: 155,
      head: [["Step", "Inspection Point", "Protocol Details"]],
      body: checklistSteps.map((step, index) => [
        index + 1,
        step.title,
        step.description,
      ]),
      theme: "grid",
      headStyles: { fillColor: [40, 40, 40], textColor: [255, 255, 255] },
      styles: { fontSize: 10, cellPadding: 5 },
      columnStyles: {
        0: { cellWidth: 15, halign: "center" },
        1: { cellWidth: 50, fontStyle: "bold", textColor: [50, 50, 50] },
        2: { cellWidth: "auto", textColor: [80, 80, 80] },
      },
    });

    doc.save("Roop_Stone_14_Point_Quality_Checklist.pdf");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl h-[85vh] bg-background border-border p-0 overflow-hidden flex flex-col z-[110]">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-2xl font-serif font-bold tracking-widest text-foreground">
            14-Point Quality &amp; Packing Checklist
          </DialogTitle>
          <DialogDescription>
            The same protocol we follow for every container — refined over 43
            years and thousands of shipments.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 px-6 pt-0">
          <div className="space-y-1 pb-6">
            {checklistSteps.map((step, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-3 rounded-lg transition-colors hover:bg-accent/5 group"
              >
                {/* Step number badge */}
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-semibold group-hover:bg-foreground group-hover:text-background transition-colors">
                  {index + 1}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h4 className="text-sm font-semibold text-foreground">
                      {step.title}
                    </h4>
                    <CheckCircle2 className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}

            {/* CTA Section */}
            <div className="mt-6 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-center gap-4">
              <Button
                variant="outline"
                size="lg"
                className="w-full md:w-auto btn-cta-hover px-10 py-8 text-lg hover:border-foreground border-border font-semibold shadow-sm"
                onClick={handleDownload}
              >
                <Download className="h-5 w-5 mr-2" />
                Download Checklist
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full md:w-auto bg-transparent border-[#25D366] text-[#25D366] font-semibold px-8 btn-whatsapp-anim"
              >
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  WhatsApp Us
                </a>
              </Button>
            </div>
            <p className="text-sm text-center text-muted-foreground mt-4">
              Want this checklist applied to your next order?
            </p>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default QualityChecklistModal;
