import {
  Target,
  Layers,
  CalendarClock,
  DollarSign,
  ListOrdered,
  BookOpen,
  StickyNote,
  HeartHandshake,
  ChevronDown,
  Eye,
  Signature,
  ListChecks,
  BookA,
} from "lucide-react";

import Cover from "../app/proposals/components/Cover";
import Timeline from "../app/proposals/components/Timeline";
import BriefAndObjectives from "../app/proposals/components/BriefAndObjectives";
import Scope from "@/app/proposals/components/Scope";
import Budget from "@/app/proposals/components/Budget";

export const ProposalPages = [
  { name: "Cover", slug: "cover", icon: BookA, component: Cover },
  {
    name: "Brief and Objectives",
    slug: "brief-and-objectives",
    icon: Target,
    component: BriefAndObjectives,
  },
  { name: "Scope", slug: "scope", icon: ListChecks, component: Scope },
  {
    name: "Estimated Timeline",
    slug: "estimated-timeline",
    icon: CalendarClock,
    component: Timeline,
  },
  { name: "Budget", slug: "budget", icon: DollarSign, component: Budget },
  {
    name: "Table of Contents",
    slug: "table-of-contents",
    icon: ListOrdered,
    component: Cover,
  },
  {
    name: "Case Studies and References",
    slug: "case-studies-and-references",
    icon: BookOpen,
    component: Cover,
  },
  { name: "Contract", slug: "contract", icon: Signature, component: Cover },
  {
    name: "Additional Notes",
    slug: "additional-notes",
    icon: StickyNote,
    component: Cover,
  },
  {
    name: "Thank You",
    slug: "thank-you",
    icon: HeartHandshake,
    component: Cover,
  },
];
