import { currencies } from "@/data/currencies";
import { proposalPages } from "@/data/proposal/proposalPages";

type CurrencyCode = (typeof currencies)[number]["code"];
type ProposalPageSlug = (typeof proposalPages)[number]["slug"];

export type PaperSize = {
  width: number | string;
  height: number | string;
};

export type PaperPreset = "Letter" | "A4";

export interface Proposal {
  id: string;
  userId: string;
  title: string;
  overview: string;
  solution: string;
  date: Date;

  proposerName: string;
  proposerEmail: string;
  proposerAddress: string;
  proposerPhone: string;
  proposerWebsite: string;

  clientName: string;

  objectives: { id: string; title: string; description: string }[];
  services: {
    id: string;
    title: string;
    description: string;
    budget: string;
    duration: number;
  }[];
  settings: {
    // Cover
    useCoverImage: boolean;

    // Fonts
    headingFont: string;
    bodyFont: string;
    useCustomFont: boolean;

    // Colors
    backgroundColor: string;
    textColor: string;
    accentColor: string;
    theme: "Light" | "Dark" | "Accent";

    // Paper
    paperSize: "A4" | "Letter";
    paperOrientation: "portrait" | "landscape";

    // Date & Time
    dateFormat: any;
    timeUnit: "Day" | "Week" | "Month";

    // Currency
    currency: string;
    customCurrency: string;
    useCustomCurrency: boolean;

    // Table
    tableHeaderStyle: "Solid" | "Soft" | "Minimal";
    tableFooterStyle: "Solid" | "Soft" | "Minimal";
    tableRowStyle: "None" | "Line" | "Color";

    hiddenPages: string[];
    pages: { slug: string; active: boolean }[];
  };
}
