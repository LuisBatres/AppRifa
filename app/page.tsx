// app/page.tsx
import LotteryTicketSelector from '@/components/lottery-ticket-selector';
import React from 'react';

export default function Home() {
  return (
    <main className="min-h-screen p-4">
      <LotteryTicketSelector />
    </main>
  );
}
