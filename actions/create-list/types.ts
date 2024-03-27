import * as z from "zod";
import { List } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { CreateList } from "@/actions/create-list/schema";

export type InputType = z.output<typeof CreateList>;
export type ReturnType = ActionState<InputType, List>;
