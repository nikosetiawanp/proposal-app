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
  timeUnit: "week",
  currency: "",
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
      tableOfContents: {
        layout: "default",
        active: false,
      },
      briefAndObjectives: {
        layout: "default",
        active: true,
      },
      scope: {
        layout: "default",
        active: true,
      },
      estimatedTimeline: {
        layout: "default",
        active: true,
      },
      budget: {
        layout: "default",
        active: true,
      },
      caseStudiesAndReferences: {
        layout: "default",
        active: false,
      },
      additionalNotes: {
        layout: "default",
        active: false,
      },
      contract: {
        layout: "default",
        active: false,
      },
      thankYou: {
        layout: "default",
        active: false,
      },
    },
    print: {
      paperSize: "letter",
      orientation: "portrait",
    },
  },
};
