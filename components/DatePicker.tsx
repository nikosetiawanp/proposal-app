"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, ChevronDownIcon } from "lucide-react";

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
import { cn } from "@/lib/utils";

export function DatePicker({
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
          className={cn(
            "w-full justify-between",
            "bg-background hover:bg-background font-normal",
            proposal?.settings?.useCustomFont && "opacity-50",
          )}
          style={style}
          {...props}
        >
          {value ? (
            <span className="text-normal flex w-full items-center justify-between text-sm">
              {format(value, proposal?.settings?.dateFormat || "dd MMMM yyyy")}
              <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4" />
            </span>
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
            day_selected: "bg-primary text-white focus:bg-primary",
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
