// FILE: src/pages/FeedPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Notifications from "../components/Notifications.jsx"; 

export default function FeedPage() {
  const navigate = useNavigate();
  const [showGroups, setShowGroups] = useState(false);

  return (
    <>
      <style>{`
        :root{
          --eco-blue: #0B1020;
          --eco-blue-2: #101830;
          --eco-blue-3: #151F3C;
          --eco-line: rgba(255,255,255,0.10);
          --eco-text: #E9EEF7;
          --eco-text-2: #AAB4C6;
          --eco-green: #0FD08E;
        }
        html{ font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Arial; }
        body{ background: var(--eco-blue); color: var(--eco-text); }

        .card{
          background: var(--eco-blue-2);
          border: 1px solid var(--eco-line);
          border-radius: 1rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.25);
        }

        .soft-border {
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 1rem;
        }

        textarea{
          background: var(--eco-blue-3);
          border:1px solid var(--eco-line);
          color: var(--eco-text);
          border-radius:.75rem;
          padding:.5rem .75rem;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out;
        }
      `}</style>

      {/* NAVBAR SUPERIOR */}
      <header className="sticky top-0 z-50 navbar bg-[#0B1020]/80 backdrop-blur-lg border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 h-20 flex items-center justify-between">

          {/* LOGO */}
          <div className="flex items-center gap-2">
            <img src="/img/logo.png" alt="EcoUV" className="h-12 w-auto rounded-xl" />
            <span className="font-semibold tracking-wide text-lg md:text-xl">EcoUV</span>
          </div>

          {/* NOTIFICACIONES + PERFIL */}
          <div className="flex items-center gap-3">

            {/* 🔔 Notificaciones en Navbar */}
            <Notifications />

            {/* BOTÓN PERFIL */}
            <button
              id="openProfile"
              onClick={() => navigate("/perfil")}
              className="bg-emerald-500 text-white px-4 py-2 rounded-xl hover:bg-emerald-600 transition"
            >
              Perfil
            </button>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="mx-auto max-w-7xl px-4 py-8 grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* SIDEBAR IZQUIERDA */}
        <aside className="md:col-span-3 space-y-6">

          <nav className="card p-4 space-y-2">
            <button
              className="w-full text-left px-3 py-2 hover:bg-white/10 rounded-xl"
              onClick={() => navigate("/feed")}
            >
              🏠 Feed
            </button>

            <button
              className="w-full text-left px-3 py-2 hover:bg-white/10 rounded-xl"
              onClick={() => navigate("/mis-publicaciones")}
            >
              🖼️ Mis publicaciones
            </button>

            <button
              onClick={() => setShowGroups(!showGroups)}
              className="w-full text-left px-3 py-2 hover:bg-white/10 rounded-xl flex justify-between items-center"
            >
              👥 Grupos
              <span className="text-xs">{showGroups ? "▲" : "▼"}</span>
            </button>
          </nav>

          {/* SUBMENÚ DE GRUPOS */}
          {showGroups && (
            <div className="soft-border bg-[rgba(255,255,255,0.04)] p-4 space-y-2 animate-fadeIn">
<button
  className="w-full text-left px-3 py-2 hover:bg-white/10 rounded-xl"
  onClick={() => navigate("/grupo-facultad")}
>
  🏛️ Grupo de facultad
</button>

<button
  className="w-full text-left px-3 py-2 hover:bg-white/10 rounded-xl"
  onClick={() => navigate("/grupo-carrera")}
>
  🎓 Grupo de carrera
</button>

<button
  className="w-full text-left px-3 py-2 hover:bg-white/10 rounded-xl"
  onClick={() => navigate("/grupo-salon")}
>
  🏫 Grupo de salón
</button>

<button
  className="w-full text-left px-3 py-2 hover:bg-white/10 rounded-xl"
  onClick={() => navigate("/grupo-plan")}
>
  📚 Grupo plan de estudio
</button>

            </div>
          )}
        </aside>

        {/* FEED PRINCIPAL */}
        <section id="viewContainer" className="md:col-span-9 space-y-6">
          <div className="card p-5 text-white bg-[#101830] border border-white/10">
            <textarea
              className="w-full resize-none focus:outline-none focus:ring-2 focus:ring-emerald-400"
              rows="3"
              placeholder="Escribe algo aquí..."
            ></textarea>

            <hr className="my-4 border-white/10" />

            <div className="flex justify-between items-center">
              <button className="flex-1 bg-blue-500 text-white font-semibold py-2 rounded-xl mx-1 hover:bg-blue-600 transition-all">
                Publicar
              </button>
              <button className="flex-1 bg-green-500 text-white font-semibold py-2 rounded-xl mx-1 hover:bg-green-600 transition-all">
                Subir foto
              </button>
              <button className="flex-1 bg-purple-500 text-white font-semibold py-2 rounded-xl mx-1 hover:bg-purple-600 transition-all">
                Subir archivo
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
