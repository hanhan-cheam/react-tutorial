'use cache';

import { Metadata } from 'next';
import localFont from 'next/font/local';
import React, { ReactNode } from 'react';
import packageJson from '../package.json';

import iconDark from '../public/favicon/pingspace-logo-black.svg';
import iconLignt from '../public/favicon/pingspace-logo-white.svg';
import '../styles/globals.css';
import SidebarLayout from './components/common/SidebarLayout/SidebarLayout';

export const metadata: Metadata = {
  description: `${packageJson.description}`,
  icons: [
    {
      media: '(prefers-color-scheme: light)',
      url: iconLignt.src,
      type: 'image/svg+xml',
    },
    {
      media: '(prefers-color-scheme: dark)',
      url: iconDark.src,
      type: 'image/svg+xml',
    },
  ],
};

const altoneFont = localFont({
  src: [
    {
      path: '../public/fonts/Altone-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Altone-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Altone-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/Altone-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
});

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      <body>
        <SidebarLayout>{children}</SidebarLayout>
      </body>
    </html>
  );
}
