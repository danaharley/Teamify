import * as z from "zod";
import { Board } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { DeleteBoard } from "@/actions/delete-board/schema";

export type InputType = z.output<typeof DeleteBoard>;
export type ReturnType = ActionState<InputType, Board>;
