import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Obstacle Timer",
  description: "Track participants in your obstacle course",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
