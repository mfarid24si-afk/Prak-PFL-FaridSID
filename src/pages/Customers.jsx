import React from "react";
import PageHeader from "../components/PageHeader";
import { customersData } from "../data/dummyData";

export default function Customers() {
    return (
        <div className="p-8 bg-gray-50 flex-1 min-h-screen">
            <PageHeader title="Customers" breadcrumb="Customers">
                <button className="bg-green-500 text-white px-6 py-2 rounded-xl font-bold shadow-md hover:bg-green-600 transition-all">
                    + Add Customer
                </button>
            </PageHeader>

            <div className="bg-white rounded-[2rem] p-8 shadow-sm overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="text-gray-400 border-b border-gray-50 text-sm uppercase">
                            <th className="pb-4">ID</th>
                            <th className="pb-4">Name</th>
                            <th className="pb-4">Email</th>
                            <th className="pb-4">Phone</th>
                            <th className="pb-4">Loyalty</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {customersData.map((cust) => (
                            <tr key={cust.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                                <td className="py-4 text-gray-400">{cust.id}</td>
                                <td className="py-4 font-bold">{cust.name}</td>
                                <td className="py-4">{cust.email}</td>
                                <td className="py-4">{cust.phone}</td>
                                <td className="py-4 font-bold text-green-600">{cust.loyalty}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
