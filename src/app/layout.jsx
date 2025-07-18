import "./globals.css";
import AuthProvider from "./context/AuthProvider";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Student Fee Management",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={`font-sans antialiased`}>
          <Navbar />
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
