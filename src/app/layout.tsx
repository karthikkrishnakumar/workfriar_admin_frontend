import type { Metadata } from "next";
import localFont from "next/font/local";
import "../themes/styles/globals.scss";

const geistSans = localFont({
  src: "../themes/fonts/Rubik.ttf",
  variable: "--font-rubik",
  weight: "100 900",
});


export const metadata: Metadata = {
  title: "Workfriar",
  description: "",
  icons: {
    icon: './favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable}`}>
        {children}
      </body>
    </html>
  );
}
