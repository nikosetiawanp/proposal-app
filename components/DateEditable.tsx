"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useStore } from "zustand";
import { proposalStore } from "@/stores/proposal/proposalStore";
import clsx from "clsx";
import { useState } from "react";

export function DateEditable({
  value,
  onSelect,
  className,
  style,
  ...props
}: {
  value: Date;
  onSelect: any;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [open, setOpen] = useState(false);
  const proposal = useStore(proposalStore, (state) => state.proposal);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!value}
          className={clsx(
            "-ml-1 h-fit w-fit rounded-sm border-2 border-indigo-500/0 bg-white/0 px-1 py-0 text-[16px] font-normal shadow-none",
            "transition-all",
            "hover:cursor-pointer hover:border-indigo-500/70 hover:bg-indigo-500/0 hover:text-zinc-700",
            open &&
              "border-indigo-500 bg-indigo-500/10 text-indigo-500 hover:border-indigo-500 hover:bg-indigo-500/10 hover:text-indigo-500 data-[state=open]:bg-indigo-500/10 data-[state=open]:text-zinc-700",
            className,
          )}
          style={style}
          {...props}
        >
          {value ? (
            format(value, proposal?.settings?.format?.date || "dd MMMM yyyy")
          ) : (
            <span className="text-[16px] text-zinc-400">
              Click to pick a date
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onSelect}
          classNames={{
            day_selected:
              "bg-indigo-500 text-white hover:bg-indigo-600 focus:bg-indigo-500",
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
