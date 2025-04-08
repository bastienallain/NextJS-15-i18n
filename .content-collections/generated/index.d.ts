import configuration from "../../content-collections.ts";
import { GetTypeByName } from "@content-collections/core";

export type BlogPost = GetTypeByName<typeof configuration, "blog">;
export declare const allBlogs: Array<BlogPost>;

export {};
