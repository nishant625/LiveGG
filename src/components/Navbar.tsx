"use client"

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Navbar = () => {
  const router = useRouter()

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const searchTerm = (form.elements.namedItem('search') as HTMLInputElement).value
    router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
  }

  return (
    <nav data-theme='black' className="navbar bg-base-100">
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost text-xl">LiveGG</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link href="/matches">Matches</Link></li>
          <li><Link href="/events">Events</Link></li>
          <li><Link href="/news">News</Link></li>
        </ul>
      </div>
      <div className="navbar-end">
        <form onSubmit={handleSearch} className="form-control">
          <input 
            type="text" 
            name="search"
            placeholder="Search" 
            className="input input-bordered w-24 md:w-auto" 
          />
        </form>
      </div>
    </nav>
  )
}

export default Navbar