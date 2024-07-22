import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className="flex justify-center p-6 bg-gray-200">
  <ul className="flex space-x-4">
    <li>
      <Link
        to="/"
        className="text-blue-500 hover:text-blue-700 font-medium transition"
      >
        Home
      </Link>
    </li>
    <li>
      <Link
        to="/dashboard"
        className="text-blue-500 hover:text-blue-700 font-medium transition"
      >
        Dashboard
      </Link>
    </li>
  </ul>
</div>
  )
}
