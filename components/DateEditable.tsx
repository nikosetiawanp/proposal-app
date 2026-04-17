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
            "border-primary/0 h-fit w-fit rounded-xs border-[2px] bg-white/0 px-0 py-0 text-[16px] font-normal shadow-none",
            "transition-all",
            "hover:border-primary hover:bg-primary/0 hover:cursor-pointer",
            open &&
              "border-primary hover:border-primary data-[state=open]:bg-primary/0",
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
              "bg-primary text-white hover:bg-indigo-600 focus:bg-primary",
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
