// FILE: src/pages/RegisterPage.jsx
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const $ = (s, r = document) => r.querySelector(s);

    const correo = $("#correo");
    const matricula = $("#matricula");

    const validEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

    $("#registerForm")?.addEventListener("submit", (e) => {
      e.preventDefault();
      let ok = true;

      // Reset errores visibles
      ["#error-correo", "#error-matricula", "#error-general", "#warn-dominio"].forEach(
        (id) => $(id)?.classList.add("hidden")
      );

      if (!validEmail(correo.value)) {
        $("#error-correo").classList.remove("hidden");
        ok = false;
      }
      if (!/^[A-Za-z0-9_.-]+$/.test(matricula.value)) {
        $("#error-matricula").classList.remove("hidden");
        ok = false;
      }

      // Sugerir dominio institucional
      if (ok && !/@uv\.mx$/i.test(correo.value)) {
        $("#warn-dominio").classList.remove("hidden");
      }

      if (!$("#acepto").checked) {
        ok = false;
        $("#error-general").textContent = "Debe aceptar las condiciones de uso.";
        $("#error-general").classList.remove("hidden");
      }

      // Checks select/inputs obligatorios
      ["#carrera", "#plan", "#campus", "#semestre", "#grupo"].forEach((sel) => {
        const el = $(sel);
        if (!el.value) ok = false;
      });

      if (!ok) return;

      // Política: usar matrícula como contraseña inicial
      const payload = {
        nombre: $("#nombre").value.trim(),
        apellidos: $("#apellidos").value.trim(),
        correo: correo.value.trim(),
        matricula: matricula.value.trim(),
        password: matricula.value.trim(), // contraseña inicial = matrícula
        carrera: $("#carrera").value,
        plan: $("#plan").value,
        campus: $("#campus").value,
        semestre: $("#semestre").value,
        grupo: $("#grupo").value.trim(),
        acepta: $("#acepto").checked,
        useMatriculaAsPassword: true,
      };
      console.log("Registro payload:", payload);

      /* Seguridad backend recomendada:
         - Hash (bcrypt/argon2) SIEMPRE.
         - Forzar cambio de contraseña en primer login (recomendado).
         - Rate limiting / bloqueo por intentos fallidos.
      */

      // TODO: POST real al backend
      alert("Registro enviado (simulado). Conectar al backend.");
      e.target.reset();
      // Si quieres, te llevo al login:
      // navigate("/login");
    });
  }, [navigate]);

  return (
    <>
      {/* Estilos globales del HTML original */}
      <style>{`
        :root{
          --eco-blue: #0B1020;      /* fondo principal */
          --eco-blue-2: #0F1730;    /* superficie */
          --eco-blue-3: #121C3A;    /* superficie 2 */
          --eco-line: rgba(255,255,255,0.12);
          --eco-text: #E9EEF7;      /* texto principal */
          --eco-text-2: #AAB4C6;    /* texto secundario */
          --eco-accent: #46C27A;    /* verde EcoUV */
          --eco-accent-2: #20B062;  /* verde hover */
          --eco-error: #FF6B6B;
          --eco-warn: #F1C40F;
        }
        html, body {
          font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif;
        }
        .card{
          background: color-mix(in oklab, var(--eco-blue-2) 92%, transparent);
        }
        .field{}
        .input{
          width:100%; border-radius:0.75rem; padding:0.625rem 0.75rem;
          border:1px solid var(--eco-line); background:var(--eco-blue-3);
          color:var(--eco-text);
        }
        .input::placeholder{ color:var(--eco-text-2); }
        .input:focus{ outline:none; box-shadow:0 0 0 2px var(--eco-accent); }
      `}</style>

      <main className="min-h-screen grid place-items-center p-6 bg-[var(--eco-blue)] text-[var(--eco-text)]">
        <section className="w-full max-w-[720px] rounded-2xl card shadow-2xl ring-1 ring-[var(--eco-line)] backdrop-blur">
          {/* Header brand */}
          <header className="px-6 pt-6 pb-3 text-center">
            <div className="mx-auto mb-3 flex items-center justify-center gap-3">
              <img
                src="/img/logo.png"
                alt="EcoUV"
                className="h-16 w-16 rounded-xl object-contain bg-[var(--eco-blue-3)] p-1 ring-1 ring-[var(--eco-line)]"
              />
              <h1 className="text-2xl font-bold text-[var(--eco-accent)]">EcoUV</h1>
            </div>
            <h2 className="text-xl font-semibold">Crear cuenta</h2>
            <p className="text-sm text-[var(--eco-text-2)]">
              Regístrese con sus datos institucionales para unirse a EcoUV
            </p>
          </header>

          <form id="registerForm" className="px-6 pb-6 space-y-8" noValidate>
            {/* Sección 1: Datos personales */}
            <section aria-labelledby="sec-personales" className="space-y-4">
              <header className="flex items-center gap-2">
                <span className="inline-grid place-items-center h-6 w-6 rounded-full bg-[var(--eco-accent)] text-[var(--eco-blue)] text-xs font-bold">
                  1
                </span>
                <h3 id="sec-personales" className="text-sm font-semibold tracking-wide text-[var(--eco-text-2)]">
                  Datos personales
                </h3>
                <div className="grow border-t border-[var(--eco-line)] ml-2"></div>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="field">
                  <label htmlFor="nombre" className="text-sm">Nombre(s)</label>
                  <input id="nombre" name="nombre" className="input" type="text" autoComplete="given-name" required placeholder="Juan" />
                </div>
                <div className="field">
                  <label htmlFor="apellidos" className="text-sm">Apellidos</label>
                  <input id="apellidos" name="apellidos" className="input" type="text" autoComplete="family-name" required placeholder="Pérez López" />
                </div>
              </div>
            </section>

            {/* Sección 2: Credenciales de acceso */}
            <section aria-labelledby="sec-credenciales" className="space-y-4">
              <header className="flex items-center gap-2">
                <span className="inline-grid place-items-center h-6 w-6 rounded-full bg-[var(--eco-accent)] text-[var(--eco-blue)] text-xs font-bold">
                  2
                </span>
                <h3 id="sec-credenciales" className="text-sm font-semibold tracking-wide text-[var(--eco-text-2)]">
                  Credenciales
                </h3>
                <div className="grow border-t border-[var(--eco-line)] ml-2"></div>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="field">
                  <label htmlFor="correo" className="text-sm">Correo institucional</label>
                  <input id="correo" name="correo" className="input" type="email" inputMode="email" autoComplete="email" required placeholder="usuario@uv.mx" />
                  <p id="error-correo" className="hidden text-xs text-[var(--eco-error)]">Ingrese un correo válido.</p>
                </div>
                <div className="field">
                  <label htmlFor="matricula" className="text-sm">Matrícula</label>
                  <input id="matricula" name="matricula" className="input" type="text" inputMode="text" required pattern="[A-Za-z0-9-_.]+" placeholder="A01234567" />
                  <p id="error-matricula" className="hidden text-xs text-[var(--eco-error)]">Solo letras, números y ._-</p>
                </div>
              </div>
            </section>

            {/* Sección 3: Seguridad (sin contraseña — se usará matrícula) */}
            <section aria-labelledby="sec-seguridad" className="space-y-4">
              <header className="flex items-center gap-2">
                <span className="inline-grid place-items-center h-6 w-6 rounded-full bg-[var(--eco-accent)] text-[var(--eco-blue)] text-xs font-bold">
                  3
                </span>
                <h3 id="sec-seguridad" className="text-sm font-semibold tracking-wide text-[var(--eco-text-2)]">
                  Seguridad
                </h3>
                <div className="grow border-t border-[var(--eco-line)] ml-2"></div>
              </header>

              <div className="rounded-xl border border-[var(--eco-line)] bg-[var(--eco-blue-3)]/40 p-4 text-sm text-[var(--eco-text-2)]">
                En EcoUV <strong>no necesita definir una contraseña</strong> al registrarse. Por política institucional, su <strong>matrícula</strong> será su clave de acceso inicial.
                En el primer inicio de sesión, podrá (o se le podrá solicitar) cambiarla en la sección de seguridad.
              </div>
            </section>

            {/* Sección 4: Datos académicos */}
            <section aria-labelledby="sec-academicos" className="space-y-4">
              <header className="flex items-center gap-2">
                <span className="inline-grid place-items-center h-6 w-6 rounded-full bg-[var(--eco-accent)] text-[var(--eco-blue)] text-xs font-bold">
                  4
                </span>
                <h3 id="sec-academicos" className="text-sm font-semibold tracking-wide text-[var(--eco-text-2)]">
                  Datos académicos
                </h3>
                <div className="grow border-t border-[var(--eco-line)] ml-2"></div>
              </header>

              {/* UNA SOLA LÍNEA EN DESKTOP (5 columnas); 1 columna en móvil */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                <div className="field">
                  <label htmlFor="carrera" className="text-sm">Carrera</label>
                  <select id="carrera" name="carrera" className="input" required>
                    <option value="" defaultValue disabled>Seleccione su carrera</option>
                    <option>Ing. en Sistemas</option>
                    <option>Ing. Industrial</option>
                    <option>Arquitectura</option>
                    <option>Administración</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="plan" className="text-sm">Plan de estudio</label>
                  <select id="plan" name="plan" className="input" required>
                    <option value="" defaultValue disabled>Seleccione su plan</option>
                    <option>2020</option>
                    <option>2022</option>
                    <option>2024</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="campus" className="text-sm">Campus</label>
                  <select id="campus" name="campus" className="input" required>
                    <option value="" defaultValue disabled>Seleccione su campus</option>
                    <option>Xalapa</option>
                    <option>Veracruz</option>
                    <option>Poza Rica</option>
                    <option>Orizaba</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="semestre" className="text-sm">Semestre</label>
                  <select id="semestre" name="semestre" className="input" required>
                    <option value="" defaultValue disabled>Semestre</option>
                    <option>1</option><option>2</option><option>3</option><option>4</option>
                    <option>5</option><option>6</option><option>7</option><option>8</option>
                    <option>9</option><option>10</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="grupo" className="text-sm">Matrícula de grupo</label>
                  <input id="grupo" name="grupo" className="input" type="text" placeholder="Ej. IS-302" required />
                </div>
              </div>
            </section>

            {/* Sección 5: Legal y envío */}
            <section aria-labelledby="sec-legal" className="space-y-3">
              <header className="flex items-center gap-2">
                <span className="inline-grid place-items-center h-6 w-6 rounded-full bg-[var(--eco-accent)] text-[var(--eco-blue)] text-xs font-bold">
                  5
                </span>
                <h3 id="sec-legal" className="text-sm font-semibold tracking-wide text-[var(--eco-text-2)]">
                  Confirmación
                </h3>
                <div className="grow border-t border-[var(--eco-line)] ml-2"></div>
              </header>

              <label className="inline-flex items-start gap-3 text-sm select-none">
                <input
                  id="acepto"
                  name="acepto"
                  type="checkbox"
                  className="mt-0.5 h-4 w-4 rounded border-[var(--eco-line)] bg-[var(--eco-blue-3)]"
                  required
                />
                <span>
                  Acepto las{" "}
                  <a href="#" className="text-[var(--eco-accent)] hover:text-[var(--eco-accent-2)]">
                    condiciones de uso
                  </a>{" "}
                  y el tratamiento de datos conforme a EcoUV.
                </span>
              </label>

              <p className="text-[11px] text-[var(--eco-text-2)]">
                Usaremos estos datos para ubicarlo en sus <strong>4 grupos</strong> (carrera, plan, semestre y grupo). Al publicar, elegirá <em>solo uno</em> de esos filtros.
              </p>

              <div className="flex items-center justify-between pt-2">
                {/* En React, usamos rutas internas */}
                <Link to="/login" className="text-sm text-[var(--eco-accent)] hover:text-[var(--eco-accent-2)]">
                  Ya tengo cuenta
                </Link>

                <button
                  type="submit"
                  className="rounded-xl bg-[var(--eco-accent)] hover:bg-[var(--eco-accent-2)] px-5 py-2.5 font-semibold text-[var(--eco-blue)]"
                >
                  Crear cuenta
                </button>
              </div>

              {/* Mensajes de estado */}
              <p id="error-general" className="hidden text-sm text-[var(--eco-error)]">Revise los campos marcados.</p>
              <p id="warn-dominio" className="hidden text-sm text-[var(--eco-warn)]">Sugerencia: use su correo institucional <code>@uv.mx</code>.</p>
            </section>
          </form>
        </section>
      </main>
    </>
  );
}
