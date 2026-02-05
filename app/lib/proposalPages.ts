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

import Cover from "../components/proposals/Cover";
import Timeline from "../components/proposals/Timeline";

export const proposalPages = [
  { name: "Cover", slug: "cover", icon: BookA, component: Cover },
  {
    name: "Brief and Objectives",
    slug: "brief-and-objectives",
    icon: Target,
    component: Cover,
  },
  { name: "Scope", slug: "scope", icon: ListChecks, component: Cover },
  {
    name: "Estimated Timeline",
    slug: "estimated-timeline",
    icon: CalendarClock,
    component: Timeline,
  },
  { name: "Budget", slug: "budget", icon: DollarSign, component: Cover },
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
