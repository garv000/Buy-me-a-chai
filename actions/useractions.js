"use server"
import { Cashfree } from "cashfree-pg"
import Payment from "@/models/Payment"
import User from "@/models/User"
import mongoose from "mongoose"
var cashfree_id="";
var cashfree_secret="";

export const initiate = async (amount, to_username, paymentform) => {

    await mongoose.connect(process.env.MONGO_URI)
    let u = await User.findOne({ username: to_username })
    cashfree_id=u.cashfreeid
    cashfree_secret=u.cashfreesecret
    Cashfree.XClientId = cashfree_id
    Cashfree.XClientSecret = cashfree_secret
    Cashfree.XEnvironment = Cashfree.Environment.SANDBOX
    const order = {
        "order_amount": amount,
        "order_currency": "INR",
        "customer_details": {
            "customer_id": paymentform.name,
            "customer_phone": "0000000000"
        },
        "order_meta": {
            "return_url": "https://localhost:3000/"
        }
    };
    let response = await Cashfree.PGCreateOrder("2022-09-01", order).then(async (response) => {
        console.log('Order Created successfully')
        await Payment.create({ oid: response.data.order_id, amount: amount, to_user: to_username, name: paymentform.name, message: paymentform.message })
        return response.data
    }).catch((error) => {
        console.error('Error:', error);
    });
    return response
}
export const verify = async (orderid) => {

    await mongoose.connect(process.env.MONGO_URI)
    Cashfree.XClientId = cashfree_id
    Cashfree.XClientSecret = cashfree_secret
    Cashfree.XEnvironment = Cashfree.Environment.SANDBOX
    let a
    let b=false
    await Cashfree.PGOrderFetchPayments("2023-08-01", orderid).then(async (response) => {
        console.log('Order fetched successfully', response.data[0].payment_status);
        a = response.data[0].payment_status
        if (a === 'SUCCESS') {
            const updatedPayment = await Payment.findOneAndUpdate(
                { oid: orderid }, // Filter
                { done: true }, // Update operation
                { new: true } // Option to return the updated document
            );
            b=true
            return b
        }
    }).catch((error) => {
        console.error('Error:', error);
    });
    return b
}

export const fetchuser = async (username) => {
    await mongoose.connect(process.env.MONGO_URI)
    let u = await User.findOne({ username: username }).lean()
    return u
}

export const fetchpayments = async (username) => {
    await mongoose.connect(process.env.MONGO_URI)
    let p = await Payment.find({ to_user: username, done: true }).sort({ amount: -1 }).lean()
    return p
}

export const updateprofile = async (data, oldusername) => {
    await mongoose.connect(process.env.MONGO_URI)
    let newdata = Object.fromEntries(data)
    if (oldusername !== newdata.username) {
        let u = await User.findOne({ username: newdata.username })
        if (u) {
            return false
        }
        else{
            await User.updateOne({ email: newdata.email }, newdata)
            await Payment.updateMany({to_user:oldusername},{to_user:newdata.username})
            return true
        }
    }
    await User.updateOne({ email: newdata.email }, newdata)
    return true
}