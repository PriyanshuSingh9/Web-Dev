import React from 'react'
import { paymentType } from '@/types'

const Supporters = ({ payments }: { payments: paymentType[] }) => {

    if (payments.length === 0) {
        return (
            <div className="text-gray-400 text-center py-4">
                No supporters yet. Be the first one!
            </div>
        )
    }

    return (
        <div className="mt-4 flex flex-col gap-3 pr-2">
            <h2 className='text-xl font-bold mb-4 border-b border-slate-700 pb-2'>Supporters</h2>
            {payments.map((payment, index) => (
                <div key={index} className="bg-slate-900 p-3 rounded-lg border border-slate-800 flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                        <span className="font-semibold text-sm text-blue-400 truncate max-w-[70%]">
                            {payment.donor}
                        </span>
                        <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">
                            ₹{payment.amount}
                        </span>
                    </div>
                    {payment.message && (
                        <p className="text-sm text-gray-300 italic">
                            "{payment.message}"
                        </p>
                    )}
                </div>
            ))}
        </div>
    )
}

export default Supporters
