import NextAuth from "next-auth";
import { authOptions } from "./opation";
// import GithubProvider from "next-auth/providers/github";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
