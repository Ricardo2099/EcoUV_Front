import { useEffect } from "react";

export default function LoginPage() {
  useEffect(() => {
    const $ = (s, r = document) => r.querySelector(s);

    const correo = $("#correo");
    const pass = $("#password");
    const form = $("#loginForm");

    // Mostrar / ocultar contraseña
    $("#togglePass")?.addEventListener("click", () => {
      const isPwd = pass.type === "password";
      pass.type = isPwd ? "text" : "password";
      $("#togglePass").textContent = isPwd ? "Ocultar" : "Ver";
      pass.focus();
    });

    // Valida que el correo empiece con zS y termine en @uv.mx
    const validUvEmail = (v) => /^zS[^@\s]*@uv\.mx$/i.test(v);

    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      let ok = true;
      ["#error-correo", "#error-password", "#error-general"].forEach((id) =>
        $(id)?.classList.add("hidden")
      );

      if (!validUvEmail(correo.value.trim())) {
        $("#error-correo").classList.remove("hidden");
        ok = false;
      }
      if (!pass.value.trim()) {
        $("#error-password").classList.remove("hidden");
        ok = false;
      }

      if (!ok) return;

      const payload = {
        correo: correo.value.trim(),
        password: pass.value,
        remember: $("#remember").checked,
      };
      console.log("Login payload:", payload);
      alert("Inicio de sesión enviado (simulado). Conectar a backend.");
    });
  }, []);

  return (
    <>
      <style>{`
        :root{
          --eco-blue:#0B1020; --eco-blue-2:#0F1730; --eco-blue-3:#121C3A;
          --eco-line:rgba(255,255,255,0.12); --eco-text:#E9EEF7; --eco-text-2:#AAB4C6;
          --eco-accent:#46C27A; --eco-accent-2:#20B062; --eco-error:#FF6B6B;
        }
        html,body{font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif}
      `}</style>

      <main className="min-h-screen grid place-items-center p-6 bg-[var(--eco-blue)] text-[var(--eco-text)]">
        <section className="w-full max-w-[420px] rounded-2xl bg-[var(--eco-blue-2)]/90 shadow-2xl ring-1 ring-[var(--eco-line)] backdrop-blur">
          <header className="px-6 pt-6 pb-4 text-center">
            <div className="mx-auto mb-3 flex items-center justify-center gap-3">
              <img
                src="/img/logo.png"
                alt="EcoUV"
                className="h-16 w-16 rounded-2xl object-contain bg-[var(--eco-blue-3)] p-1.5 ring-1 ring-[var(--eco-line)]"
              />
              <h1 className="text-2xl font-bold text-[var(--eco-accent)]">
                EcoUV
              </h1>
            </div>
            <h2 className="text-xl font-semibold">Iniciar sesión</h2>
            <p className="text-sm text-[var(--eco-text-2)]">
              Acceda con su <strong>correo institucional</strong>
            </p>
          </header>

          <form id="loginForm" className="px-6 pb-6 space-y-5" noValidate>
            <div className="space-y-1">
              <label htmlFor="correo" className="text-sm">
                Correo institucional
              </label>
              <input
                id="correo"
                name="correo"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                placeholder="zSxxxxx@uv.mx"
                className="w-full rounded-xl bg-[var(--eco-blue-3)] border border-[var(--eco-line)] px-3 py-2.5 text-[var(--eco-text)] placeholder:text-[var(--eco-text-2)] focus:outline-none focus:ring-2 focus:ring-[var(--eco-accent)]"
              />
              <p
                id="error-correo"
                className="hidden text-xs text-[var(--eco-error)]"
              >
                Use su correo institucional que inicia con <strong>zS</strong> y
                termina en <code>@uv.mx</code>.
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm">
                  Contraseña
                </label>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  minLength={6}
                  placeholder="Matrícula"
                  className="w-full rounded-xl bg-[var(--eco-blue-3)] border border-[var(--eco-line)] px-3 py-2.5 pr-12 text-[var(--eco-text)] placeholder:text-[var(--eco-text-2)] focus:outline-none focus:ring-2 focus:ring-[var(--eco-accent)]"
                />
                <button
                  type="button"
                  id="togglePass"
                  aria-label="Mostrar u ocultar contraseña"
                  className="absolute inset-y-0 right-1 my-1 rounded-lg px-3 text-sm border border-[var(--eco-line)] hover:bg-white/5"
                >
                  Ver
                </button>
              </div>
              <p
                id="error-password"
                className="hidden text-xs text-[var(--eco-error)]"
              >
                Ingrese su matrícula.
              </p>
            </div>

            <div className="flex items-center justify-between">
              <label className="inline-flex items-center gap-2 text-sm select-none">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  className="h-4 w-4 rounded border-[var(--eco-line)] bg-[var(--eco-blue-3)]"
                />
                Mantener sesión iniciada
              </label>
              <div className="text-sm">
                <a
                  href="/crear-cuenta"
                  className="text-[var(--eco-accent)] hover:text-[var(--eco-accent-2)]"
                >
                  Crear cuenta
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-[var(--eco-accent)] hover:bg-[var(--eco-accent-2)] px-4 py-2.5 font-semibold text-[var(--eco-blue)] transition"
            >
              Acceder
            </button>

            <p
              id="error-general"
              className="hidden text-sm text-[var(--eco-error)]"
            >
              Credenciales inválidas. Verifique sus datos.
            </p>

            <p className="text-[11px] leading-5 text-[var(--eco-text-2)]">
              Al continuar, acepta las normas de uso de EcoUV. Este sitio puede
              usar cookies esenciales para mantener su sesión.
            </p>
          </form>
        </section>
      </main>
    </>
  );
}
