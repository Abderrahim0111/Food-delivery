import "./globals.css";
import { Providers } from "@/redux/provider";
import Header from "@/components/header";

export const metadata = {
  title: "Tasty rush",
  description:
    "Welcome to our website, where deliciousness meets convenience! Discover a world of culinary delights, order with ease, and enjoy doorstep delivery in no time. Elevate your dining experience today!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
