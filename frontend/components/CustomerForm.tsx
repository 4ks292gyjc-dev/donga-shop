"use client";

import { useEffect, useState } from "react";

type Customer = { id: number; name: string; email: string; product: string };

const API = process.env.NEXT_PUBLIC_API_URL;

async function fetchCustomers(): Promise<Customer[]> {
  const res = await fetch(`${API}/customers`);
  if (!res.ok) throw new Error(`목록 불러오기 실패 (${res.status})`);
  return res.json();
}

export default function CustomerForm({ products }: { products: string[] }) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCustomers()
      .then(setCustomers)
      .catch((err) => setError(String(err.message ?? err)));
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setMessage("");
    setError("");
    try {
      const res = await fetch(`${API}/customers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          product: data.get("product"),
        }),
      });
      if (!res.ok) throw new Error(`등록 실패 (${res.status})`);
      setMessage("등록되었습니다!");
      form.reset();
      setCustomers(await fetchCustomers());
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  }

  const input = "mt-1 w-full rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900";

  return (
    <section className="py-12">
      <h2 className="text-xl font-bold">고객 등록</h2>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
        <label>
          이름
          <input name="name" required className={input} />
        </label>
        <label>
          이메일
          <input name="email" type="email" required className={input} />
        </label>
        <label>
          관심 상품
          <select name="product" required className={input}>
            {products.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </label>
        <button type="submit" className="rounded bg-blue-700 py-2 font-semibold text-white hover:bg-blue-800">
          등록하기
        </button>
      </form>
      <div aria-live="polite" className="mt-4">
        {message && <p className="text-green-700">{message}</p>}
        {error && <p className="text-red-600" role="alert">{error}</p>}
      </div>

      <h3 className="mt-8 text-lg font-bold">등록된 고객</h3>
      {customers.length === 0 ? (
        <p className="mt-2 text-zinc-500">아직 등록된 고객이 없습니다.</p>
      ) : (
        <ul className="mt-2 flex flex-col gap-2">
          {customers.map((c) => (
            <li key={c.id} className="rounded bg-zinc-100 p-3 dark:bg-zinc-900">
              {c.name} · {c.email} · {c.product}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
