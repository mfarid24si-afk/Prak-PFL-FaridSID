import React from "react";
import PageHeader from "../components/PageHeader";

export default function Orders() {
    return (
        <div id="orders-page" className="p-8 bg-gray-50 flex-1 min-h-screen">
            <PageHeader />
            
            <div className="mt-8 bg-white p-8 rounded-[2rem] shadow-sm">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Order List</h2>
                <div className="h-64 border-2 border-dashed border-gray-200 rounded-3xl flex items-center justify-center text-gray-400">
                    Belum ada pesanan yang masuk.
                </div>
            </div>
        </div>
    );
}
