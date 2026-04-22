"use client";

import { Proposal } from "@/types/proposal";

export const defaultProposal: Proposal = {
  id: crypto.randomUUID(),
  userId: "",
  title: "Website Development Proposal",
  overview:
    "This proposal outlines the plan, scope, timeline, and cost for delivering the project. Use this section to summarize what you will build, why it matters, and the value it brings to the client.",
  solution:
    "Describe how you will solve the client’s problem and deliver value. Outline your approach, key features, and what makes your solution effective. You can mention technologies, design principles, or strategies you will use. Focus on clarity and benefits—explain how your solution helps achieve the objectives and improves the client’s situation.",
  date: new Date(),
  proposerName: "Your Name / Your Company",
  clientName: "Client Name / Company",
  timeUnit: "Week",
  currency: "USD",

  objectives: [
    {
      id: crypto.randomUUID(),
      title: "Improve Online Presence",
      description:
        "Objectives should clearly define the desired outcome and its impact. Here, the focus is on strengthening the brand’s online presence through a modern, responsive website that builds trust and attracts potential customers.",
    },
    {
      id: crypto.randomUUID(),
      title: "Increase Conversions",
      description:
        "Clarity and direction are key when defining objectives. This one centers on guiding users through the website with intuitive flows and effective call-to-actions, encouraging actions like contacting, purchasing, or signing up.",
    },
  ],

  services: [
    {
      id: crypto.randomUUID(),
      title: "Landing Page Design & Development",
      description:
        "Design and develop a high-converting landing page, including layout, responsive design, and basic SEO setup. Includes revisions based on feedback.",
      budget: "1,200",
      duration: 7,
    },
    {
      id: crypto.randomUUID(),
      title: "Additional Pages",
      description:
        "Development of supporting pages such as About, Services, or Contact. Structure and content will follow the agreed sitemap.",
      budget: "800",
      duration: 14,
    },
  ],
  settings: {
    // Typography
    headingFont: "Oswald",
    bodyFont: "Inter",
    useCustomFont: false,

    // Colors
    backgroundColor: "#ffffff",
    textColor: "#111111",
    accentColor: "#2563eb",
    theme: "Light",

    // Paper
    paperSize: "Letter",
    paperOrientation: "portrait",

    // Date
    dateFormat: "MMMM, d yyyy",
    timeUnit: "Week",

    // Currencies
    currency: "$",
    customCurrency: "¥",
    useCustomCurrency: false,

    // pages: {
    //   cover: {
    //     layout: "default",
    //     active: true,
    //   },
    //   "table-of-contents": {
    //     layout: "default",
    //     active: false,
    //   },
    //   "brief-and-objectives": {
    //     layout: "default",
    //     active: true,
    //   },
    //   scope: {
    //     layout: "default",
    //     active: true,
    //   },
    //   "estimated-timeline": {
    //     layout: "default",
    //     active: true,
    //   },
    //   budget: {
    //     layout: "default",
    //     active: true,
    //   },
    //   "case-studies-and-references": {
    //     layout: "default",
    //     active: false,
    //   },
    //   "additional-notes": {
    //     layout: "default",
    //     active: false,
    //   },
    //   contract: {
    //     layout: "default",
    //     active: false,
    //   },
    //   "thank-you": {
    //     layout: "default",
    //     active: false,
    //   },
    // },
  },
};
