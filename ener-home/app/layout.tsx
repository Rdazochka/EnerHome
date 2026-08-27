import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EnerHome",
  description: "Енергоефективні рішення для вашого дому",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  );
}
