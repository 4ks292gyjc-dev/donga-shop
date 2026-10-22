type Props = { name: string; price: number; color: string };

export default function ProductCard({ name, price, color }: Props) {
  return (
    <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
      <div className={`aspect-square rounded ${color}`} aria-hidden />
      <h2 className="mt-3 font-semibold">{name}</h2>
      <p className="text-zinc-600 dark:text-zinc-400">{price.toLocaleString("ko-KR")}원</p>
    </div>
  );
}
