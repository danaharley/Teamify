import * as z from "zod";
import { List } from "@prisma/client";

import { DeleteList } from "@/actions/delete-list/schema";

import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.output<typeof DeleteList>;
export type ReturnType = ActionState<InputType, List>;
