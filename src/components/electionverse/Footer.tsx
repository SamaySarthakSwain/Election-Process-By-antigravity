import { Crown } from "lucide-react";

export const Footer = () => (
  <footer className="border-t border-border/50 mt-16">
    <div className="container py-10 text-center">
      <div className="flex justify-center mb-4">
        <Crown className="h-6 w-6 text-primary" />
      </div>
      <div className="font-display text-lg gold-text mb-1">ElectionVerse AI</div>
      <div className="text-xs text-muted-foreground tracking-widest uppercase mb-4">Royal Civic Intelligence · Built with Lovable AI</div>
      <div className="ornament-divider max-w-xs mx-auto">
        <span className="text-xs">✦</span>
      </div>
      <div className="text-xs text-muted-foreground mt-4">A hackathon project — designed to teach, simulate, and empower.</div>
    </div>
  </footer>
);
