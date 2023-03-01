import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
    const { value: token } = req.cookies.getWithOptions("token");

    try {
        /* await jwt.isValidToken(token || ""); */

        await jwtVerify(token || "", new TextEncoder().encode(process.env.JWT_SECRET_SEED || ""));

        return NextResponse.next();
    } catch (error) {
        /* return NextResponse.redirect("/auth/login?p=/checkout/address"); */
        return NextResponse.redirect(new URL(`/auth/login?p=${req.nextUrl.pathname}`, req.url));
    }
}

export const config = {
    matcher: ["/checkout/:path*"],
};
