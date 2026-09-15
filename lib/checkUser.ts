import { currentUser, auth } from "@clerk/nextjs/server"
import { Plan } from "@/types/plans";
import { PLANS } from "@/lib/constant";
import { db } from "./prisma";
import { Console } from "console";
const getCurrentPlan = async (): Promise<Plan> => {
    const { has } = await auth();
    if (has({ plan: "starter" })) return "starter";
    if (has({ plan: "pro" })) return "pro";
    return "free";
}
export const checkUser = async () => {
    const user = await currentUser();
    if (!user) return null;
    try {
        const currentPlan = await getCurrentPlan();
        const existing = await db.user.findUnique({
            where: { clerkId: user.id },
        });
        if (existing) {
            if (existing.plan !== currentPlan) {
                return await db.user.update({
                    where: { clerkId: user.id },
                    data: {
                        plan: currentPlan,
                        credits: existing.credits + PLANS[currentPlan].credits,
                    }
                })
            }
            return existing;

        }
        //new user - create with free plan credits 
        return await db.user.create({
            data: {
                clerkId: user.id,
                email: user.emailAddresses[0].emailAddress,
                name: user.firstName + " " + user.lastName,
                imageUrl: user.imageUrl ?? "",
                plan: "free",
                credits: PLANS.free.credits,
            },
        });
    } catch (error) {
        console.error("checkUser error:", error);
        return null;
    }
}