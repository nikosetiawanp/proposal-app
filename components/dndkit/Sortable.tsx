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
import { EllipsisVertical, GripVertical, Plus, Trash } from "lucide-react";
import { SetStateAction } from "react";
import { CSS } from "@dnd-kit/utilities";
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
  onCreate,
}: {
  id: string;
  children: React.ReactNode;
  onDelete: () => void;
  onCreate: () => void;
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
        isDragging && "z-50 shadow-lg",
      )}
    >
      {/* Handle */}
      <div
        className={clsx(
          "mr-1 rounded-md py-1 text-zinc-300 transition-colors",
          "hover:text-primary hover:cursor-pointer",
        )}
      >
        <GripVertical
          {...listeners}
          onClick={(e) => e.stopPropagation()}
          className="opacity-0 group-hover:opacity-100"
        />
      </div>

      <div className="w-full">{children}</div>

      <DropdownMenu>
        <DropdownMenuTrigger
          className={clsx(
            "rounded-lg p-1 text-zinc-300 opacity-0",
            !isDragging &&
              "group-hover:opacity-100 hover:cursor-pointer focus:opacity-100 data-[state=open]:opacity-100",
          )}
        >
          <EllipsisVertical />
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem onSelect={onDelete}>
            <Trash />
            <span>Delete</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={onCreate}>
            <Plus />
            <span>Add item</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export { SortableContainer, SortableItem };
