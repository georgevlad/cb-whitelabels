// src/app/about/page.tsx
"use client";

import { useConfig } from "@/hooks/useConfig";

export default function AboutPage() {
  const config = useConfig();
  const aboutConfig = config.aboutPage;

  if (!aboutConfig) {
    return (
      <div id="wrapper" className="about-page">
        <div className="content-area">
          <h1>About Us</h1>
          <p>About page configuration not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div id="wrapper" className="about-page">
      <div className="content-area">
        <h1>{aboutConfig.title}</h1>
        <div className="about-content">
          {aboutConfig.description.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
}