import { Bell, Upload, LogOut } from 'lucide-react'
import { Link } from 'react-router-dom'
import Notifications from './Notifications.jsx'
import Logo from './logo.jsx'

export default function TopBar(){
  return (
    <header className="sticky top-0 z-40 border-b border-[rgba(255,255,255,0.10)] bg-eco-blue/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link to="/feed" aria-label="Inicio">
          <Logo size={40} />
        </Link>
        <nav className="flex items-center gap-3">
          <Link to="/upload" className="rounded-xl2 border border-[rgba(255,255,255,0.10)] px-3 py-2 hover:bg-eco-blue2 inline-flex items-center gap-2">
            <Upload size={18}/> <span>Subir</span>
          </Link>
          <Notifications />
          <Link to="/login" className="ml-1 rounded-xl2 bg-eco-accent px-3 py-2 font-medium text-black hover:bg-eco-accent-2 inline-flex items-center gap-2">
            <LogOut size={18}/> <span>Salir</span>
          </Link>
        </nav>
      </div>
    </header>
  )
}
