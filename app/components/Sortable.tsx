import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { GripVertical } from "lucide-react";
import { useState } from "react";

export default function Sortable() {
  const [items, setItems] = useState([1, 2, 3]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

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
    <div className="bg-green-100 px-9 py-6">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map((id) => (
            <SortableItem key={id} id={id} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}

function SortableItem({ id }: { id: number }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      className="flex gap-2 rounded-lg border border-red-500 bg-red-100 p-2 text-red-500"
    >
      {/* Handle */}
      <div {...listeners} className="hover:cursor-pointer">
        <GripVertical className="w-5" />
      </div>
      <span>Sortable Item {id}</span>
    </div>
  );
}
