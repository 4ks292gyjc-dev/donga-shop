"use client";

import { useState } from "react";

type Customer = { name: string; email: string; product: string };

export default function CustomerForm({ products }: { products: string[] }) {
  const [submitted, setSubmitted] = useState<Customer | null>(null);

  // shortcut: shows input only, no server save; replace with an API call when the backend exists.
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setSubmitted({
      name: String(data.get("name")),
      email: String(data.get("email")),
      product: String(data.get("product")),
    });
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
      {submitted && (
        <div className="mt-6 rounded bg-zinc-100 p-4 dark:bg-zinc-900" aria-live="polite">
          <p>이름: {submitted.name}</p>
          <p>이메일: {submitted.email}</p>
          <p>관심 상품: {submitted.product}</p>
        </div>
      )}
    </section>
  );
}
