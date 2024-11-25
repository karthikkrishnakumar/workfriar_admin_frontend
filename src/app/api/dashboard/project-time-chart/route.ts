import { NextResponse } from 'next/server';

export async function GET() {
  const data = [
    { project: 'One view', hours: 10 },
    { project: 'Danti', hours: 8 },
    { project: 'Techfriar', hours: 6 },
    { project: 'Unutilized', hours: 1 },
    { project: 'Soezy', hours: 7 },
    { project: 'Votefriar', hours: 3 },
    { project: 'Court click', hours: 9 },
  ];

  return NextResponse.json(data);
}
