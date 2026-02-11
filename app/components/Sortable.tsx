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

export default function Sortable() {
  const [items, setItems] = useState([1, 2, 3]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragStart(event: any) {
    setActiveId(event.active.id);
  }

  // function handleDragEnd() {
  //   setActiveId(null);
  // }

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
    setActiveId(null);
  }

  const [activeId, setActiveId] = useState<number | null>(null);

  return (
    <div className="bg-green-100 px-9 py-6">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <div className="flex flex-col gap-1">
            {items.map((id) => (
              <SortableItem key={id} id={id} />
            ))}
          </div>
        </SortableContext>

        {/* Drag Overlay*/}
        {/* <DragOverlay adjustScale={false}>
          {activeId ? <SortableItem id={activeId} /> : null}
        </DragOverlay> */}
      </DndContext>
    </div>
  );
}

function SortableItem({ id }: { id: number }) {
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
        "flex gap-2 rounded-lg border border-red-500 bg-red-100 p-2 text-red-500",
      )}
    >
      {/* Handle */}
      <div className="hover:cursor-pointer" {...listeners}>
        <GripVertical className="w-5" />
      </div>
      <span>Sortable Item {id}</span>
    </div>
  );
}
