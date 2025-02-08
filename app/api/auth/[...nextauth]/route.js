import NextAuth from 'next-auth'
import AppleProvider from 'next-auth/providers/apple'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'
import GitHubProvider from "next-auth/providers/github";
import mongoose from 'mongoose'
import User from '@/models/User'
import Payment from '@/models/Payment'

export const authoptions = NextAuth({
    providers: [
        // OAuth authentication providers...
        // AppleProvider({
        //     clientId: process.env.APPLE_ID,
        //     clientSecret: process.env.APPLE_SECRET
        // }),
        // FacebookProvider({
        //     clientId: process.env.FACEBOOK_ID,
        //     clientSecret: process.env.FACEBOOK_SECRET
        // }),
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_ID,
        //     clientSecret: process.env.GOOGLE_SECRET
        // }),
        // // Passwordless / email sign in
        // EmailProvider({
        //     server: process.env.MAIL_SERVER,
        //     from: 'NextAuth.js <no-reply@example.com>'
        // }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            if (account.provider == "github") {
                // connect to the database
                await mongoose.connect(process.env.MONGO_URI)
                // check if user already exists in database
                const userExists = await User.findOne({ email: user.email })
                if (!userExists) {
                    // create a new user
                    const newuser = new User({
                        email: user.email,
                        username: user.email.split("@")[0]
                    })
                    await newuser.save()
                }
                return true
            }
        },
        async session({ session, user, token }) {
            await mongoose.connect(process.env.MONGO_URI)
            const dbuser = await User.findOne({ email: session.user.email })
            session.user.name = dbuser.username
            return session
        },
    }
})

export { authoptions as GET, authoptions as POST }