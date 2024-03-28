"use client";

import { Card } from "@prisma/client";

type CardItemProps = {
  index: number;
  data: Card;
};

export const CardItem = ({ data, index }: CardItemProps) => {
  return (
    <div className="truncate rounded-md border-2 border-transparent px-3 py-2 text-sm shadow-sm hover:border-black">
      {data.title}
    </div>
  );
};
