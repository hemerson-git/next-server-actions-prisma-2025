"use server";

import { intl } from "@/config/intl";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { redirect } from "@/lib/navigation";
import { revalidatePath } from "next/cache";

export const getMyBlogs = async () => {
  const user = await auth();

  const blogs = await prisma.blog.findMany({
    where: {
      users: {
        some: {
          userId: user?.user?.id,
        },
      },
      deletedAt: null,
    },
  });

  return { data: blogs };
};

type BlogData = {
  title: string;
  subtitle: string;
  slug: string;
  bgColor: string;
  textColor: string;
};

type CreateBlogProps = {
  data: BlogData;
};

export const createBlog = async ({ data }: CreateBlogProps) => {
  const user = await auth();

  const slugExists = await prisma.blog.findFirst({
    where: {
      slug: data.slug,
    },
  });

  if (slugExists) {
    return { error: "SLUG_ALREADY_EXISTS" };
  }

  if (!user?.user?.id) {
    return { error: "USER_NOT_AUTHENTICATED" };
  }

  const blog = await prisma.blog.create({
    data: {
      ...data,
      users: {
        create: [{ role: "OWNER", userId: user.user.id! }],
      },
    },
  });

  revalidatePath("/");
  redirect({ href: `/${blog.slug}/admin`, locale: intl.defaultLocale });
};

type UpdateBlogProps = {
  blogId: string;
  data: BlogData;
};

export const updateBlog = async ({ blogId, data }: UpdateBlogProps) => {
  const blog = await prisma.blog.findFirst({
    where: {
      id: blogId,
    },
    select: {
      slug: true,
    },
  });

  if (blog?.slug !== data.slug) {
    if ((await prisma.blog.count({ where: { slug: data.slug } })) > 0) {
      return { error: "SLUG_ALREADY_EXISTS" };
    }
  }

  await prisma.blog.update({
    where: {
      id: blogId,
    },
    data,
  });

  revalidatePath("/admin/settings");

  if (blog?.slug !== data.slug) {
    redirect({
      href: `/${data.slug}/admin/settings`,
      locale: intl.defaultLocale,
    });
  }
};
