// FILE: src/pages/ProfilePage.jsx
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function ProfilePage() {
  useEffect(() => {
    // JS original: cambiar avatar (preview local) + "guardar" demo
    const editBtn = document.getElementById("editAvatarBtn");
    const input = document.getElementById("avatarInput");
    const img = document.getElementById("avatarImg");
    const saveBtn = document.getElementById("btnGuardarPerfil");
    const saveHint = document.getElementById("saveHint");

    const onEditClick = () => input?.click();
    const onInputChange = () => {
      const file = input?.files?.[0];
      if (!file) return;
      const url = URL.createObjectURL(file);
      if (img) img.src = url;
      if (saveHint)
        saveHint.textContent =
          "Vista previa aplicada. En producción, aquí subirías a S3/Cloudinary y guardarías la URL.";
    };
    const onSave = (e) => {
      e.preventDefault();
      if (saveHint) {
        saveHint.textContent =
          "Guardado (demo). Implementar POST /api/profile con avatar_url y campos editables.";
        saveHint.style.color = "var(--eco-green)";
      }
    };

    editBtn?.addEventListener("click", onEditClick);
    input?.addEventListener("change", onInputChange);
    saveBtn?.addEventListener("click", onSave);

    return () => {
      editBtn?.removeEventListener("click", onEditClick);
      input?.removeEventListener("change", onInputChange);
      saveBtn?.removeEventListener("click", onSave);
    };
  }, []);

  return (
    <>
      {/* === Estilos originales === */}
      <style>{`
        :root{
          --eco-blue:#0B1020; --eco-blue-2:#0F1730; --eco-blue-3:#121C3A;
          --eco-line:rgba(255,255,255,.10); --eco-text:#E9EEF7; --eco-text-2:#AAB4C6;
          --eco-green:#0FD08E; --eco-green-600:#11e29b;
        }
        html{font-family:Inter,system-ui,-apple-system, Segoe UI, Roboto, Ubuntu, Cantarell,"Helvetica Neue",Arial}
        body{background:var(--eco-blue);color:var(--eco-text)}
        .card{background:linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.03));border:1px solid var(--eco-line);border-radius:1rem}
        .navbar{background:rgba(11,16,32,.75);backdrop-filter:blur(8px);border-bottom:1px solid var(--eco-line)}
        .input, textarea, select{background:var(--eco-blue-2);border:1px solid var(--eco-line);color:var(--eco-text);border-radius:.75rem;padding:.5rem .75rem;font-size:.95rem;outline:none}
        .input:focus{border-color:var(--eco-green);box-shadow:0 0 0 3px rgba(15,208,142,.2)}
        .btn{border-radius:.75rem;padding:.6rem .9rem;font-weight:700}
        .btn-primary{background:var(--eco-green);color:#05111c}
        .btn-primary:hover{background:var(--eco-green-600);filter:brightness(1.03)}
        .btn-ghost{color:var(--eco-text);padding:.5rem .75rem;border-radius:.75rem}
        .btn-ghost:hover{background:rgba(255,255,255,.06)}
        .soft-border{border-color:var(--eco-line)!important}
        .chip{color:var(--eco-text-2)}
      `}</style>

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 navbar">
        <div className="mx-auto max-w-6xl h-16 px-4 sm:px-6 lg:px-8 flex items-center gap-3">
          {/* En React, usamos Link en vez de <a href="index.html"> */}
          <Link to="/feed" className="btn-ghost">
            ← Inicio
          </Link>
          <div className="flex items-center gap-2">
            <img
              src="/img/logo.png"
              alt="EcoUV"
              className="h-10 w-auto rounded-xl object-contain"
            />
            <span className="font-semibold tracking-wide">EcoUV</span>
          </div>
          <span className="ml-auto chip text-sm">Perfil del alumno</span>
        </div>
      </header>

      {/* CONTENIDO */}
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Columna izquierda: Avatar y acciones */}
        <aside className="lg:col-span-4">
          <section className="card p-5">
            <div className="relative w-40 h-40 mx-auto">
              <img
                id="avatarImg"
                src="/img/icono-imagen-perfil-avatar-fondo-azul-estilo-diseno-plano-recursos-diseno-elementos-graficos_991720-653.jpg"
                alt="Foto de perfil"
                className="w-40 h-40 rounded-2xl object-cover border soft-border"
              />
              {/* Botón lápiz */}
              <button
                id="editAvatarBtn"
                title="Cambiar foto"
                className="absolute right-2 bottom-2 rounded-xl px-3 py-2 text-sm font-semibold"
                style={{ background: "var(--eco-green)", color: "#05111c" }}
              >
                ✏️
              </button>
              <input id="avatarInput" type="file" accept="image/*" className="hidden" />
            </div>

            <div className="mt-4 text-center">
              <h1 id="alumnoNombre" className="text-xl font-semibold leading-tight">
                JONATHAN DANIEL PAZ SÁNCHEZ
              </h1>
              <p className="chip text-sm mt-1">ID de usuario: demo-123</p>
            </div>

            <div className="mt-5 space-y-2">
              <button id="btnGuardarPerfil" className="btn btn-primary w-full">
                Guardar cambios
              </button>
              <button className="btn-ghost w-full">Cerrar sesión</button>
            </div>
            <p id="saveHint" className="mt-2 text-xs chip text-center">
              Los cambios de foto se guardarán al subirla (demo local).
            </p>
          </section>
        </aside>

        {/* Columna derecha: Datos */}
        <section className="lg:col-span-8 space-y-6">
          {/* Datos del alumno */}
          <section className="card p-5">
            <h2 className="text-lg font-semibold">Datos académicos</h2>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm chip">Facultad</label>
                <input
                  className="input w-full"
                  defaultValue="FACULTAD DE NEGOCIOS Y TECNOLOGÍAS"
                  disabled
                />
              </div>
              <div>
                <label className="text-sm chip">Carrera</label>
                <input className="input w-full" defaultValue="INGENIERÍA EN SOFTWARE" disabled />
              </div>
              <div>
                <label className="text-sm chip">Matrícula</label>
                <input className="input w-full" defaultValue="zS23030897" disabled />
              </div>
              <div>
                <label className="text-sm chip">Matrícula de grupo</label>
                <input className="input w-full" defaultValue="502" disabled />
              </div>
              <div>
                <label className="text-sm chip">Plan de estudio</label>
                <input className="input w-full" defaultValue="2023" disabled />
              </div>
              <div>
                <label className="text-sm chip">Correo institucional</label>
                <input className="input w-full" defaultValue="zs23030897@uv.mx" disabled />
              </div>
            </div>
          </section>
        </section>
      </main>

      {/* FOOTER */}
      <footer
        className="border-t py-8 text-center text-sm"
        style={{ borderColor: "var(--eco-line)", color: "var(--eco-text-2)" }}
      >
        EcoUV • Perfil del alumno
      </footer>
    </>
  );
}
