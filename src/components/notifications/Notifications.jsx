import { useEffect, useRef, useState } from 'react'
import { Bell } from 'lucide-react'

export default function Notifications(){
  const [open, setOpen] = useState(false)
  const panelRef = useRef(null)

  useEffect(() => {
    function onDocClick(e){
      if(panelRef.current && !panelRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [])

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="rounded-xl2 border border-[rgba(255,255,255,0.10)] p-2 hover:bg-eco-blue2" aria-haspopup="true" aria-expanded={open}>
        <Bell size={18}/>
      </button>

      {open && (
        <div ref={panelRef} className="fixed left-4 top-16 z-50 w-80 rounded-2xl border border-[rgba(255,255,255,0.10)] bg-eco-blue2 shadow-soft">
          <div className="border-b border-[rgba(255,255,255,0.10)] px-4 py-3 font-semibold">Notificaciones</div>
          <ul className="max-h-[70vh] overflow-auto p-2">
            {[
              {id:1, text:"Eudy publicó en Grupo 502: no habrá clases"},
              {id:2, text:"Evento: Feria de Proyectos UV — hoy 17:00"},
              {id:3, text:"Nuevo recurso en ‘Contabilidad I’ (PDF)"}
            ].map(n => (
              <li key={n.id} className="rounded-xl2 p-3 hover:bg-eco-blue3/60">{n.text}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
