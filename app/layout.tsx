import "./globals.css"
import Header from "./components/Header"
import Footer from "./components/Footer"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
