import clsx from "clsx";
import { GripVertical, Trash } from "lucide-react";
import EditableText from "../editableText";

export default function Timeline() {
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
          <div className="flex px-9">
            <span className="ml-2 flex-[4] font-bold text-zinc-900">
              Service
            </span>
            <span className="ml-4 flex-[2] font-bold text-zinc-900">
              Budget
            </span>
          </div>

          <Block>
            <div className="flex-[2]">
              <EditableText
                id="service"
                label="Service"
                placeholder="Service"
                className="text-[14px] text-zinc-900"
                defaultValue="Discovery & Planning"
              />
            </div>

            <div className="flex-[1]">
              <EditableText
                id="service"
                label="Service"
                placeholder="Service"
                className="text-[14px] text-zinc-900"
                defaultValue="$300"
              />
            </div>
          </Block>
          <div className="px-10">
            <Divider />
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
        "group flex items-center gap-0.5 rounded-lg p-1",
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
          "group-hover:opacity-100 hover:cursor-pointer hover:bg-zinc-100",
        )}
      >
        <Trash className="w-5 text-zinc-300" />
      </button>
    </div>
  );
}
