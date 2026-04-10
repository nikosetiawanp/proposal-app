"use client";

import { Proposal } from "@/types/proposal";

export const emptyProposal: Proposal = {
  id: "",
  userId: "",
  title: "",
  description: "",
  date: new Date().toISOString(),
  proposerName: "",
  clientName: "",
  timeUnit: "Week",
  currency: "USD",
  objectives: [],
  services: [],
  settings: {
    theme: {
      headingFont: "Montserrat",
      bodyFont: "Inter",
      accentColor: "",
    },
    pages: {
      cover: {
        layout: "default",
        active: true,
      },
      "table-of-contents": {
        layout: "default",
        active: false,
      },
      "brief-and-objectives": {
        layout: "default",
        active: true,
      },
      scope: {
        layout: "default",
        active: true,
      },
      "estimated-timeline": {
        layout: "default",
        active: true,
      },
      budget: {
        layout: "default",
        active: true,
      },
      "case-studies-and-references": {
        layout: "default",
        active: false,
      },
      "additional-notes": {
        layout: "default",
        active: false,
      },
      contract: {
        layout: "default",
        active: false,
      },
      "thank-you": {
        layout: "default",
        active: false,
      },
    },
    print: {
      paperSize: "Letter",
      orientation: "portrait",
    },
    format: {
      date: "",
      timeUnit: "Week",
      currency: "USD",
    },
  },
};
