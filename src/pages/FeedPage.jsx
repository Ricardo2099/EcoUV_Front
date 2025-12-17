// FILE: src/pages/FeedPage.jsx
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Notifications from "../components/Notifications.jsx"; 

export default function FeedPage() {
  const navigate = useNavigate();
  const [showGroups, setShowGroups] = useState(false);

  // ESTADOS NUEVOS
  const [showPublishOptions, setShowPublishOptions] = useState(false);
  const [selectedTarget, setSelectedTarget] = useState(null);

  // Varias imágenes
  const [previewImages, setPreviewImages] = useState([]);

  const fileInputRef = useRef(null);

  // Abrir selector de archivos
  const handleSelectImage = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  // Manejar varias imágenes
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));

    setPreviewImages((prev) => [...prev, ...newImages]);
  };

  // Eliminar UNA imagen
  const removeImage = (index) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSelectTarget = (target) => {
    setSelectedTarget(target);
    setShowPublishOptions(false);
    alert("Publicar a: " + target);
  };

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

        /* CONTENEDOR DE MINIATURA */
        .thumb-container {
          position: relative;
          display: inline-block;
          margin-right: 10px;
        }

        /* MINIATURA AUMENTADA */
        .thumb-img {
          height: 130px;
          width: 130px;
          object-fit: cover;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.1);
          transition: 0.2s;
        }

        .thumb-container:hover .thumb-img {
          filter: brightness(40%);
        }

        /* BOTÓN DE ELIMINAR IMAGEN */
        .delete-thumb {
          position: absolute;
          top: 0;
          left: 0;
          width: 130px;
          height: 130px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #ddd;
          font-size: 34px;
          opacity: 0;
          transition: 0.2s;
          cursor: pointer;
        }

        .thumb-container:hover .delete-thumb {
          opacity: 1;
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
      <main className="mx-auto max-w-7xl px-4 py-8 grid grid-cols-12 gap-6">
        
        {/* SIDEBAR */}
        <aside className="col-span-3 min-w-[180px] space-y-6 overflow-hidden">

          <nav className="card p-4 space-y-2">
            <button
              className="w-full text-left px-3 py-2 hover:bg-white/10 rounded-xl break-words"
              onClick={() => navigate("/feed")}
            >
              🏠 Feed
            </button>

            <button
              className="w-full text-left px-3 py-2 hover:bg-white/10 rounded-xl break-words"
              onClick={() => navigate("/mis-publicaciones")}
            >
              🖼️ Mis publicaciones
            </button>

            <button
              onClick={() => setShowGroups(!showGroups)}
              className="w-full text-left px-3 py-2 hover:bg-white/10 rounded-xl flex justify-between items-center break-words"
            >
              👥 Grupos
              <span className="text-xs">{showGroups ? "▲" : "▼"}</span>
            </button>
          </nav>

          {showGroups && (
            <div className="soft-border bg-[rgba(255,255,255,0.04)] p-4 space-y-2 animate-fadeIn break-words">

              {/* REDIRECCIONES A TUS PÁGINAS */}
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

        {/* FEED */}
        <section id="viewContainer" className="col-span-9 space-y-6">
          
          <div className="card p-5 text-white bg-[#101830] border border-white/10">

            {/* TÍTULO */}
            <div className="mb-4 border-b border-emerald-400 pb-2">
              <h2 className="text-xl font-semibold text-white">
                Comparte una publicación con tu comunidad
              </h2>
              <p className="text-sm text-gray-300 mt-1">
                Recuerda ser claro y respetuoso. Elige el grupo correcto para que tu mensaje llegue a quien corresponde.
              </p>
            </div>

            {/* TEXTAREA */}
            <textarea
              className="w-full resize-none focus:outline-none focus:ring-2 focus:ring-emerald-400"
              rows="3"
              placeholder="Escribe algo aquí..."
            ></textarea>

            {/* PREVIEW DE IMÁGENES */}
            {previewImages.length > 0 && (
              <div className="mt-4 flex gap-3 flex-wrap">
                {previewImages.map((img, index) => (
                  <div key={index} className="thumb-container">
                    <img src={img} className="thumb-img" />
                    <div className="delete-thumb" onClick={() => removeImage(index)}>✕</div>
                  </div>
                ))}
              </div>
            )}

            <hr className="my-4 border-white/10" />

            {/* BOTONES */}
            <div className="flex flex-row items-center gap-4">

              {/* PUBLICAR */}
              <div className="relative">
                <button
                  onClick={() => setShowPublishOptions(!showPublishOptions)}
                  className="bg-green-500 text-white font-semibold py-2 rounded-xl px-6 hover:bg-blue-500 active:bg-blue-600 transition-all"
                >
                  Publicar
                </button>

                {showPublishOptions && (
                  <div className="absolute mt-2 left-0 w-56 card p-2 animate-fadeIn space-y-1 z-50">
                    <button onClick={() => handleSelectTarget("Carrera")} className="w-full text-left px-3 py-2 hover:bg-white/10 rounded-xl">
                      Carrera
                    </button>
                    <button onClick={() => handleSelectTarget("Facultad")} className="w-full text-left px-3 py-2 hover:bg-white/10 rounded-xl">
                      Facultad
                    </button>
                    <button onClick={() => handleSelectTarget("Plan")} className="w-full text-left px-3 py-2 hover:bg-white/10 rounded-xl">
                      Plan de estudio
                    </button>
                    <button onClick={() => handleSelectTarget("Salón")} className="w-full text-left px-3 py-2 hover:bg-white/10 rounded-xl">
                      Grupo de salón
                    </button>
                  </div>
                )}
              </div>

              {/* SUBIR FOTO */}
              <button
                onClick={handleSelectImage}
                className="bg-green-500 text-white font-semibold py-2 rounded-xl px-6 hover:bg-blue-500 active:bg-blue-600 transition-all"
              >
                Subir foto
              </button>

              {/* INPUT OCULTO */}
              <input
                type="file"
                accept="image/*"
                multiple
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
              />

            </div>

          </div>
        </section>
      </main>
    </>
  );
}
