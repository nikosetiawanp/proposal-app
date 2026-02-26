"use client";

import { emptyProposal } from "@/data/proposal/emptyProposal";
import { Proposal } from "@/types/proposal";
import { createStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ProposalStoreState = { proposal: Proposal };
type ProposalStoreActions = {
  setProposal: (proposal: ProposalStoreState["proposal"]) => void;
};

export const proposalStore = createStore<
  ProposalStoreState & ProposalStoreActions
>()(
  persist(
    (set) => ({
      proposal: { ...emptyProposal },
      setProposal: (proposal: Proposal) => set({ proposal }),
    }),
    {
      name: "proposal-storage",
      storage: createJSONStorage(() => localStorage),
      // onRehydrateStorage: (state) => {
      //   console.log("Hydration starts");

      //   return (state, error) => {
      //     if (error) {
      //       console.log(error);
      //     } else {
      //       console.log(state);

      //       console.log("Hydration finished");
      //     }
      //   };
      // },
    },
  ),
);
