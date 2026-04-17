"use client";

import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import clsx from "clsx";
import { GripVertical, Trash } from "lucide-react";
import { SetStateAction, useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

function SortableContainer({
  items,
  setItems,
  children,
}: {
  items: any[];
  setItems: React.Dispatch<SetStateAction<any[]>>;
  children: React.ReactNode;
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragStart(event: any) {}

  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((item) => item.id === active.id);

    const newIndex = items.findIndex((item) => item.id === over.id);

    const newItems = arrayMove(items, oldIndex, newIndex);

    setItems(newItems);
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  );
}

function SortableItem({
  id,
  children,
  onDelete,
}: {
  id: string;
  children: React.ReactNode;
  onDelete: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isOver,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Translate.toString(transform), // use Css.Translate instead of Css.Transform to avoid distortion
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={{ ...style, width: "100%" }}
      className={clsx(
        "h-fit w-full px-1",
        "group flex items-center rounded-lg",
        "hover:bg-zinc-100",
        isDragging && "z-50 shadow-lg backdrop-blur-sm",
      )}
    >
      {/* Handle */}
      <DropdownMenu>
        {/* Trigger */}
        {/* <DropdownMenuTrigger> */}
        <div
          {...listeners}
          className={clsx(
            "mr-1 rounded-md py-1 text-zinc-400 opacity-0 transition-colors",
            "group-hover:opacity-100 hover:cursor-pointer hover:text-indigo-500",
            "focus:opacity-100",
          )}
        >
          <GripVertical />
        </div>
        {/* </DropdownMenuTrigger> */}

        {/* <TooltipContent className="flex-col">
            <span>
              <b>Drag</b> to reorder
            </span>
            <span>
              <b>Click</b> to open menu
            </span>
          </TooltipContent> */}

        <DropdownMenuContent>
          <DropdownMenuItem>Add below</DropdownMenuItem>
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="w-full">{children}</div>
      <button
        className={clsx(
          "p-1 text-zinc-300 opacity-0",
          !isDragging &&
            "rounded-lg group-hover:opacity-100 hover:cursor-pointer hover:bg-zinc-200 hover:text-red-400",
        )}
        onClick={onDelete}
      >
        <Trash className="w-5" />
      </button>
      {/* <button
        className={clsx(
          "p-1 text-zinc-300 opacity-0",
          !isDragging &&
            "rounded-lg group-hover:opacity-100 hover:cursor-pointer hover:bg-indigo-500/10 hover:text-red-400",
        )}
        onClick={onDelete}
      >
        <Trash className="w-5" />
      </button> */}
    </div>
  );
}

export { SortableContainer, SortableItem };
