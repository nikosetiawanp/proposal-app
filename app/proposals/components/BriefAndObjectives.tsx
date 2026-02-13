import EditableText from "@/app/components/EditableText";
import clsx from "clsx";
import SectionTitle from "./SectionTitle";
import {
  SortableContainer,
  SortableItem,
} from "@/app/components/dndkit/Sortable";
import { SetStateAction, useState } from "react";
import { ArrowRight } from "lucide-react";
import ProposalHeader from "./ProposalHeader";
import ProposalFooter from "./ProposalFooter";

export default function BriefAndObjectives() {
  const [objectives, setObjectives] = useState([1, 2, 3, 4, 5]);
  return (
    <div className={clsx("flex h-full flex-col justify-between")}>
      {/* Header */}
      <ProposalHeader />

      {/* Content */}
      <div className="flex h-full flex-col gap-8">
        {/* Brief */}
        <div className="flex flex-col gap-2 px-8">
          <SectionTitle>Brief</SectionTitle>
          <EditableText
            id={"description"}
            label={"description"}
            placeholder={"Enter project description here"}
            defaultValue="The client’s current website lacks a modern and consistent design, making it harder for visitors to navigate and engage with content effectively. The project aims to address these issues by improving clarity, usability, and overall user experience."
            className="text-wrap text-zinc-900"
            as="textarea"
          />
        </div>

        {/* Objectives */}
        <div className="flex flex-col gap-2">
          <SectionTitle className="ml-8">Objectives</SectionTitle>
          <SortableContainer items={objectives} setItems={setObjectives}>
            <div className="flex flex-col gap-1">
              {objectives.map((objective) => {
                return (
                  <SortableItem key={objective} id={objective}>
                    <div className="mt-0.5 flex items-center gap-2">
                      <ArrowRight className="text-zinc-900" />
                      <EditableText
                        id={""}
                        placeholder={"Click to write objective"}
                        defaultValue={"Objective " + objective}
                        as="textarea"
                      />
                    </div>
                  </SortableItem>
                );
              })}
            </div>
          </SortableContainer>
        </div>
      </div>

      {/* Footer */}
      <ProposalFooter />
    </div>
  );
}
