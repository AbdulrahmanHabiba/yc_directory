import { type SchemaTypeDefinition } from 'sanity'
import {author} from "@/sanity/schemaTypes/auther";
import {startup} from "@/sanity/schemaTypes/startup";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author , startup],
}
