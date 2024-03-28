"use client";

import { ElementRef, useRef } from "react";
import { toast } from "sonner";
import { MoreHorizontal, X } from "lucide-react";
import { List } from "@prisma/client";

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { FormSubmit } from "@/components/form/form-submit";

import { copyList } from "@/actions/copy-list";
import { deleteList } from "@/actions/delete-list";

import { useAction } from "@/hooks/use-action";

type ListOptionsProps = {
  data: List;
  onAddCard: () => void;
};

export const ListOptions = ({ data, onAddCard }: ListOptionsProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);

  const { execute: executeDelete } = useAction(deleteList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" deleted`);
      closeRef.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const { execute: executeCopy } = useAction(copyList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" copied`);
      closeRef.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onDelete = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    executeDelete({ id, boardId });
  };

  const onCopy = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    executeCopy({ id, boardId });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="size-auto p-2">
          <MoreHorizontal className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="start" className="px-0 pb-3 pt-3">
        <div className="pb-4 text-center text-sm font-medium text-neutral-600">
          List actions
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            variant="ghost"
            className="absolute right-2 top-2 size-auto p-2 text-neutral-600"
          >
            <X className="size-4" />
          </Button>
        </PopoverClose>
        <Button
          variant="ghost"
          onClick={onAddCard}
          className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
        >
          Add card...
        </Button>
        <form action={onCopy}>
          <input hidden name="id" id="id" defaultValue={data.id} />
          <input
            hidden
            name="boardId"
            id="boardId"
            defaultValue={data.boardId}
          />
          <FormSubmit
            variant="ghost"
            className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
          >
            Copy list...
          </FormSubmit>
        </form>
        <Separator />
        <form action={onDelete}>
          <input hidden name="id" id="id" defaultValue={data.id} />
          <input
            hidden
            name="boardId"
            id="boardId"
            defaultValue={data.boardId}
          />
          <FormSubmit
            variant="ghost"
            className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
          >
            Delete this list
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};
