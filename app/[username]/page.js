import React from 'react'
import PaymentPage from '@/components/PaymentPage'
import { notFound } from 'next/navigation'
import User from '@/models/User'
import mongoose from 'mongoose'

const Username = async ({ params }) => {
  const checkUser = async () => {
    await mongoose.connect(process.env.MONGO_URI)
    let u = await User.findOne({ username: params.username })
    if (!u) {
      return notFound()
    }
  }
  await checkUser()
  return (
    <PaymentPage params={params} />
  )
}

export default Username

export async function generateMetadata({params}) {
  return {
    title: `${params.username} - Buy me a coffee`
  }
}
