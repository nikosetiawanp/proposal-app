"use client";

import { defaultProposal } from "@/data/proposal/defaultProposal";
import { updateLocalDBProposal } from "@/lib/proposalDB";
import { Proposal } from "@/types/proposal";
import { useEffect } from "react";
import { create } from "zustand";

// Proposal global state
export const useProposalStore = create<{
  proposal: Proposal;
  setProposal: (proposal: Proposal) => void;
}>((set) => ({
  proposal: defaultProposal,
  setProposal: (proposal) => {
    set({ proposal });
    updateLocalDBProposal(proposal);
  },
}));
