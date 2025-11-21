import React from "react";
import { useNavigate } from "react-router-dom";

export default function MisPublicacionesPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0B1020] text-white p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">🖼️ Mis publicaciones</h1>
        <button
          onClick={() => navigate("/feed")}
          className="bg-emerald-500 px-4 py-2 rounded-xl hover:bg-emerald-600 transition"
        >
          Volver al Feed
        </button>
      </header>

      <div className="bg-[#101830] border border-white/10 rounded-xl p-4">
        <p>Aquí se mostrarán tus publicaciones.</p>
      </div>
    </div>
  );
}
