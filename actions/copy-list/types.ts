import * as z from "zod";
import { List } from "@prisma/client";

import { CopyList } from "@/actions/copy-list/schema";

import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.output<typeof CopyList>;
export type ReturnType = ActionState<InputType, List>;
