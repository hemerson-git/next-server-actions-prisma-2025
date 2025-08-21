"use server";

import prisma from "@/lib/db";
import { signIn as authSignIn } from "@/lib/auth";
import { redirect } from "@/lib/navigation";
import { intl } from "@/config/intl";

type SignInProps = {
  data: {
    email: string;
  };
};

export const signIn = async ({ data }: SignInProps) => {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    return { error: "USER_NOT_FOUND" };
  }

  // send email verification link
  await authSignIn("nodemailer", {
    email: data.email,
    redirect: false,
  });

  redirect({ href: "/auth/verify-email", locale: intl.defaultLocale });
};

type SignUpProps = {
  data: {
    email: string;
  };
};

export const signup = async ({ data }: SignUpProps) => {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (user) {
    return { error: "USER_ALREADY_EXISTS" };
  }

  // Create new user
  await prisma.user.create({ data });

  // Send email verification link
  await authSignIn("nodemailer", {
    email: data.email,
    redirect: false,
  });

  redirect({ href: "/auth/verify-email", locale: intl.defaultLocale });
};
