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
async function getLocalDBProposal(id: string) {
  const db = await getLocalDB();

  return await db.get(STORE_NAME, id);
}

// Create
async function createLocalDBProposal(proposal: Proposal) {
  const db = await getLocalDB();

  await db.add(STORE_NAME, proposal);
}

// Update
async function updateLocalDBProposal(proposal: Proposal) {
  console.log("Updating local DB Proposal");
  const db = await getLocalDB();

  const existing = await db.get(STORE_NAME, proposal.id);
  const updated = proposal;

  console.log(proposal);
  if (!existing) return;

  await db.put(STORE_NAME, {
    ...existing,
    ...updated,
  });
}

export { getLocalDBProposal, updateLocalDBProposal, createLocalDBProposal };
