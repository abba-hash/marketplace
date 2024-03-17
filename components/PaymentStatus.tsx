"use client"

import { useEffect } from "react"
import { trpc } from "../trpc/client"
import { useRouter } from "next/navigation"

interface PaymentStatusProps{
    orderId: string,
    orderEmail: string,
    isPaid: boolean
}

const PaymentStatus = ({orderEmail, orderId, isPaid}: PaymentStatusProps) => {
    const router = useRouter()
    const {data} = trpc.payment.pollOrderStatus.useQuery({orderId},{
        enabled: isPaid===false,
        refetchInterval: (data) => (data?.isPaid ? false : 1000)
    })

    useEffect(()=>{
        if(data?.isPaid){
            router.refresh()
        }
    },[data?.isPaid, router])
  return (
    <div className=" mt-16 grid grid-cols-2 text-sm gap-x-4 text-gray-600">
        <div>
            <p className=" text-gray-900 font-medium">Shipping to</p>
            <p>{orderEmail}</p>
        </div>
        <div>
            <p className=" font-medium text-gray-900">Order Status</p>
            <p>{isPaid ? "Payment Successful" : "Pending Payment"}</p>
        </div>
    </div>
  )
}

export default PaymentStatus