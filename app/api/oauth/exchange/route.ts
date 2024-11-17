import prisma from "@/app/lib/db";
import { requireUser } from "@/app/lib/hooks";
import { nylas, nylasConfig } from "@/app/lib/nylas";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const session = await requireUser();
    const url = new URL(req.url as string);
    const code = url.searchParams.get("code");

    if(!code) {
        return Response.json("No code provided", { status: 400 });
    }

    const codeExchangePayload = {
        clientSecret: nylasConfig.apiKey,
        clientId: nylasConfig.clientId as string,
        redirectUri: nylasConfig.callbackUri,
        code,
    };

    try {
        const res = await nylas.auth.exchangeCodeForToken(codeExchangePayload);
        const { grantId, email } = res;

        await prisma.user.update({
            where: {
                id: session.user?.id
            },
            data: {
                grantId,
                grantEmail: email
            }
        });

        console.log({ grantId });
    } catch (error) {
        console.error("Error exchanging code for token:", error);
    };

    redirect("/dashboard");
}