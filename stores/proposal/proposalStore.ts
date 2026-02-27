"use client";

import { emptyProposal } from "@/data/proposal/emptyProposal";
import { Proposal } from "@/types/proposal";
import { createStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ProposalStoreState = { proposal: Proposal };
type ProposalStoreActions = {
  setProposal: (proposal: ProposalStoreState["proposal"]) => void;
  setProposalObjectives: (
    objectives: ProposalStoreState["proposal"]["objectives"],
  ) => void;
  setProposalServices: (
    services: ProposalStoreState["proposal"]["services"],
  ) => void;
};

export const proposalStore = createStore<
  ProposalStoreState & ProposalStoreActions
>()(
  persist(
    (set) => ({
      proposal: { ...emptyProposal },
      setProposal: (proposal: Proposal) => set({ proposal }),
      setProposalObjectives: (objectives: Proposal["objectives"]) =>
        set((state) => ({
          proposal: {
            ...state.proposal,
            objectives,
          },
        })),
      setProposalServices: (services: Proposal["services"]) =>
        set((state) => ({
          proposal: {
            ...state.proposal,
            services,
          },
        })),
    }),

    {
      name: "proposal-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
