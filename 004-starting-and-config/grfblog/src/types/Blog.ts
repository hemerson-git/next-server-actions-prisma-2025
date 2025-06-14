import { Prisma } from "@prisma/client";

export type BlogWithUsers = Prisma.Payload<{
  include: {
    users: true;
  };
}>;

export type BlogUsersWithUsers = Prisma.Payload<{
  include: {
    user: true;
  };
}>;
