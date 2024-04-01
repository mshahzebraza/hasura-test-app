// pages/api/auth/[...nextauth].ts
import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from "next-auth/providers/google";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { checkUserExists } from '@/lib/checkUserExists.helper';

export const authOptions: AuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: String(process.env.GOOGLE_CLIENT_ID),
            clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
            // specifying the authorization object ensures that refresh tokens are always sent to the client on signins, otherwise the client will only receive a refresh token on the first signin
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        })
    ],
    callbacks: {
        async signIn({ account, profile, user, credentials, email }) {

            // TODO: Get the user role from the database and append it to the token/user object
            // get the user role from the database and append it to the token/user object
            // const validUserRole = await getUserRole(user.email);
            // if (!validUserRole) return false;
            // user.role = validUserRole; // TODO: Later add the "X-Hasura-Role" to the token
            // TODO: GOOD TO HAVE: Add the "X-Hasura-User-ID" to the token as well for permission checks


            // query the database to check if the user exists and is assigned a role by the admin. If not, sign-in is rejected.
            const isUserAllowedToSignIn = await checkUserExists((profile as any).email);
            if (!isUserAllowedToSignIn) {
                return false;
            }

            if (account?.provider === "google") {
                const isValidEmail = (profile as any)?.email_verified && (profile as any).email?.endsWith("@gmail.com")
                return isValidEmail;
            }

            return true;
        },

        async jwt({ token, user, account, profile, session }) {
            console.log(`🚀 ~ jwt ~ user:`, user) // empty
            console.log(`🚀 ~ jwt ~ account:`, account) // empty
            console.log(`🚀 ~ jwt ~ token:`, token) // has value
            console.log(`🚀 ~ jwt ~ profile:`, profile) // empty
            console.log(`🚀 ~ jwt ~ session:`, session)// empty
            // Persist the OAuth access_token to the token right after signin

            // account and user are empty after the 1st sign-in until the token is refreshed
            if (account) {
                token.accessToken = account.access_token
            }
            if (user) {
                token.userRole = (user as any).role; // Append user role to token
            }

            return token;
        },
        async session({ session, token }) {
            // Send properties to the client, like an access_token from a provider.
            (session as any).accessToken = (token as any).accessToken;

            (session as any).user.role = token.userRole; // Make user role available on the session
            return session;
        },
    },
    jwt: {
        encode: async ({ secret, token }) => {
            console.log(`🚀 ~ encode: ~ token:`, token)
            const jwtClaims = {
                sub: (token as any).sub.toString(),
                "https://hasura.io/jwt/claims": {
                    "x-hasura-default-role": (token as any).userRole,
                    "x-hasura-allowed-roles": ["admin", "teacher", "student"],
                    "x-hasura-user-id": (token as any).sub.toString(),
                },
                iat: Date.now() / 1000,
                exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
            };

            const encodedToken = jwt.sign(jwtClaims, secret, { algorithm: 'HS256' });
            return encodedToken;
        },
        decode: ({ secret, token }) => {
            return jwt.verify(token || '', secret, { algorithms: ['HS256'] }) as JwtPayload | null;
        },
    },
    session: {
        strategy: 'jwt',
    },
    // pages: {
    //     signIn: '/auth/signin', // Specify your custom sign-in page
    // },
}

export default NextAuth(authOptions);
