"use client";

import { defaultProposal } from "@/data/proposal/defaultProposal";
import { Proposal } from "@/types/proposal";
import { create } from "zustand";

export const useProposalStore = create<{
  proposal: Proposal;
  setProposal: (proposal: Proposal) => void;
}>((set) => ({
  proposal: defaultProposal,
  setProposal: (proposal) => set({ proposal }),
}));
