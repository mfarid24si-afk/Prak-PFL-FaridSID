export const ordersData = Array.from({ length: 30 }, (_, i) => ({
    id: `ORD-00${i + 1}`,
    customerName: ["Farid", "Samantha", "Raihan", "Fikri", "Ahmad"][i % 5],
    status: ["Pending", "Completed", "Cancelled"][i % 3],
    totalPrice: (Math.random() * 100 + 10).toFixed(2),
    date: `2024-05-${String((i % 28) + 1).padStart(2, '0')}`
}));

export const customersData = Array.from({ length: 30 }, (_, i) => ({
    id: `CUST-00${i + 1}`,
    name: ["Farid", "Samantha", "Raihan", "Fikri", "Ahmad"][i % 5],
    email: `${["farid", "samantha", "raihan", "fikri", "ahmad"][i % 5]}@mail.com`,
    phone: `0812-3456-78${i + 10}`,
    loyalty: ["Bronze", "Silver", "Gold"][i % 3]
}));
