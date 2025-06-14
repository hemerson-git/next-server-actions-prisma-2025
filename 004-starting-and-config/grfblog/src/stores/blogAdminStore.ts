import { Blog } from "@/generated/prisma";
import { BlogWithUsers } from "@/types/Blog";
import { create } from "zustand";

export type BlogState = {
  blogs: Blog[];
  blogSelected: BlogWithUsers | null;
};

export type BlogActions = {
  setBlog: (blog: Blog[]) => void;
  setBlogSelected: (blog: BlogWithUsers | null) => void;
};

export const useBlogAdminStore = create<BlogState & BlogActions>((set) => ({
  blogs: [],
  blogSelected: null,
  setBlog: (blogs) => set({ blogs }),
  setBlogSelected: (blogSelected) => set({ blogSelected }),
}));
