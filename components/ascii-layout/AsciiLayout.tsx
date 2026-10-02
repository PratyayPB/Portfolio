import * as React from "react";
import { AsciiSidePanel } from "./AsciiSidePanel";
import "./ascii-layout.css";

export interface AsciiLayoutProps {
  children: React.ReactNode;
  className?: string;
  centerClassName?: string;
  fontSize?: number;
  patternScale?: number;
  accentColor?: string;
}

export function AsciiLayout({
  children,
  className = "",
  centerClassName = "",
  fontSize = 6,
  patternScale = 2.5,
  accentColor,
}: AsciiLayoutProps) {
  return (
    <div className={`ascii-layout ${className}`}>
      {/* Left ASCII Panel */}
      <AsciiSidePanel
        side="left"
        fontSize={fontSize}
        patternScale={patternScale}
        accentColor={accentColor}
      />

      {/* Center Content Panel */}
      <main id="main-content" className={`ascii-center ${centerClassName}`}>
        {children}
      </main>

      {/* Right ASCII Panel */}
      <AsciiSidePanel
        side="right"
        fontSize={fontSize}
        patternScale={patternScale}
        accentColor={accentColor}
      />
    </div>
  );
}

export default AsciiLayout;
