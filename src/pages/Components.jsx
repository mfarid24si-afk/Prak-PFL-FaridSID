import React, { useState } from "react";
import Button from "../components/Button";
import Badge from "../components/Badge";
import Avatar from "../components/Avatar";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Card from "../components/Card";
import ProductCard from "../components/ProductCard";
import Table from "../components/Table";
import InputField from "../components/InputField";
import TextArea from "../components/TextArea";
import SelectField from "../components/SelectField";
import Alert from "../components/Alert";
import Modal from "../components/Modal";
import Loading from "../components/Loading";
import HeroSection from "../components/HeroSection"; // <--- Tambahkan import ini

export default function Components() {
  // Contoh data dari modul untuk komponen Table
  const headers = ["No", "Nama Produk", "Kategori", "Harga", "Aksi"];

  const products = [
    {
      id: 1,
      name: "Laptop Asus",
      category: "Elektronik",
      price: "Rp 8.000.000",
    },
    {
      id: 2,
      name: "Sepatu Sport",
      category: "Fashion",
      price: "Rp 450.000",
    },
    {
      id: 3,
      name: "Jam Tangan",
      category: "Aksesoris",
      price: "Rp 799.000",
    },
  ];

  const kategoriOptions = [
    { value: "elektronik", label: "Elektronik" },
    { value: "fashion", label: "Fashion" },
    { value: "aksesoris", label: "Aksesoris" },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-8">
      {/* Demo Container */}

      <div className="p-6 space-y-12">
        {/* --- SECTION COMPONENT --- */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold border-b pb-2">Section Components</h2>
          <HeroSection />
        </div>

        {/* --- SECTION BASIC COMPONENT --- */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold border-b pb-2">Basic Components</h2>
          <section className="space-y-2">
            <h3 className="text-lg font-semibold">1. Button</h3>
            <div className="flex gap-2">
              <Button type="success">Simpan</Button>
              <Button type="danger">Hapus</Button>
            </div>
          </section>

          <section className="space-y-2">
            <h3 className="text-lg font-semibold">2. Badge</h3>
            <div className="flex gap-2">
              <Badge type="success">Aktif</Badge>
              <Badge type="danger">Nonaktif</Badge>
            </div>
          </section>

          <section className="space-y-2">
            <h3 className="text-lg font-semibold">3. Avatar</h3>
            <div className="flex gap-2">
              <Avatar name="Budi" />
              <Avatar name="Siti" />
            </div>
          </section>
        </div>

        {/* --- SECTION DATA DISPLAY COMPONENT --- */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold border-b pb-2">
            Data Display Components
          </h2>

          <section className="space-y-2">
            <h3 className="text-lg font-semibold">1. Standard Card</h3>
            <Card>
              <h2 className="text-xl font-bold">Judul Card</h2>
              <p className="text-gray-600">Ini adalah isi dari card.</p>
            </Card>
          </section>

          <section className="space-y-2">
            <h3 className="text-lg font-semibold">2. Product Card</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ProductCard
                image="https://unsplash.com"
                title="Sepatu Sport"
                category="Fashion"
                price="Rp 450.000"
                description="Sepatu sport modern dengan desain nyaman dan ringan untuk aktivitas sehari-hari."
              />
              <ProductCard
                image="https://unsplash.com"
                title="Smartphone"
                category="Elektronik"
                price="Rp 4.500.000"
                description="Smartphone dengan performa cepat, kamera jernih, dan baterai tahan lama."
              />
            </div>
          </section>

          <section className="space-y-2">
            <h3 className="text-lg font-semibold">3. Table</h3>
            <Table headers={headers}>
              {products.map((product, index) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-3">{index + 1}</td>
                  <td className="border px-4 py-3">{product.name}</td>
                  <td className="border px-4 py-3">{product.category}</td>
                  <td className="border px-4 py-3">{product.price}</td>
                  <td className="border px-4 py-3">
                    <button className="bg-blue-600 text-white px-3 py-1 rounded">
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </Table>
          </section>
        </div>

        {/* --- SECTION FORM COMPONENT --- */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold border-b pb-2">Form Components</h2>
          <section className="space-y-4 max-w-md">
            <InputField label="Nama Produk" placeholder="Masukkan nama produk..." />
            <SelectField label="Kategori" options={kategoriOptions} />
            <TextArea label="Deskripsi Produk" placeholder="Masukkan deskripsi lengkap produk..." />
          </section>
        </div>

        {/* --- SECTION FEEDBACK COMPONENT --- */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold border-b pb-2">Feedback Components</h2>
          <section className="space-y-4 max-w-xl">
            <h3 className="text-lg font-semibold">1. Alert Notification</h3>
            <Alert type="success">Data produk berhasil disimpan ke dalam database!</Alert>
            <Alert type="danger">Terjadi kesalahan koneksi sistem. Silakan coba kembali.</Alert>
            
            <h3 className="text-lg font-semibold pt-2">2. Loading Indicator</h3>
            <Loading />

            <h3 className="text-lg font-semibold pt-2">3. Modal Dialog</h3>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Buka Modal Dialog
            </button>

            <Modal 
              isOpen={isModalOpen} 
              onClose={() => setIsModalOpen(false)} 
              title="Konfirmasi Penghapusan"
            >
              <p className="text-gray-600 mb-4">Apakah Anda yakin ingin menghapus data produk ini secara permanen?</p>
              <div className="flex justify-end gap-2">
                <button 
                  onClick={() => setIsModalOpen(false)} 
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
                >
                  Batal
                </button>
                <button 
                  onClick={() => { alert("Data dihapus!"); setIsModalOpen(false); }} 
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                >
                  Ya, Hapus
                </button>
              </div>
            </Modal>
          </section>
        </div>
      </div>

      {/* Demo Footer */}
      <Footer />
    </div>
  );
}
