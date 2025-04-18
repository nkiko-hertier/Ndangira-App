import type React from "react"
import Link from "next/link"
import { BiBugAlt } from "react-icons/bi"

const Header: React.FC = () => {
  return (
    <header className="bg-black shadow">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <BiBugAlt />
          <span className="font-extralight text-lg">Ndangira</span>
        </h1>
        <nav>
          <Link href="/" className="mx-2">
            Home
          </Link>
          <Link href="/about" className="mx-2">
            About
          </Link>
          <Link href="/search" className="mx-2">
            Search
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
