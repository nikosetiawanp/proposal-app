import {
  closestCenter,
  DndContext,
  DragOverlay,
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
import { GripVertical } from "lucide-react";
import { SetStateAction, useState } from "react";
import { CSS } from "@dnd-kit/utilities";

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
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragStart(event: any) {}

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
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
}: {
  id: number;
  children: React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isOver } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={style}
      className={clsx(
        "group flex items-center rounded-lg p-1",
        "hover:bg-indigo-500/10",
      )}
    >
      {/* Handle */}
      <div
        {...listeners}
        className={clsx(
          "p-1 text-indigo-300 opacity-0 transition-colors",
          "group-hover:opacity-100 hover:cursor-pointer hover:text-indigo-500",
        )}
      >
        <GripVertical />
      </div>
      {children}
    </div>
  );
}

export { SortableContainer, SortableItem };
