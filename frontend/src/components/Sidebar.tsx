import logo from '../assets/logo.png'
import Huisje from '../assets/huisje.svg?react'
import Kalender from '../assets/kalender.svg?react'
import Bliksem from '../assets/bliksem.svg?react'
import Tekstballon from '../assets/tekstballon.svg?react'
import { Link } from '@tanstack/react-router'

export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-[#dce4ee] p-[28px_18px_20px] flex flex-col gap-10">
      <img src={logo} alt="Student Housing BV" className="w-full" />
      <nav>
        <ul className="flex flex-col gap-7">
            <li>
                <Link to="/" className="flex items-center gap-3 text-grijsblauw font-medium text-base hover:text-donkerblauw hover:scale-102 transition data-[status=active]:text-donkerblauw data-[status=active]:scale-102 data-[status=active]:underline data-[status=active]:decoration-oranje data-[status=active]:decoration-1.5 data-[status=active]:underline-offset-8">
                    <Huisje className="w-5 h-5" />
                    Dashboard / Home
                </Link>
            </li>

            <li>
                <Link to="/evenementen" className="flex items-center gap-3 text-grijsblauw font-medium text-base hover:text-donkerblauw hover:scale-102 transition data-[status=active]:text-donkerblauw data-[status=active]:scale-102 data-[status=active]:underline data-[status=active]:decoration-oranje data-[status=active]:decoration-1.5 data-[status=active]:underline-offset-8">
                    <Kalender className="w-5 h-5" />
                    Evenementen
                </Link>
            </li>

            <li>
                <Link to="/energie" className="flex items-center gap-3 text-grijsblauw font-medium text-base hover:text-donkerblauw hover:scale-102 transition data-[status=active]:text-donkerblauw data-[status=active]:scale-102 data-[status=active]:underline data-[status=active]:decoration-oranje data-[status=active]:decoration-1.5 data-[status=active]:underline-offset-8">
                    <Bliksem className="w-5 h-5" />
                    Energie & gas
                </Link>
            </li>

            <li>
                <Link to="/reviews" className="flex items-center gap-3 text-grijsblauw font-medium text-base hover:text-donkerblauw hover:scale-102 transition data-[status=active]:text-donkerblauw data-[status=active]:scale-102 data-[status=active]:underline data-[status=active]:decoration-oranje data-[status=active]:decoration-1.5 data-[status=active]:underline-offset-8">
                    <Tekstballon className="w-5 h-5" />
                    Reviews
                </Link>
            </li>
        </ul>
      </nav>
    </aside>
  )
}