import { useEffect, useState } from "react";
import { NavBar } from "@/components/electionverse/NavBar";
import { Hero } from "@/components/electionverse/Hero";
import { JourneySection } from "@/components/electionverse/JourneySection";
import { MentorSection } from "@/components/electionverse/MentorSection";
import { SimulatorSection } from "@/components/electionverse/SimulatorSection";
import { StrategySection } from "@/components/electionverse/StrategySection";
import { OnePromptSection } from "@/components/electionverse/OnePromptSection";
import { DashboardSection } from "@/components/electionverse/DashboardSection";
import { ContentStudio } from "@/components/electionverse/ContentStudio";
import { Footer } from "@/components/electionverse/Footer";
import { useGame } from "@/lib/gamification";

const Index = () => {
  const [section, setSection] = useState("home");
  const { visit } = useGame();

  useEffect(() => {
    visit(section);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [section, visit]);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar active={section} onChange={setSection} />
      <main className="flex-1">
        {section === "home" && <Hero onCta={setSection} />}
        {section === "journey" && <JourneySection />}
        {section === "mentor" && <MentorSection />}
        {section === "simulator" && <SimulatorSection />}
        {section === "strategy" && <StrategySection />}
        {section === "oneprompt" && <OnePromptSection />}
        {section === "dashboard" && <DashboardSection />}
        {section === "studio" && <ContentStudio />}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
