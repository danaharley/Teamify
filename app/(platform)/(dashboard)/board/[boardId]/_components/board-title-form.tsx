"use client";

import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import { Board } from "@prisma/client";

import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";

import { updateBoard } from "@/actions/update-board";

import { useAction } from "@/hooks/use-action";

type BoardTitleFormProps = {
  data: Board;
};

export const BoardTitleForm = ({ data }: BoardTitleFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(data.title);

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  const { execute } = useAction(updateBoard, {
    onSuccess: (data) => {
      toast.success(`Board "${data.title}" updated.`);
      setTitle(data.title);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;

    if (title === data.title) return disableEditing();

    execute({
      id: data.id,
      title,
    });
  };

  if (isEditing) {
    return (
      <form
        ref={formRef}
        action={onSubmit}
        className="flex items-center gap-x-2"
      >
        <FormInput
          ref={inputRef}
          id="title"
          onBlur={onBlur}
          defaultValue={title}
          className="h-7 border-none bg-transparent px-[7px] py-1 text-lg font-bold focus-visible:outline-none focus-visible:ring-transparent"
        />
      </form>
    );
  }

  return (
    <Button
      variant="transparent"
      className="size-auto p-1 px-2 text-lg font-bold"
      onClick={enableEditing}
    >
      {title}
    </Button>
  );
};
