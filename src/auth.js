// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { prisma } from "@/lib/prisma";
 
// import bcrypt from "bcryptjs";

// export const {
//     handlers: { GET, POST },
//     auth,
//     signIn,
//     signOut,
// } = NextAuth({
//     session: {
//         strategy: 'jwt',
//     },
//     providers: [
//         CredentialsProvider({
//             async authorize(credentials) {
//                 if (credentials == null) return null;

//                 try {
//                     const user = await prisma.user.findUnique({
//                         where: { email: credentials.email },
//                     });
//                     console.log(user);

//                     if (user) {
//                         const isMatch = await bcrypt.compare(
//                             credentials.password,
//                             user.password
//                         );

//                         if (isMatch) {
//                             return {
//                                     id: user.id,
//                                     name: `${user.firstName} ${user.lastName}`,
//                                     email: user.email,
//                                     role: user.role,
//                                 };
//                         } else {
//                             console.error("password mismatch");
//                             throw new Error("Check your password");
//                         }
//                     } else {
//                         console.error("User not found");
//                         throw new Error("User not found");
//                     }
//                 } catch (err) {
//                     console.error(err);
//                     throw new Error(err);
//                 }
//             }
//         })
//     ]
// });


import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) throw new Error("User not found");

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) throw new Error("Invalid password");

        return {
          id: user.id,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };


