"use client";

import { defaultProposal } from "@/data/proposal/defaultProposal";
import { Proposal } from "@/types/proposal";
import { openDB } from "idb";
import { useProposalStore } from "@/stores/proposal/proposalStore";

export function useProposals() {
  const DB_NAME = "ProposalDB";
  const STORE_NAME = "proposals";

  async function getDB() {
    return openDB(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: "id" });
        }
      },
    });
  }

  async function createDefaultProposal() {
    const db = await getDB();

    await db.put(STORE_NAME, {
      ...defaultProposal,
      id: crypto.randomUUID(),
    });

    console.log("Proposal has been created");
  }

  async function updateProposal(id: string, proposal: Proposal) {
    const db = await getDB();

    const existing = await db.get("proposals", id);
    const updated = proposal;

    if (!existing) return;

    await db.put("proposals", {
      ...existing,
      ...updated,
    });
  }

  return { createDefaultProposal };
}
