import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Hero } from "../components/electionverse/Hero";

describe("Hero Component", () => {
  it("renders the main heading", () => {
    render(<Hero onCta={() => {}} />);
    const heading = screen.getByText(/Democracy/i);
    expect(heading).toBeInTheDocument();
  });

  it("calls onCta when a button is clicked", () => {
    const onCtaMock = vi.fn();
    render(<Hero onCta={onCtaMock} />);
    
    const journeyButton = screen.getByText(/Begin the Journey/i);
    fireEvent.click(journeyButton);
    
    expect(onCtaMock).toHaveBeenCalledWith("journey");
  });

  it("renders all feature cards", () => {
    render(<Hero onCta={() => {}} />);
    expect(screen.getByText(/Interactive Journey/i)).toBeInTheDocument();
    expect(screen.getByText(/AI Mentor/i)).toBeInTheDocument();
    expect(screen.getByText(/What-If Simulator/i)).toBeInTheDocument();
    expect(screen.getByText(/Strategy Lab/i)).toBeInTheDocument();
  });
});
