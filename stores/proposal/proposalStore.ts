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

let timeout: ReturnType<typeof setTimeout> | null = null;
const debouncedStorage = createJSONStorage(() => ({
  getItem: (name: string) => {
    return localStorage.getItem(name);
  },
  setItem: (name: string, value: string) => {
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      localStorage.setItem(name, value);
    }, 0);
  },
  removeItem: (name: string) => {
    localStorage.removeItem(name);
  },
}));

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
      setProposalSettings: (settings: Proposal["settings"]) =>
        set((state) => ({
          proposal: {
            ...state.proposal,
            settings,
          },
        })),
      // setProposalPages: (page: any) =>
      //   set((state) => ({
      //     proposal: {
      //       ...state.proposal,
      //       settings: {
      //         ...state.proposal.settings,
      //         pages: {
      //           ...state.proposal.settings.pages,
      //           [page.slug]: page,
      //         },
      //       },
      //     },
      //   })),
    }),

    {
      name: "proposal-storage",
      // storage: createJSONStorage(() => localStorage),
      storage: debouncedStorage,
    },
  ),
);
