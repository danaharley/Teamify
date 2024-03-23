"use server";

import * as z from "zod";

const CreateBoard = z.object({
  title: z.string(),
});

export const create = async (formData: FormData) => {
  console.log(formData);
};
