import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Christian Hope Church | North Port, Florida',
  description: 'A multilingual church family in North Port, Florida—encounter God, find community, and carry hope from North Port to the nations.',
  openGraph: {
    title: 'Christian Hope Church | Hope is alive and moving outward.',
    description: 'A multilingual church family following Jesus and carrying living hope from North Port to the nations.',
    type: 'website',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
