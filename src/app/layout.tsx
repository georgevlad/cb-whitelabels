import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Cashback Comparison Platform',
  description: 'Find the best deals and save money with our comparison platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://js.financeads.net/iframeResizeMe.min.js.gz" async />
      </head>
      <body>{children}</body>
    </html>
  );
}
