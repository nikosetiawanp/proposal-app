"use client";

import Cover from "../../app/proposals/components/Cover";
import TableOfContents from "@/app/proposals/components/TableOfContents";
import Timeline from "../../app/proposals/components/Timeline";
import ExecutiveSummary from "../../app/proposals/components/ExecutiveSummary";
import Scope from "@/app/proposals/components/Scope";
import Budget from "@/app/proposals/components/Budget";

export const proposalPages: {
  slug: string;
  component: React.FC<{ slug: string }>;
  title: string;
}[] = [
  {
    slug: "cover",
    component: Cover,
    title: "Cover",
  },
  {
    slug: "table-of-contents",
    component: TableOfContents,
    title: "Table of Contents",
  },
  {
    slug: "executive-summary",
    component: ExecutiveSummary,
    title: "Executive Summary",
  },
  {
    slug: "scope",
    component: Scope,
    title: "Scope",
  },
  {
    slug: "timeline",
    component: Timeline,
    title: "Timeline",
  },
  {
    slug: "budget",
    component: Budget,
    title: "Budget",
  },
];
