// app/products/page.tsx
// ✅ NO 'use client' = Server Component

type TSelectRes = {
  id: number;
  name: string;
};

export default async function ProductsPage() {
  const res = await fetch('http://localhost:3000/api/users');
  const data: TSelectRes[] = await res.json();

  return (
    <div>
      {data.map((p) => (
        <div key={p.id}>
          <p>{p.name}</p>
        </div>
      ))}
    </div>
  );
}
