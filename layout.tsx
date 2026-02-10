
import './globals.css';
import { MeshProvider } from '@meshsdk/react';

export const metadata = {
  title: 'Cardano Savings Vault',
  description: 'Smart savings on Cardano',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-['Inter']">
        <MeshProvider>
          {children}
        </MeshProvider>
      </body>
    </html>
  );
}