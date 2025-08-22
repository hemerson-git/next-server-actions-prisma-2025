"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";

export const getDashboardData = async ({ blogId }: { blogId: string }) => {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "UNAUTHORIZED" };
  }

  const totalUser = await prisma.blogUser.count({
    where: {
      blogId,
    },
  });

  const totalPosts = await prisma.post.count({
    where: {
      blogId,
    },
  });

  const totalPostMadeByYou = await prisma.post.count({
    where: {
      blogId,
      userId: session.user.id!,
    },
  });

  return {
    totalUser,
    totalPosts,
    totalPostMadeByYou,
  };
};
