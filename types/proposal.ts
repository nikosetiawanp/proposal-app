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
  clientName: string;
  timeUnit: "Hour" | "Day" | "Week" | "Month" | "Year";
  currency: CurrencyCode;
  objectives: { id: string; title: string; description: string }[];
  services: {
    id: string;
    title: string;
    description: string;
    budget: string;
    duration: number;
  }[];
  settings: {
    headingFont: string;
    bodyFont: string;
    useCustomFont: boolean;

    backgroundColor: string;
    textColor: string;
    accentColor: string;

    paperSize: "A4" | "Letter";
    paperOrientation: "portrait" | "landscape";

    dateFormat: any;
    timeUnit: "Day" | "Week" | "Month";
    currency: CurrencyCode;

    // pages: Record<ProposalPageSlug, { active: boolean; layout: string }>;
  };
}
