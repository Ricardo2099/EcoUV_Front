// FILE: src/pages/ClassGroupPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Notifications from "../components/Notifications.jsx";

export default function ClassGroupPage() {
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
      `}</style>

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 navbar bg-[#0B1020]/80 backdrop-blur-lg border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/img/logo.png" alt="EcoUV" className="h-12 w-auto rounded-xl" />
            <span className="font-semibold tracking-wide text-lg md:text-xl">EcoUV</span>
          </div>

          <div className="flex items-center gap-3">
            <Notifications />
            <button
              onClick={() => navigate("/perfil")}
              className="bg-emerald-500 text-white px-4 py-2 rounded-xl hover:bg-emerald-600 transition"
            >
              Perfil
            </button>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="mx-auto max-w-7xl px-4 py-8 grid grid-cols-12 gap-6">

        {/* SIDEBAR */}
        <aside className="col-span-3 min-w-[180px] space-y-6 overflow-hidden">

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

          {showGroups && (
            <div className="soft-border bg-[rgba(255,255,255,0.04)] p-4 space-y-2 animate-fadeIn">
              <button 
                onClick={() => navigate("/grupo-facultad")}
                className="w-full text-left px-3 py-2 hover:bg-white/10 rounded-xl"
              >
                🏛️ Grupo de facultad
              </button>

              <button 
                onClick={() => navigate("/grupo-carrera")}
                className="w-full text-left px-3 py-2 hover:bg-white/10 rounded-xl"
              >
                🎓 Grupo de carrera
              </button>

              <button 
                onClick={() => navigate("/grupo-salon")}
                className="w-full text-left px-3 py-2 hover:bg-white/10 rounded-xl"
              >
                🏫 Grupo de salón
              </button>

              <button 
                onClick={() => navigate("/grupo-plan")}
                className="w-full text-left px-3 py-2 hover:bg-white/10 rounded-xl"
              >
                📚 Grupo plan de estudio
              </button>
            </div>
          )}

        </aside>

        {/* CONTENT */}
        <section className="col-span-9 space-y-6">
          <div className="card p-6 text-white border border-white/10">
            <h1 className="text-2xl font-bold mb-2">Grupo de salón</h1>

            <p className="text-gray-300 mb-4">
              Aquí podrás ver todas las publicaciones relacionadas con tu grupo de salón.
            </p>

            {/* Aquí luego listas las publicaciones del grupo */}
            <div className="mt-6 text-gray-400 italic">
              Aquí se mostrarán las publicaciones del grupo de salón...
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
