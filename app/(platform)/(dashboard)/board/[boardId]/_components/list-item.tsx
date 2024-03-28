"use client";

import { ElementRef, useRef, useState } from "react";

import { ListHeader } from "./list-header";

import { ListWithCards } from "@/types";

type ListItemProps = {
  data: ListWithCards;
  index: number;
};

export const ListItem = ({ data, index }: ListItemProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const textareaRef = useRef<ElementRef<"textarea">>(null);

  const disableEditing = () => {
    setIsEditing(false);
  };

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };
  return (
    <li className="h-full w-[272px] shrink-0 select-none">
      <div className="w-full rounded-md bg-[#f1f2f4] pb-2 shadow-md">
        <ListHeader data={data} onAddCard={enableEditing} />
      </div>
    </li>
  );
};
