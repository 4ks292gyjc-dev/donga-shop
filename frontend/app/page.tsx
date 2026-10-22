import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import CustomerForm from "@/components/CustomerForm";

const products = [
  { name: "동아고 후드티", price: 35000, color: "bg-blue-700" },
  { name: "텀블러", price: 15000, color: "bg-emerald-600" },
  { name: "에코백", price: 12000, color: "bg-amber-500" },
];

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4">
      <Header />
      <section className="grid gap-6 sm:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.name} {...p} />
        ))}
      </section>
      <CustomerForm products={products.map((p) => p.name)} />
    </main>
  );
}
