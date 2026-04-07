'use client';

import { useEffect, useState } from 'react';

type TSelectRes = {
  id: number;
  name: string;
};

export default function ProductsPage() {
  const [data, setData] = useState<TSelectRes[]>([]);

  const init = async () => {
    const res = await fetch('http://localhost:3000/api/users');
    const data = await res.json();

    setData(data);
  };

  useEffect(() => {
    init();
  }, []);

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
