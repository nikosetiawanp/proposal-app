import EditableText from "@/app/components/EditableText";
import clsx from "clsx";
import SectionTitle from "./SectionTitle";
import {
  SortableContainer,
  SortableItem,
} from "@/app/components/dndkit/Sortable";
import { SetStateAction, useState } from "react";
import { ArrowRight } from "lucide-react";
import ProposalFooter from "./ProposalFooter";
import ProposalHeader from "./ProposalHeader";

export default function Scope() {
  const [objectives, setObjectives] = useState([1, 2, 3, 4, 5]);
  return (
    <div className={clsx("flex h-full flex-col justify-between")}>
      {/* Header */}
      <ProposalHeader />

      {/* Content */}
      <div className="flex h-full flex-col gap-8">
        <div className="flex flex-col gap-2">
          <SectionTitle className="ml-8">Scope</SectionTitle>
          <SortableContainer items={objectives} setItems={setObjectives}>
            <div className="flex flex-col gap-1">
              {objectives.map((objective) => {
                return (
                  <SortableItem key={objective} id={objective}>
                    <div className="flex flex-col items-start">
                      {/* Title and Icon */}
                      <div className="flex items-center gap-2">
                        <ArrowRight className="h-fit text-zinc-900" />
                        <EditableText
                          id={""}
                          placeholder={"Write objective here"}
                          defaultValue={"Scope" + objective}
                          className="font-bold"
                        />
                      </div>
                      <EditableText
                        id={""}
                        placeholder={"Write objective here"}
                        defaultValue={
                          "Functionality, responsiveness, and overall user experience are reviewed jointly, with issues addressed prior to launch."
                        }
                        as="textarea"
                        className="ml-7"
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
