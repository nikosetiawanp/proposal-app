"use client";

import { defaultProposal } from "@/data/proposal/defaultProposal";
import { emptyProposal } from "@/data/proposal/emptyProposal";
import { getLocalDBProposal, updateLocalDBProposal } from "@/lib/proposalDB";
import { Proposal } from "@/types/proposal";
import { create } from "zustand";

// Proposal global state
export const useProposalStore = create<{
  proposal: Proposal;
  hydrated: boolean;
  setProposal: (proposal: Proposal) => void;
  hydrate: () => Promise<void>;
}>((set) => ({
  proposal: emptyProposal,
  hydrated: false,
  setProposal: (proposal) => {
    set({ proposal });
    updateLocalDBProposal(proposal);
  },
  hydrate: async () => {
    const localDBProposal = await getLocalDBProposal();
    if (!localDBProposal) {
      set({ proposal: { ...defaultProposal } });
    }
    set({ proposal: { ...emptyProposal, ...localDBProposal }, hydrated: true });
  },
}));
