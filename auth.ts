 import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { client } from "./sanity/lib/client";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries";
import { writeClient } from "./sanity/lib/write-client";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  // callbacks : {
  //   async signIn({ user, account, profile }) {
  //     if (account?.provider === "github") {
  //       const author = await client.fetch(AUTHOR_BY_GITHUB_ID_QUERY, { githubId: profile?.id });
  //       if (!author) {
  //         await client.create({
  //           _type: "author",
  //           _id: profile?.id,
  //           name: profile?.name,
  //           image: profile?.image,
  //           bio: profile?.bio,
  //           githubId: profile?.id,
  //         })
  //       }
  //       return true;
  //     }
  //     return false;
  //   },        
  //   async jwt({ token, user }) {
  //     if (user) {
  //       token.id = user.id;
  //     }
  //     return token;
  //   }   ,
  //   async session({ session, token }) {
  //     if (token.sub) {
  //       session.user.id = token.sub;
  //     }
  //     return session;
  //   },
  // }
  callbacks: {
    async signIn({ user, profile }) {
      if (!profile || !profile.id) {
        // Optionally log or handle the error
        return false; // Deny sign-in if no profile or id
      }

      const { id, login, bio } = profile as { id: string; login?: string; bio?: string };

      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id });

      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id,
          name: user.name,
          username: login || "",
          email: user.email,
          image: user.image,
          bio: bio || "",
        });
      }

      return true;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
            id: profile?.id,
          });

        token.id = user?._id;
      }

      return token;
    },
    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session;
    },
  },
});
