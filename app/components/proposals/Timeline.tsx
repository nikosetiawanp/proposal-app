import clsx from "clsx";
import { GripVertical, Trash } from "lucide-react";
import EditableText from "../editableText";
import { DragAndDrop } from "../DragAndDrop";
import { SortableContainer, SortableItem } from "../Sortable";
import React, { useState } from "react";

export default function Timeline() {
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

        <h2 className="mb-8 px-9 text-[48px] font-bold text-zinc-900">
          Estimated Timeline
        </h2>

        {/* Table */}
        <div className="flex w-full flex-col">
          {/* Table Header */}
          <div className="flex px-9 py-2">
            <span className="ml-1 flex-[4] font-bold text-zinc-900">
              Service
            </span>
            <span className="ml-6 flex-[2] font-bold text-zinc-900">
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
                  <SortableItem key={item} id={item}>
                    <div className="flex w-full">
                      <div className="flex-[2]">
                        <EditableText
                          id="service"
                          label="Service"
                          placeholder="Service"
                          className="text-[14px] text-zinc-900"
                          defaultValue={"Item " + item}
                        />
                      </div>

                      <div className="-ml-13 flex-[1]">
                        <EditableText
                          id="service"
                          label="Service"
                          placeholder="Service"
                          className="text-[14px] text-zinc-900"
                          defaultValue="$300"
                        />
                      </div>
                    </div>
                    {/* <div className="px-10">
                      <Divider />
                    </div> */}
                  </SortableItem>
                );
              })}
            </div>
          </SortableContainer>

          {/* End of Row */}

          {/* Table Footer */}
          <div className="flex px-10 py-2">
            <div className="flex-[2]">
              <span className="font-bold text-zinc-900">Total</span>
            </div>
            <div className="ml-7 flex-[1]">
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

function Divider({ className }: { className?: string }) {
  return (
    <div
      className={clsx("h-[1px] w-full bg-zinc-300", className && className)}
    />
  );
}

function Block({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={clsx(
        "group flex items-center rounded-lg p-1",
        "hover:bg-zinc-100",
      )}
    >
      {/* Handle */}
      <div
        className={clsx(
          "p-1 opacity-0",
          "group-hover:opacity-100 hover:cursor-pointer",
        )}
      >
        <GripVertical className="text-zinc-300" />
      </div>
      <div className="flex w-full">{children}</div>

      {/* Delete Button */}
      <button
        className={clsx(
          "rounded-md p-1 opacity-0",
          "group-hover:opacity-100 hover:cursor-pointer hover:bg-zinc-200",
        )}
      >
        <Trash className={clsx("w-5 text-zinc-300", "hover:text-red-400")} />
      </button>
    </div>
  );
}
