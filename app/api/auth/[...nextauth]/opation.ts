import { User } from "@/models/User";
import { connect } from "@/utils/mongo.config";
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/login",
  },
  //save google auth user to database
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        connect();
        const findUser = await User.findOne({ email: user.email });
        if (findUser) {
          return true;
        }
        await User.create({ name: user.name, email: user.email });
        return true;
      } catch (error) {
        console.log("SIGNIN_ERROR", error);
        return false;
      }
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        // const user = { id: "1", name: "J Smith", email: credentials?.email };
        connect();
        const user = await User.findOne({ email: credentials?.email });

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
};
