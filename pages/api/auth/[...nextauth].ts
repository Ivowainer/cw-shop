import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/github";
import GithubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { dbUsers } from "../../../database";

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        Credentials({
            name: "Custom Login",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Your email" },
                password: { label: "Password", type: "password", placeholder: "Your Password" },
            },
            // @ts-ignore
            async authorize(credentials) {
                console.log({ credentials });
                // TODO: Validate Password

                return await dbUsers.checkUserEmailPassword(credentials!.email, credentials!.password);
            },
        }),

        /* GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }), */

        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
    ],

    pages: {
        signIn: "/auth/login",
        newUser: "/auth/register",
    },

    session: {
        maxAge: 2592000,
        strategy: "jwt",
        updateAge: 86400,
    },
    // Callbacks
    callbacks: {
        async jwt({ token, account, user }: any) {
            /* console.log({ token, account, user }); */

            if (account) {
                token.accessToken = account.access_token;

                switch (account.type) {
                    //TODO: Verify user in DB
                    case "oauth":
                        token.user = await dbUsers.OAuthToDbUser(user?.email || "", user?.name || "");
                        break;

                    case "credentials":
                        token.user = user;
                        break;
                }
            }

            return token;
        },

        async session({ session, token, user }: any) {
            /* console.log({ session, token, user }); */

            session.accessToken = token.accessToken;
            session.user = token.user;

            return session;
        },
    },
};

// HOC
export default NextAuth(authOptions);
