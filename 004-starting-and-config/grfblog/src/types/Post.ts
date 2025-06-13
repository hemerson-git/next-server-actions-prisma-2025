import { Prisma } from "@prisma/client";

export type PostWithUser = Prisma.Payload<{
  include: {
    user: true;
  };
}>;
