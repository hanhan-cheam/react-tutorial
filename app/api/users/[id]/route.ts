import { NextResponse } from 'next/server';

const users = [
  { id: 1, name: 'Ali', email: 'ali@email.com' },
  { id: 2, name: 'Sara', email: 'sara@email.com' },
  { id: 3, name: 'John', email: 'john@email.com' },
];

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const user = users.find((u) => u.id === Number(params.id));

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json(user);
}
