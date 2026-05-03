import React from "react";
import PageHeader from "../components/PageHeader";
import { ordersData } from "../data/dummyData";

export default function Orders() {
    return (
        <div className="p-8 bg-gray-50 flex-1 min-h-screen">
            <PageHeader title="Orders" breadcrumb="Orders">
                <button className="bg-green-500 text-white px-6 py-2 rounded-xl font-bold shadow-md hover:bg-green-600 transition-all">
                    + Add Orders
                </button>
            </PageHeader>

            <div className="bg-white rounded-[2rem] p-8 shadow-sm overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="text-gray-400 border-b border-gray-50 text-sm uppercase">
                            <th className="pb-4">Order ID</th>
                            <th className="pb-4">Customer Name</th>
                            <th className="pb-4">Status</th>
                            <th className="pb-4">Total Price</th>
                            <th className="pb-4">Date</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {ordersData.map((order) => (
                            <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                                <td className="py-4 text-gray-400">{order.id}</td>
                                <td className="py-4 font-bold">{order.customerName}</td>
                                <td className="py-4">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                                        order.status === 'Completed' ? 'bg-green-100 text-green-600' : 
                                        order.status === 'Cancelled' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'
                                    }`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="py-4 font-black">${order.totalPrice}</td>
                                <td className="py-4">{order.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
