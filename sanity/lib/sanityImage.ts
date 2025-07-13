import imageUrlBuilder from '@sanity/image-url';
import { client } from './client';
import {internalGroqTypeReferenceTo} from "@/sanity/types";

// Helper to build image URLs from Sanity image objects
const builder = imageUrlBuilder(client);

export function urlFor(source: string) {
    return builder.image(source).url();
}