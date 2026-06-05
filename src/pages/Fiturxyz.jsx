import ProductCard from "../components/ProductCard";
import { Button } from "@/components/ui/button";
// import Card from './../components/Card';
import { Badge } from "@/components/ui/badge";
// Ganti baris import Card lama dengan ini:
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";




export default function Header() {
	return (
		<section className="space-y-2">
			<h3 className="text-lg font-semibold">Fitur XYZ ni bos</h3>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<ProductCard
					image="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
					title="Sepatu Sport"
					category="Fashion"
					price="Rp 450.000"
					description="Sepatu sport modern dengan desain nyaman dan ringan untuk aktivitas sehari-hari."
				/>

				<ProductCard
					image="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
					title="Smartphone"
					category="Elektronik"
					price="Rp 4.500.000"
					description="Smartphone dengan performa cepat, kamera jernih, dan baterai tahan lama."
				/>

				<Button variant="outline" size="xs">TES</Button>
				<Button variant="secondary" size="xs">TES</Button>
				<Button variant="destructive" size="s">TES</Button>
				<Button variant="ghost" size="l">TES</Button>
				<Button variant="link" size="xl">TES</Button>

				<Card className="mt-4 w-[380px]">
					<CardHeader>
						<div className="flex items-center justify-between">
							<CardTitle>Belajar shadcn/ui</CardTitle>
							<Badge variant="secondary">Baru</Badge>
						</div>
						<CardDescription>
							Contoh penggunaan komponen shadcn/ui di React
						</CardDescription>
					</CardHeader>

					<CardContent>
						<p className="text-sm text-muted-foreground">
							Komponen ini dibuat di branch <strong>setup-shadcn</strong>
							lalu di-merge ke main.
						</p>
					</CardContent>

					<CardFooter className="flex gap-2">
						<Button>Simpan</Button>
						<Button variant="outline">Batal</Button>
					</CardFooter>
				</Card>
			</div>
		</section>
	)
}