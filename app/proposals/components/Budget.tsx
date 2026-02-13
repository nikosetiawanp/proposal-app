import clsx from "clsx";
import { GripVertical, Trash } from "lucide-react";
import EditableText from "../../components/EditableText";
import {
  SortableContainer,
  SortableItem,
} from "../../components/dndkit/Sortable";
import React, { useState } from "react";
import Divider from "@/app/components/Divider";
import SectionTitle from "./SectionTitle";

export default function Budget() {
  const [serviceItems, setServiceItems] = useState([1, 2, 3]);

  return (
    <div className={clsx("flex h-full flex-col justify-between")}>
      {/* Header */}
      <div className="flex justify-between px-9 py-4">
        <span className="text-zinc-900">Your Name</span>
      </div>

      {/* Content */}
      <div className="flex h-full flex-col">
        {/* Center */}

        <SectionTitle className="ml-8">Estimated Budget</SectionTitle>

        {/* Table */}
        <div className="flex w-full flex-col">
          {/* Table Header */}
          <div className="flex px-9 py-2">
            <span className="flex-[2] font-bold text-zinc-900">Service</span>
            <span className="ml-5 flex-[1] font-bold text-zinc-900">
              Budget
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
                      <div className="flex w-full">
                        {/* Service  */}
                        <div className="flex-[2]">
                          <EditableText
                            id="service"
                            label="Service"
                            placeholder="Service"
                            className="text-[14px] text-zinc-900"
                            defaultValue={"Item " + item}
                          />
                        </div>

                        {/* Budget */}
                        <div className="flex-[1]">
                          <EditableText
                            id="service"
                            label="Service"
                            placeholder="Service"
                            className="text-[14px] text-zinc-900"
                            defaultValue={"$" + item + "00"}
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
            <div className="ml-4 flex-[1]">
              <span className="font-bold text-zinc-900">$7,700</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between px-9 py-6">
        <span className="text-zinc-900">Project Name</span>
        <span className="text-zinc-900">1</span>
      </div>
    </div>
  );
}
