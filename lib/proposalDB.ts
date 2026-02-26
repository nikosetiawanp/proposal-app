"use client";

import { Proposal } from "@/types/proposal";
import { openDB } from "idb";

const DB_NAME = "ProposalDB";
const STORE_NAME = "proposals";

// Open DB connection
async function getLocalDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    },
  });
}

// Read
async function getLocalDBProposal() {
  const db = await getLocalDB();
  const proposals = await db.getAll(STORE_NAME);
  console.log(proposals);

  return proposals[0];
}

// Create
async function createLocalDBProposal(proposal: Proposal) {
  const db = await getLocalDB();
  await db.add(STORE_NAME, proposal);
}

// Update
async function updateLocalDBProposal(proposal: Proposal) {
  const db = await getLocalDB();
  const existing = await db.get(STORE_NAME, proposal.id);

  if (!existing) {
    await db.add(STORE_NAME, proposal);
  }

  await db.put(STORE_NAME, {
    ...proposal,
  });
}

export { getLocalDBProposal, updateLocalDBProposal, createLocalDBProposal };
