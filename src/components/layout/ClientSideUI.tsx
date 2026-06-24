'use client';

import dynamic from 'next/dynamic';

const AIConcierge = dynamic(() => import("@/components/layout/AIConcierge"), { ssr: false });
const CommandBar = dynamic(() => import("@/components/layout/CommandBar"), { ssr: false });

export default function ClientSideUI() {
  return (
    <>
      <AIConcierge />
      <CommandBar />
    </>
  );
}
