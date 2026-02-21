"use client";

import {
  Target,
  CalendarClock,
  DollarSign,
  ListOrdered,
  BookOpen,
  StickyNote,
  HeartHandshake,
  Signature,
  ListChecks,
  BookA,
} from "lucide-react";

import Cover from "../../app/proposals/components/Cover";
import Timeline from "../../app/proposals/components/Timeline";
import BriefAndObjectives from "../../app/proposals/components/BriefAndObjectives";
import Scope from "@/app/proposals/components/Scope";
import Budget from "@/app/proposals/components/Budget";

export const proposalPages: {
  name: string;
  slug: string;
  icon: any;
  component: any;
  canBeHidden: boolean;
  defaultActive: boolean;
  defaultLayout: string;
}[] = [
  {
    name: "Cover",
    slug: "cover",
    icon: BookA,
    component: Cover,
    canBeHidden: false,
    defaultActive: true,
    defaultLayout: "default",
  },
  {
    name: "Table of Contents",
    slug: "table-of-contents",
    icon: ListOrdered,
    component: Cover,
    canBeHidden: true,
    defaultActive: false,
    defaultLayout: "default",
  },
  {
    name: "Brief and Objectives",
    slug: "brief-and-objectives",
    icon: Target,
    component: BriefAndObjectives,
    canBeHidden: false,
    defaultActive: true,
    defaultLayout: "default",
  },
  {
    name: "Scope",
    slug: "scope",
    icon: ListChecks,
    component: Scope,
    canBeHidden: false,
    defaultActive: true,
    defaultLayout: "default",
  },
  {
    name: "Estimated Timeline",
    slug: "estimated-timeline",
    icon: CalendarClock,
    component: Timeline,
    canBeHidden: false,
    defaultActive: true,
    defaultLayout: "default",
  },
  {
    name: "Budget",
    slug: "budget",
    icon: DollarSign,
    component: Budget,
    canBeHidden: false,
    defaultActive: true,
    defaultLayout: "default",
  },
  {
    name: "Case Studies and References",
    slug: "case-studies-and-references",
    icon: BookOpen,
    component: Cover,
    canBeHidden: true,
    defaultActive: false,
    defaultLayout: "default",
  },
  {
    name: "Additional Notes",
    slug: "additional-notes",
    icon: StickyNote,
    component: Cover,
    canBeHidden: true,
    defaultActive: false,
    defaultLayout: "default",
  },
  {
    name: "Contract",
    slug: "contract",
    icon: Signature,
    component: Cover,
    canBeHidden: true,
    defaultActive: false,
    defaultLayout: "default",
  },
  {
    name: "Thank You",
    slug: "thank-you",
    icon: HeartHandshake,
    component: Cover,
    canBeHidden: true,
    defaultActive: false,
    defaultLayout: "default",
  },
];
