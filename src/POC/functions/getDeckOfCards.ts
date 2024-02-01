import { UniqueIdentifier } from "@dnd-kit/core";
import { nanoid } from "nanoid";

export interface IToolBox {
  id: UniqueIdentifier | string;
  type: string;
  title: string;
}

export const toolItems: IToolBox[] = [
  { id: nanoid(11), type: "Row", title: "Row" },
  { id: nanoid(11), type: "TextBox", title: "TextBox" },
  { id: nanoid(11), type: "TextArea", title: "Text Area" }
];