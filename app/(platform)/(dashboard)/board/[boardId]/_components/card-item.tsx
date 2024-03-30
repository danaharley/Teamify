"use client";

import { Draggable } from "@hello-pangea/dnd";
import { Card } from "@prisma/client";

type CardItemProps = {
  index: number;
  data: Card;
};

export const CardItem = ({ data, index }: CardItemProps) => {
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          role="button"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="truncate rounded-md border-2 border-transparent px-3 py-2 text-sm shadow-sm hover:border-black"
        >
          {data.title}
        </div>
      )}
    </Draggable>
  );
};
