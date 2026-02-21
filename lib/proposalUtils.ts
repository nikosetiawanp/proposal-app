import { useProposalStore } from "@/stores/proposal/proposalStore";
import { getLocalDBProposal } from "./proposalDB";

export async function hydrateProposal(id: string) {
  const localDBProposal = await getLocalDBProposal(id);

  if (localDBProposal) {
    useProposalStore.setState(localDBProposal); // assign proposal to global state
  }
}
