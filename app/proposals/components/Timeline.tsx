"use client";

import clsx from "clsx";
import EditableText from "../../../components/EditableText";
import {
  SortableContainer,
  SortableItem,
} from "../../../components/dndkit/Sortable";
import React, { useState } from "react";
import Divider from "@/components/Divider";
import SectionTitle from "./SectionTitle";
import ProposalFooter from "./ProposalFooter";
import ProposalHeader from "./ProposalHeader";

export default function Timeline() {
  const [serviceItems, setServiceItems] = useState([1, 2, 3]);

  return (
    <div className={clsx("flex h-full flex-col justify-between")}>
      {/* Header */}
      <ProposalHeader />

      {/* Content */}
      <div className="flex h-full flex-col">
        {/* Center */}

        <SectionTitle className="ml-8">Estimated Timeline</SectionTitle>

        {/* Table */}
        <div className="flex w-full flex-col">
          {/* Table Header */}
          <div className="flex px-9 py-2">
            <span className="flex-[2] font-bold text-zinc-900">Service</span>
            <span className="ml-5 flex-[1] font-bold text-zinc-900">
              Estimated Timeline
            </span>
          </div>
          <div className="px-10">
            <Divider />
          </div>

          {/* Items */}
          <SortableContainer items={serviceItems} setItems={setServiceItems}>
            <div className="flex flex-col">
              {serviceItems.map((item) => {
                return (
                  // Row
                  <React.Fragment key={item}>
                    <SortableItem key={item} id={item}>
                      <div className="mt-0.5 flex h-full w-full">
                        {/* Item */}
                        <div className="flex-[2]">
                          <EditableText
                            id="service"
                            label="Service"
                            placeholder="Service"
                            className="text-[14px] text-zinc-900"
                            defaultValue={"Item " + item}
                          />
                        </div>

                        {/* Timeline */}
                        <div className="flex-[1]">
                          <EditableText
                            id="service"
                            label="Service"
                            placeholder="Service"
                            className="text-[14px] text-zinc-900"
                            defaultValue={item + " Weeks"}
                          />
                        </div>
                      </div>
                    </SortableItem>
                    <div className="px-10">
                      <Divider />
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </SortableContainer>

          {/* End of Row */}

          {/* Table Footer */}
          <div className="flex px-9 py-2">
            <div className="flex-[2]">
              <span className="font-bold text-zinc-900">Total</span>
            </div>
            <div className="ml-3 flex-[1]">
              <span className="font-bold text-zinc-900">8 Weeks</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <ProposalFooter />
    </div>
  );
}
