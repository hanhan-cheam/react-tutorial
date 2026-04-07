import { NextResponse } from 'next/server';

const users = [
  { id: 1, name: 'Ali', email: 'ali@email.com' },
  { id: 2, name: 'Sara', email: 'sara@email.com' },
  { id: 3, name: 'John', email: 'john@email.com' },
];

export async function GET() {
  return NextResponse.json(users);
}
