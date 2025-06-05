import { Prisma } from "@prisma/client";

export type PostsWithUser = Prisma.Payload<{
  include: {
    user: true;
  };
}>;
