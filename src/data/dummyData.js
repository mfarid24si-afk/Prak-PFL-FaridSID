export const ordersData = Array.from({ length: 100 }, (_, i) => {
    const names = ["Farid", "Samantha", "Raihan", "Fikri", "Ahmad", "Budi", "Citra", "Dewi", "Eko", "Gita"];
    const statuses = ["Pending", "Completed", "Cancelled", "Processing"];
    
    return {
        id: `ORD-${String(i + 1).padStart(4, '0')}`, // ORD-0001 sampai ORD-0100
        customerName: names[i % names.length],
        status: statuses[i % statuses.length],
        totalPrice: (Math.random() * 500 + 20).toFixed(2), // Harga lebih variatif
        date: `2024-${String(Math.floor(i / 30) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}` // Tanggal otomatis ganti bulan
    };
});

export const customersData = Array.from({ length: 100 }, (_, i) => {
    const names = ["Farid", "Samantha", "Raihan", "Fikri", "Ahmad", "Budi", "Citra", "Dewi", "Eko", "Gita"];
    const nameLower = names[i % names.length].toLowerCase();
    const loyalties = ["Bronze", "Silver", "Gold", "Platinum"];

    return {
        id: `CUST-${String(i + 1).padStart(4, '0')}`,
        name: names[i % names.length],
        email: `${nameLower}.${i + 1}@mail.com`, // Email unik tiap user
        phone: `0812-${Math.floor(1000 + Math.random() * 9000)}-${String(i + 100).padStart(4, '0')}`,
        loyalty: loyalties[i % loyalties.length]
    };
});
