"use server";

import prisma from "@/lib/db";
import { BlogUser } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const getBlogUsers = async ({ blogSlug }: { blogSlug: string }) => {
  const users = await prisma.blogUser.findMany({
    where: {
      blog: {
        slug: blogSlug,
      },
    },
    include: {
      user: true,
    },
  });

  return { data: users };
};

export const getBlogUser = async ({
  userId,
  blogId,
}: {
  userId: string;
  blogId: string;
}) => {
  const user = await prisma.blogUser.findFirst({
    where: {
      userId,
      blogId,
    },
    include: {
      user: true,
    },
  });

  if (!user) {
    return { error: "USER_NOT_FOUND" };
  }

  return { data: user };
};

type BlogUserProps = {
  email: string;
  blogId: string;
  role: BlogUser["role"];
};

export const createBlogUser = async ({ data }: { data: BlogUserProps }) => {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    return { error: "USER_NOT_FOUND" };
  }

  const blogUserExists = await prisma.blogUser.count({
    where: {
      blogId: data.blogId,
      userId: user.id,
    },
  });

  if (blogUserExists) {
    return { error: "USER_ALREADY_EXISTS" };
  }

  await prisma.blogUser.create({
    data: {
      blogId: data.blogId,
      userId: user.id,
      role: data.role,
    },
  });

  revalidatePath("/admin/users");
};

type UpdataBlogUserRole = {
  blogUserId: string;
  data: {
    role: BlogUser["role"];
  };
};

export const updateBlogUserRole = async ({
  blogUserId,
  data,
}: UpdataBlogUserRole) => {
  await prisma.blogUser.update({
    where: {
      id: blogUserId,
    },
    data: {
      role: data.role,
    },
  });

  revalidatePath("/admin/users");
};

export const deleteBlogUser = async ({
  blogUserId,
}: {
  blogUserId: string;
}) => {
  await prisma.blogUser.delete({
    where: {
      id: blogUserId,
    },
  });

  revalidatePath("/admin/users");
};
