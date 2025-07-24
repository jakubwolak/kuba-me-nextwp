"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

interface MenuItem {
  id: number
  title: { rendered: string }
  slug: string
}

export default function Header() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])

  useEffect(() => {
    async function fetchMenu() {
      try {
        const res = await fetch("https://cms.kuba.me/wp-json/wp/v2/menu")
        const data = await res.json()
        setMenuItems(data)
      } catch (error) {
        console.error("Błąd podczas ładowania menu:", error)
      }
    }

    fetchMenu()
  }, [])

  return (
    <header className="bg-white dark:bg-zinc-900 shadow-md sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-700 dark:text-white">
          Kuba.me
        </Link>
        <ul className="flex gap-6 text-sm font-medium text-zinc-700 dark:text-zinc-100">
          {menuItems.map((item) => (
            <li key={item.id}>
              <Link href={`/${item.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                {item.title.rendered}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
