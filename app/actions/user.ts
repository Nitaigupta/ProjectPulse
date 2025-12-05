"use server";

import { UserDataType } from "@/components/OnboardingForm";
import { userRequired } from "../data/user/is-user-authenticated";
import { userSchema } from "@/lib/schema";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export const createUser = async (data: UserDataType) => {
  const { user } = await userRequired();

  if (!user) {
    throw new Error("User is not authenticated");
  }

  const validatedData = userSchema.parse(data);

  const userData = await db.user.upsert({
    where: { id: user.id },
    create: {
      id: user.id,
      email: user.email as string,
      name: validatedData.name,
      about: validatedData.about,
      country: validatedData.country,
      industryType: validatedData.industryType,
      role: validatedData.role,
      onboardingCompleted: true,
      image: user?.picture || "",
      subscription: {
        create: {
          plan: "FREE",
          status: "ACTIVE",
          currentPeriodEnd: new Date(),
          cancelAtPeriodEnd: false,
        },
      },
    },
    update: {
      email: user.email as string,
      name: validatedData.name,
      about: validatedData.about,
      country: validatedData.country,
      industryType: validatedData.industryType,
      role: validatedData.role,
      onboardingCompleted: true,
      image: user?.picture || "",
      subscription: {
        upsert: {
          create: {
            plan: "FREE",
            status: "ACTIVE",
            currentPeriodEnd: new Date(),
            cancelAtPeriodEnd: false,
          },
          update: {
            plan: "FREE",
            status: "ACTIVE",
            cancelAtPeriodEnd: false,
          },
        },
      },
    },
    select: {
      id: true,
      name: true,
      email: true,
      workspaces: true,
    },
  });

  // TODO: Send User welcome email

  if (userData.workspaces.length === 0) {
    redirect("/create-workspace");
  }

  redirect("/workspace");
};
