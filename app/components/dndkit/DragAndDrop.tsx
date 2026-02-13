import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { GripVertical } from "lucide-react";

interface UseDroppableArguments {
  id: string | number;
  disabled?: boolean;
  data?: Record<string, any>;
}

export function DragAndDrop() {
  return (
    <DndContext>
      <div className="bg-green-100 p-9">
        <span className="text-green-500">DND Context</span>
        <Droppable id="proposal-items" />
        <Draggable id="proposal-item-1" />
      </div>
    </DndContext>
  );
}

function Droppable({ id }: { id: string }) {
  const { setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div
      ref={setNodeRef}
      className="border border-dashed border-orange-500 bg-orange-100 p-16 text-orange-500"
    >
      Droppable
    </div>
  );
}

function Draggable({ id }: { id: string }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });
  return (
    <div className="flex gap-2 border border-red-500 bg-red-100 p-2 text-red-500">
      <div {...listeners} className="">
        <GripVertical className="w-5 cursor-pointer text-red-500" />
      </div>
      Draggable
    </div>
  );
}
