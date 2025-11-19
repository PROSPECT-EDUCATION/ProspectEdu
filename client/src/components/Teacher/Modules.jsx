import { useState, useCallback } from "react";
import ModuleCard from "./CourseManagementPage.jsx/ModuleCard";
import { Plus } from "lucide-react";
import {
  DragDropContext,
  Droppable,
  Draggable
} from "@hello-pangea/dnd";

export default function Modules() {
  const [modules, setModules] = useState([]);

  // Helper to generate unique IDs
  const makeId = (prefix = "m") =>
    `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

  const addModule = () => {
    const newModule = {
      id: makeId("m"),
      title: `Module ${modules.length + 1}`,
      description: "",
      lessons: [],
    };
    setModules((prev) => [...prev, newModule]);
  };

  const deleteModule = (index) => {
    setModules((prev) => prev.filter((_, i) => i !== index));
  };

  const editModule = (index, newTitle) => {
    setModules((prev) => {
      const copy = [...prev];
      copy[index].title = newTitle;
      return copy;
    });
  };
const addLesson = (moduleIndex, lesson) => {
  setModules((prev) => {
    const copy = [...prev];

    // deep clone the module so we don't mutate prev
    const updatedModule = {
      ...copy[moduleIndex],
      lessons: [...copy[moduleIndex].lessons, lesson]
    };

    copy[moduleIndex] = updatedModule;
    return copy;
  });
};

  const deleteLesson = (moduleIndex, lessonIndex) => {
    setModules((prev) => {
      const copy = [...prev];
      copy[moduleIndex].lessons.splice(lessonIndex, 1);
      return copy;
    });
  };

  // ⭐ New drag & drop handler using @hello-pangea/dnd
  const onDragEnd = useCallback((result) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;

    if (sourceIndex === destIndex) return;

    setModules((prev) => {
      const updated = Array.from(prev);
      const [movedItem] = updated.splice(sourceIndex, 1);
      updated.splice(destIndex, 0, movedItem);
      return updated;
    });
  }, []);

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-[#124734]">Modules</h2>

        <button
          onClick={addModule}
          className="flex items-center gap-2 bg-[#124734] text-white px-4 py-2 rounded-lg"
        >
          <Plus size={18} /> Add Module
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="modules-list">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-4">

              {modules.length === 0 ? (
                <p className="text-sm text-gray-500">
                  No modules added yet. Click "Add Module" to start.
                </p>
              ) : (
                modules.map((mod, index) => (
                  <Draggable key={mod.id} draggableId={mod.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`transition ${
                          snapshot.isDragging ? "shadow-lg border border-green-300" : ""
                        }`}
                      >
                        <ModuleCard
                          module={mod}
                          index={index}
                          onDelete={() => deleteModule(index)}
                         onEdit={(i, newTitle) => editModule(i, newTitle)}

                          onAddLesson={(i, lesson) => addLesson(i, lesson)}
                          onDeleteLesson={(i, li) => deleteLesson(i, li)}
                        />
                      </div>
                    )}
                  </Draggable>
                ))
              )}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
