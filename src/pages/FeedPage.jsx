// FILE: src/pages/FeedPage.jsx
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function FeedPage(){
  const navigate = useNavigate();

  useEffect(() => {
    // ====== Botones de navegación (equivalente a tus scripts) ======
    const btnLogin = document.getElementById("openLogin");
    const btnRegister = document.getElementById("openRegister");
    const btnProfile = document.getElementById("openProfile");
    if (btnLogin) btnLogin.onclick = (e) => { e.preventDefault(); navigate("/login"); };
    if (btnRegister) btnRegister.onclick = (e) => { e.preventDefault(); navigate("/crear-cuenta"); };

    // ====== Dropdown "Grupos" (UI puro) ======
    const groupsBtn = document.querySelector('button[data-view="groups"]');
    let dropdown = null;
    const makeDropdown = () => {
      const wrap = document.createElement("div");
      wrap.id = "groupsDropdown";
      wrap.className = "mt-1 ml-2 mr-2 rounded-xl overflow-hidden border soft-border hidden";
      wrap.style.background = "rgba(255,255,255,0.04)";
      wrap.innerHTML = `
        <button class="w-full text-left px-3 py-2 hover:bg-white/10">🏛️ Grupo de facultad</button>
        <button class="w-full text-left px-3 py-2 hover:bg-white/10">🎓 Grupo de carrera</button>
        <button class="w-full text-left px-3 py-2 hover:bg-white/10">🏫 Grupo de salón</button>
        <button class="w-full text-left px-3 py-2 hover:bg-white/10">📚 Grupo plan de estudio</button>
      `;
      groupsBtn?.insertAdjacentElement("afterend", wrap);
      return wrap;
    };
    const toggleGroups = () => {
      if (!dropdown) dropdown = makeDropdown();
      dropdown.classList.toggle("hidden");
    };
    if (groupsBtn) {
      groupsBtn.addEventListener("click", (e) => { e.preventDefault(); toggleGroups(); });
      document.addEventListener("click", (e) => {
        if (!dropdown || dropdown.classList.contains("hidden")) return;
        const inside = e.target === groupsBtn || groupsBtn.contains(e.target) || dropdown.contains(e.target);
        if (!inside) dropdown.classList.add("hidden");
      });
    }

    // ====== Popover Notificaciones (fijo a la izquierda del botón) ======
    const notifBtn = document.getElementById("openNotifications");
    let pop = null; let isOpen = false;
    const POPOVER_WIDTH = 320, PAD = 8;
    const buildPopover = () => {
      const d = document.createElement("div");
      d.id = "notifPopover";
      d.className = "card p-3 text-sm shadow-xl fixed z-50 w-80";
      d.style.background = "rgba(18,28,58,0.98)";
      d.style.borderColor = "var(--eco-line)";
      d.style.display = "none";
      d.innerHTML = `
        <div class="font-semibold mb-2">Notificaciones</div>
        <ul class="space-y-2">
          <li class="rounded-xl p-3" style="background: rgba(255,255,255,0.06);">
            <div class="flex items-start gap-3">
              <div class="text-xl">📢</div>
              <div>
                <div><strong>Eudy</strong> publicó en <em>Grupo de salón (502)</em>:
                  <span class="chip">"No habrá clases con el maestro de POO".</span>
                </div>
                <div class="text-xs chip mt-1">hace 2 h</div>
              </div>
            </div>
          </li>
          <li class="rounded-xl p-3" style="background: rgba(255,255,255,0.06);">
            <div class="flex items-start gap-3">
              <div class="text-xl">📢</div>
              <div>
                <div><strong>Ricardo</strong> publicó en <em>Grupo de carrera — Ing. en Software</em>:
                  <span class="chip">"No habrá clase el viernes 17 de octubre".</span>
                </div>
                <div class="text-xs chip mt-1">hace 30 min</div>
              </div>
            </div>
          </li>
        </ul>
      `;
      document.body.appendChild(d);
      return d;
    };
    const openPopover = () => {
      if (!pop) pop = buildPopover();
      const r = notifBtn.getBoundingClientRect();
      let left = r.left - POPOVER_WIDTH - PAD;
      left = Math.max(PAD, Math.min(left, window.innerWidth - POPOVER_WIDTH - PAD));
      pop.style.left = `${left}px`;
      pop.style.top  = `${Math.max(PAD, Math.min(r.top, window.innerHeight - 100))}px`;
      pop.style.display = "block";
      pop.style.visibility = "hidden";
      requestAnimationFrame(() => {
        const finalTop = Math.max(PAD, Math.min(r.top, window.innerHeight - pop.offsetHeight - PAD));
        pop.style.top = `${finalTop}px`;
        pop.style.visibility = "visible";
      });
      isOpen = true;
    };
    const closePopover = () => { if (pop) { pop.style.display = "none"; isOpen = false; } };
    if (notifBtn) notifBtn.addEventListener("click", (e) => { e.preventDefault(); isOpen ? closePopover() : openPopover(); });

    // ====== Menú Perfil (tipo Facebook) ======
    // Reemplaza la navegación directa: ahora abre un menú contextual
    let profileMenu = null;
    let profileOpen = false;
    const MENU_W = 240;
    const GAP = 8;

    const isLogged = !!localStorage.getItem("access_token"); // cambie esto según su auth real

    const buildProfileMenu = () => {
      const m = document.createElement("div");
      m.id = "profileMenu";
      m.className = "card text-sm fixed z-50 overflow-hidden";
      m.style.width = `${MENU_W}px`;
      m.style.display = "none";
      m.style.background = "rgba(18,28,58,0.98)";
      m.style.borderColor = "var(--eco-line)";
      m.innerHTML = `
        <div class="px-3 py-2 border-b soft-border">
          <div class="flex items-center gap-2">
            <div class="h-12 w-12 rounded-xl overflow-hidden">
              <img alt="avatar" class="h-full w-full object-cover" src="/img/icono-imagen-perfil-avatar-fondo-azul-estilo-diseno-plano-recursos-diseno-elementos-graficos_991720-653.jpg" />
            </div>
            <div>
              <div class="font-semibold">Mi perfil</div>
              <div class="chip">EcoUV</div>
            </div>
          </div>
        </div>
        <div class="py-1">
          ${isLogged ? `
            <button id="pm_settings" class="w-full text-left px-3 py-2 hover:bg-white/10">⚙️ Ajustes de perfil</button>
            <button id="pm_logout"  class="w-full text-left px-3 py-2 hover:bg-white/10">🚪 Cerrar sesión</button>
          ` : `
            <button id="pm_login"   class="w-full text-left px-3 py-2 hover:bg-white/10">🔐 cerrar sesión</button>
            <button id="pm_settings" class="w-full text-left px-3 py-2 hover:bg-white/10">⚙️ Ajustes de perfil</button>
          `}
        </div>
      `;
      document.body.appendChild(m);

      // acciones
      const goSettings = () => { navigate("/perfil"); hideProfileMenu(); };
      const doLogout   = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        hideProfileMenu();
        navigate("/login");
      };
      const goLogin    = () => { hideProfileMenu(); navigate("/login"); };

      m.querySelector("#pm_settings")?.addEventListener("click", goSettings);
      m.querySelector("#pm_logout")?.addEventListener("click", doLogout);
      m.querySelector("#pm_login")?.addEventListener("click", goLogin);

      return m;
    };

    const showProfileMenu = () => {
      if (!btnProfile) return;
      if (!profileMenu) profileMenu = buildProfileMenu();

      const r = btnProfile.getBoundingClientRect();
      const left = Math.min(
        window.innerWidth - MENU_W - GAP,
        Math.max(GAP, r.right - MENU_W)
      );
      const top = Math.min(window.innerHeight - 20, r.bottom + GAP);

      profileMenu.style.left = `${left}px`;
      profileMenu.style.top  = `${top}px`;
      profileMenu.style.display = "block";
      profileOpen = true;
    };

    const hideProfileMenu = () => {
      if (profileMenu) profileMenu.style.display = "none";
      profileOpen = false;
    };

    if (btnProfile) {
      btnProfile.onclick = (e) => {
        e.preventDefault();
        profileOpen ? hideProfileMenu() : showProfileMenu();
      };
      document.addEventListener("click", (e) => {
        if (!profileOpen) return;
        const inside = e.target === btnProfile || btnProfile.contains(e.target) || (profileMenu && profileMenu.contains(e.target));
        if (!inside) hideProfileMenu();
      });
      window.addEventListener("scroll", () => profileOpen && hideProfileMenu(), { passive: true });
      window.addEventListener("resize", () => profileOpen && hideProfileMenu());
    }

    // ====== FAB (+) y Sheet de nueva publicación (UI puro) ======
    const composer = document.getElementById("postComposer");
    if (composer) composer.classList.add("hidden");

    const fab = document.createElement("button");
    fab.id = "fabCreate";
    fab.setAttribute("aria-label", "Crear publicación");
    fab.className = "fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold";
    fab.style.background = "var(--eco-green)";
    fab.style.color = "#05111c";
    fab.style.boxShadow = "0 10px 30px rgba(0,0,0,.35)";
    fab.textContent = "+";
    document.body.appendChild(fab);

    const sheet = document.createElement("dialog");
    sheet.id = "sheetCreate";
    sheet.className = "glass rounded-t-2xl p-0 w-full max-w-2xl md:rounded-2xl";
    sheet.innerHTML = `
      <form method="dialog" class="card p-5">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold">Nueva publicación</h3>
          <button value="cancel" class="btn-ghost px-2 py-1">✕</button>
        </div>
        <div class="mt-3 grid grid-cols-2 gap-2">
          <button type="button" id="btnTipoTexto" class="btn-primary w-full">Texto</button>
          <button type="button" id="btnTipoFoto"  class="btn-ghost w-full" style="background: rgba(255,255,255,0.06);">Foto</button>
        </div>
        <div id="panelTexto" class="mt-3">
          <label for="newPostText" class="text-sm">Mensaje</label>
          <textarea id="newPostText" rows="4" maxlength="2000" placeholder="Escribe algo…" class="mt-1 w-full input"></textarea>
        </div>
        <div id="panelFoto" class="mt-3 hidden">
          <div class="flex items-center gap-3">
            <input id="newPostImage" type="file" accept="image/*" class="block w-full text-sm file:mr-4 file:rounded-xl file:border-0 file:px-4 file:py-2 file:text-[#05111c]" style="--tw-file-bg: var(--eco-green); background: transparent;" />
            <button type="button" id="clearNewImage" class="btn-ghost">Limpiar</button>
          </div>
          <div id="previewNewImage" class="mt-3 hidden">
            <img alt="preview" class="max-h-64 rounded-xl border soft-border" />
          </div>
        </div>
        <fieldset class="mt-4">
          <legend class="text-sm mb-2">Enviar a (elija solo uno)</legend>
          <div class="grid sm:grid-cols-2 gap-2">
            <label class="flex items-center gap-2 rounded-xl px-3 py-2" style="background: rgba(255,255,255,0.06);">
              <input type="radio" name="destino" value="carrera" style="accent-color: var(--eco-green);" />
              <span>Carrera del alumno</span>
            </label>
            <label class="flex items-center gap-2 rounded-xl px-3 py-2" style="background: rgba(255,255,255,0.06);">
              <input type="radio" name="destino" value="facultad" style="accent-color: var(--eco-green);" />
              <span>Facultad del alumno</span>
            </label>
            <label class="flex items-center gap-2 rounded-xl px-3 py-2" style="background: rgba(255,255,255,0.06);">
              <input type="radio" name="destino" value="grupo" style="accent-color: var(--eco-green);" />
              <span>Grupo del alumno</span>
            </label>
            <label class="flex items-center gap-2 rounded-xl px-3 py-2" style="background: rgba(255,255,255,0.06);">
              <input type="radio" name="destino" value="plan" style="accent-color: var(--eco-green);" />
              <span>Plan de estudio del alumno</span>
            </label>
          </div>
        </fieldset>
        <div class="mt-4 flex items-center gap-2">
          <button id="btnPublicar" class="btn-primary">Publicar</button>
          <span id="createHint" class="text-xs chip">Debe escribir texto o elegir una foto, y seleccionar un destino.</span>
        </div>
      </form>
    `;
    document.body.appendChild(sheet);

    const openSheet = () => sheet.showModal();
    const closeSheet = () => sheet.close();
    fab.addEventListener("click", openSheet);

    // Toggle tipo de publicación
    const btnTexto = sheet.querySelector("#btnTipoTexto");
    const btnFoto  = sheet.querySelector("#btnTipoFoto");
    const panelTexto = sheet.querySelector("#panelTexto");
    const panelFoto  = sheet.querySelector("#panelFoto");
    const activateTexto = () => {
      panelTexto.classList.remove("hidden");
      panelFoto.classList.add("hidden");
      btnTexto.className = "btn-primary w-full";
      btnFoto.className  = "btn-ghost w-full";
      btnFoto.style.background = "rgba(255,255,255,0.06)";
    };
    const activateFoto = () => {
      panelTexto.classList.add("hidden");
      panelFoto.classList.remove("hidden");
      btnTexto.className = "btn-ghost w-full";
      btnTexto.style.background = "rgba(255,255,255,0.06)";
      btnFoto.className  = "btn-primary w-full";
    };
    btnTexto?.addEventListener("click", activateTexto);
    btnFoto?.addEventListener("click", activateFoto);

    // Preview imagen
    const fileInput = sheet.querySelector("#newPostImage");
    const clearBtn  = sheet.querySelector("#clearNewImage");
    const prevWrap  = sheet.querySelector("#previewNewImage");
    const prevImg   = prevWrap?.querySelector("img");
    fileInput?.addEventListener("change", () => {
      const f = fileInput.files?.[0];
      if (f) {
        const url = URL.createObjectURL(f);
        if (prevImg) prevImg.src = url;
        prevWrap?.classList.remove("hidden");
      } else {
        prevWrap?.classList.add("hidden");
        if (prevImg) prevImg.removeAttribute("src");
      }
    });
    clearBtn?.addEventListener("click", () => {
      if (fileInput) fileInput.value = "";
      prevWrap?.classList.add("hidden");
      if (prevImg) prevImg.removeAttribute("src");
    });

    // Validación de publicar (mock)
    const btnPublicar = sheet.querySelector("#btnPublicar");
    btnPublicar?.addEventListener("click", (e) => {
      e.preventDefault();
      const text = (sheet.querySelector("#newPostText")?.value || "").trim();
      const hasImage = !!fileInput?.files?.length;
      const destino = sheet.querySelector('input[name="destino"]:checked')?.value;
      if ((!text && !hasImage) || !destino) {
        const hint = sheet.querySelector("#createHint");
        if (hint){ hint.textContent = "Falta contenido (texto o foto) y/o seleccionar un destino."; hint.style.color = "var(--eco-green)"; }
        return;
      }
      console.log("Crear post →", { tipo: hasImage ? "foto" : "texto", text, hasImage, destino });
      closeSheet();
      const t = sheet.querySelector("#newPostText");
      if (t) t.value = "";
      clearBtn?.click();
      const checked = sheet.querySelector('input[name="destino"]:checked');
      if (checked) checked.checked = false;
    });

    // Limpieza al desmontar
    return () => {
      btnLogin && (btnLogin.onclick = null);
      btnRegister && (btnRegister.onclick = null);
      if (btnProfile) btnProfile.onclick = null;
      groupsBtn && groupsBtn.replaceWith(groupsBtn.cloneNode(true));
      if (dropdown) dropdown.remove();
      if (pop) pop.remove();
      if (profileMenu) profileMenu.remove();
      document.getElementById("fabCreate")?.remove();
      sheet.remove();
    };
  }, [navigate]);

  return (
    <>
      {/* ====== Estilos base (copiados de tu HTML) ====== */}
      <style>{`
        :root{
          --eco-blue: #0B1020;
          --eco-blue-2: #0F1730;
          --eco-blue-3: #121C3A;
          --eco-line: rgba(255,255,255,0.10);
          --eco-text: #E9EEF7;
          --eco-text-2: #AAB4C6;
          --eco-green: #0FD08E;
          --eco-green-600: #11e29b;
        }
        html{ font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, "Helvetica Neue", Arial; }
        body{ background: var(--eco-blue); color: var(--eco-text); }
        .card{
          background: linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.03));
          border: 1px solid var(--eco-line);
          border-radius: 1rem;
        }
        .glass{ background: rgba(18,28,58,0.86); backdrop-filter: blur(10px); color: var(--eco-text); }
        .soft-border{ border-color: var(--eco-line) !important; }
        .chip{ color: var(--eco-text-2); }
        .brand-badge{
          width: 2rem; height: 2rem; border-radius: .75rem;
          background: radial-gradient(100% 100% at 30% 30%, #1A7EE0 0%, #0FD08E 100%);
          box-shadow: 0 0 0 2px rgba(255,255,255,0.06) inset;
        }
        .btn-primary, .btn-secondary{
          background: var(--eco-green); color:#05111c;
          border-radius:.75rem; padding:.5rem .75rem; font-size:.875rem; font-weight:700;
          transition: transform .05s ease, filter .2s ease;
        }
        .btn-primary:hover, .btn-secondary:hover{ filter: brightness(1.08); background: var(--eco-green-600); }
        .btn-primary:active, .btn-secondary:active{ transform: translateY(1px); }
        .btn-ghost{
          border-radius:.75rem; padding:.5rem .75rem; font-size:.875rem;
          color: var(--eco-text); transition: background-color .15s ease;
        }
        .btn-ghost:hover{ background: rgba(255,255,255,0.06); }
        .input, textarea, select{
          background: var(--eco-blue-2);
          border:1px solid var(--eco-line);
          color: var(--eco-text);
          border-radius:.75rem; padding:.5rem .75rem; font-size:.9rem; outline:none;
        }
        .input::placeholder, textarea::placeholder{ color: var(--eco-text-2); }
        .input:focus, textarea:focus, select:focus{
          border-color: var(--eco-green);
          box-shadow: 0 0 0 3px rgba(15,208,142,0.20);
        }
        a, .link{ color: var(--eco-green); }
        .navbar{
          background: rgba(11,16,32,0.75);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid var(--eco-line);
        }
        .page-active{ background: var(--eco-green); color:#05111c; }
      `}</style>

      {/* ====== NAVBAR ====== */}
      <header className="sticky top-0 z-50 navbar">
        {/* agregado 'relative' para poder centrar el buscador con position absolute */}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-20 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <img
              src="/img/logo.png"
              alt="EcoUV"
              className="h-12 md:h-14 lg:h-16 w-auto rounded-xl object-contain flex-shrink-0"
            />
            <span className="font-semibold tracking-wide text-lg md:text-xl">EcoUV</span>
          </div>

          {/* Buscador centrado (más corto) */}
          <form
            id="searchForm"
            className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2 w-[520px] lg:w-[640px]"
            role="search"
            aria-label="Buscar usuarios o grupos"
          >
            <input type="search" id="q" name="q" placeholder="Buscar usuarios o grupos…" className="input w-full" />
            <button className="ml-2 btn-primary" type="submit">Buscar</button>
          </form>

          <div className="ml-auto flex items-center gap-2">
            {/* Notificación más grande */}
            <button
              id="openNotifications"
              className="relative btn-ghost h-10 w-10 rounded-xl flex items-center justify-center text-xl"
              title="Notificaciones"
            >
              🔔
              <span id="notifDot" className="absolute -right-0.5 -top-0.5 inline-flex h-2 w-2 rounded-full" style={{ background: "var(--eco-green)" }}></span>
            </button>
            {/* Perfil más grande */}
            <button id="openProfile" className="ml-1 inline-flex items-center gap-2 btn-ghost">
              <img alt="avatar" className="h-10 w-10 rounded-xl object-cover" src="/img/icono-imagen-perfil-avatar-fondo-azul-estilo-diseno-plano-recursos-diseno-elementos-graficos_991720-653.jpg" />
              <span className="hidden sm:block text-sm">Perfil</span>
            </button>
          </div>
        </div>
      </header>

      {/* ====== LAYOUT ====== */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-6 py-6">
        {/* Sidebar IZQ */}
        <aside className="md:col-span-3 lg:col-span-3">
          <nav className="card p-4 space-y-1">
            <button data-view="feed" className="w-full text-left rounded-xl px-3 py-2 hover:bg-white/5">🏠 Feed</button>
            <button data-view="myProfile" className="w-full text-left rounded-xl px-3 py-2 hover:bg-white/5">🖼️ Mis publicaciones</button>
            <button data-view="groups" className="w-full text-left rounded-xl px-3 py-2 hover:bg-white/5">👥 Grupos</button>
          </nav>
        </aside>

        {/* CONTENIDO PRINCIPAL */}
        <section id="viewContainer" className="md:col-span-9 lg:col-span-9 space-y-6">

          {/* FEED */}
          <section id="view-feed" className="space-y-6">
            {/* Composer (se oculta y se reemplaza por FAB en useEffect) */}
            <form id="postComposer" className="card p-4 space-y-3" aria-label="Crear post">
              <div className="flex items-start gap-3">
                <img alt="yo" className="h-10 w-10 rounded-xl object-cover" src="https://i.pravatar.cc/64?img=13" />
                <div className="flex-1">
                  <label htmlFor="postText" className="sr-only">Texto del post</label>
                  <textarea id="postText" name="text" rows="3" minLength={1} maxLength={2000} placeholder="¿Qué estás pensando? (1–2000 caracteres)" className="w-full input"></textarea>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <label htmlFor="postImage" className="cursor-pointer rounded-xl px-3 py-2 text-sm" style={{ background: "rgba(255,255,255,0.06)" }}>Subir imagen</label>
                      <input id="postImage" name="image" type="file" accept="image/*" className="hidden" />
                      <span id="imageName" className="text-xs chip"></span>
                    </div>
                    <button type="submit" className="btn-primary">Publicar</button>
                  </div>
                  <div id="imagePreview" className="mt-3 hidden">
                    <img alt="preview" className="max-h-64 rounded-xl border soft-border" />
                  </div>
                </div>
              </div>
              <p className="text-xs chip">.</p>
            </form>

            {/* Lista de posts (mock) */}
            <div className="space-y-4" id="feedList">
              <article className="card p-4 space-y-3">
                <header className="flex items-center gap-3">
                  <img alt="autor" className="h-10 w-10 rounded-xl object-cover" src="/img/icono-de-perfil-moderno-línea-189417386.webp" />
                  <div>
                    <div className="font-medium">Ricardo</div>
                    <div className="text-xs chip">Facultad de negocios y tecnologias • hace 2 h</div>
                  </div>
                  <span className="ml-auto text-xs chip">#post-1024</span>
                </header>
                <div className="text-sm leading-relaxed">Explorando el layout del perfil. ¿Comentarios?</div>
                <img alt="img" className="rounded-xl border soft-border" src="https://picsum.photos/seed/ux/960/480" />
                <footer className="flex items-center gap-4 text-sm">
                  <button className="rounded-xl px-3 py-2 hover:bg-white/5" aria-pressed="false">👍 12</button>
                  <button className="rounded-xl px-3 py-2 hover:bg-white/5">💬 4</button>
                  <button className="ml-auto rounded-xl px-3 py-2 hover:bg-white/5">⋯</button>
                </footer>
                <div className="space-y-2 border-t soft-border pt-3">
                  <div className="flex items-start gap-2">
                    <img className="h-8 w-8 rounded-lg" src="https://i.pravatar.cc/64?img=32" alt="avatar" />
                    <div className="flex-1">
                      <div className="text-xs chip">Lia — hace 30 min</div>
                      <div className="text-sm">Me gusta el contraste 👌</div>
                    </div>
                    <button className="text-xs chip hover:text-[var(--eco-text)]">Eliminar</button>
                  </div>
                  <form className="flex items-center gap-2">
                    <label className="sr-only" htmlFor="comment-1024">Comentar</label>
                    <input id="comment-1024" type="text" placeholder="Escribe un comentario…" className="flex-1 input" />
                    <button className="btn-primary" type="submit">Enviar</button>
                  </form>
                </div>
              </article>
              {/* (paginación fue retirada anteriormente a petición) */}
            </div>
          </section>

          {/* MI PERFIL */}
          <section id="view-myProfile" className="hidden space-y-4">
            <div className="card p-4">
              <h2 className="text-lg font-semibold">Editar perfil</h2>
              <form className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4" aria-label="Editar perfil">
                <div>
                  <label className="text-sm" htmlFor="display_name">Nombre</label>
                  <input id="display_name" name="display_name" type="text" required maxLength={60} className="mt-1 w-full input" />
                </div>
                <div>
                  <label className="text-sm" htmlFor="avatar_url">Avatar URL</label>
                  <input id="avatar_url" name="avatar_url" type="url" placeholder="https://…" className="mt-1 w-full input" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm" htmlFor="bio">Bio</label>
                  <textarea id="bio" name="bio" rows={3} maxLength={160} className="mt-1 w-full input"></textarea>
                </div>
                <div className="sm:col-span-2 flex items-center gap-2">
                  <button type="submit" className="btn-primary">Guardar</button>
                  <span className="text-xs chip">R1.4</span>
                </div>
              </form>
            </div>
          </section>

          {/* GRUPOS */}
          <section id="view-groups" className="hidden space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Grupos</h2>
              <button data-view="createGroup" className="btn-primary">Crear grupo</button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <article className="card p-4 space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl" style={{ background: "linear-gradient(135deg, #1A7EE0, var(--eco-green))" }}></div>
                  <div>
                    <div className="font-medium">Dev Backend</div>
                    <div className="text-xs chip">Público • 128 miembros</div>
                  </div>
                </div>
                <p className="text-sm">Para amantes de APIs y SQL.</p>
                <div className="flex items-center gap-2">
                  <button className="rounded-xl px-3 py-2 text-sm" style={{ background: "rgba(255,255,255,0.06)" }}>Unirse</button>
                  <button className="rounded-xl px-3 py-2 text-sm hover:bg-white/5">Ver</button>
                </div>
              </article>
              {/* … más grupos */}
            </div>
          </section>

          {/* CREAR GRUPO */}
          <section id="view-createGroup" className="hidden card p-4">
            <h2 className="text-lg font-semibold">Crear grupo</h2>
            <form className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4" aria-label="Crear grupo">
              <div>
                <label className="text-sm" htmlFor="g_name">Nombre</label>
                <input id="g_name" name="name" type="text" required maxLength={60} className="mt-1 w-full input" />
              </div>
              <div>
                <label className="text-sm" htmlFor="g_visibility">Visibilidad</label>
                <select id="g_visibility" name="visibility" className="mt-1 w-full input">
                  <option value="public">Público</option>
                  <option value="private">Privado</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm" htmlFor="g_desc">Descripción</label>
                <textarea id="g_desc" name="description" rows={3} maxLength={240} className="mt-1 w-full input"></textarea>
              </div>
              <div className="sm:col-span-2 flex items-center gap-3">
                <label htmlFor="g_image" className="cursor-pointer rounded-xl px-3 py-2 text-sm" style={{ background: "rgba(255,255,255,0.06)" }}>Imagen del grupo</label>
                <input id="g_image" type="file" accept="image/*" className="hidden" />
                <span id="g_imageName" className="text-xs chip"></span>
              </div>
              <div className="sm:col-span-2 flex items-center gap-2">
                <button type="submit" className="btn-primary">Crear</button>
                <span className="text-xs chip">R2.1 — owner = creador</span>
              </div>
            </form>
          </section>

          {/* Prueba de carga */}
          <section id="view-uploadTester" className="hidden card p-4">
            <h2 className="text-lg font-semibold">Prueba de carga de imágenes</h2>
            <p className="text-sm chip">Demostración de previsualización local y miniatura (client-side). En producción, enviar a S3/Cloudinary y guardar la URL final (CA5).</p>
            <form className="mt-3 space-y-3">
              <div className="flex items-center gap-3">
                <input id="up_image" type="file" accept="image/*"
                  className="block w-full text-sm file:mr-4 file:rounded-xl file:border-0 file:px-4 file:py-2 file:text-[#05111c]"
                  style={{ background: "transparent" }} />
                <button id="clearUpload" type="button" className="btn-ghost">Limpiar</button>
              </div>
              <div id="up_preview" className="grid grid-cols-2 md:grid-cols-3 gap-3"></div>
            </form>
          </section>

        </section>
      </main>

      {/* ====== FOOTER ====== */}
      <footer className="border-t py-8 text-center text-sm" style={{ borderColor: "var(--eco-line)", color: "var(--eco-text-2)" }}>
        EcoUV • Red social para alumnos de la Universidad Veracruzana
      </footer>

      {/* ====== Modales ====== */}
      <dialog id="modalLogin" className="glass rounded-2xl p-0 w-full max-w-md">
        <form method="dialog" className="card p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Iniciar sesión</h3>
            <button value="cancel" className="btn-ghost px-2 py-1">✕</button>
          </div>
          <form id="formLogin" className="mt-3 space-y-3" autoComplete="on">
            <div>
              <label className="text-sm" htmlFor="login_email">Email</label>
              <input id="login_email" name="email" type="email" required className="mt-1 w-full input" />
            </div>
            <div>
              <label className="text-sm" htmlFor="login_password">Contraseña</label>
              <input id="login_password" name="password" type="password" required className="mt-1 w-full input" />
            </div>
            <div className="flex items-center justify-between">
              <label className="inline-flex items-center gap-2 text-xs chip"><input type="checkbox" style={{ accentColor: "var(--eco-green)" }} /> Recuérdame</label>
              <button id="openForgot" type="button" className="text-xs link hover:underline">Olvidé mi contraseña</button>
            </div>
            <button className="btn-primary w-full" type="submit">Entrar</button>
            <p className="text-xs chip">CA1: 200 OK con access_token (exp 1h) + refresh_token (7–30 días).</p>
          </form>
        </form>
      </dialog>

      <dialog id="modalRegister" className="glass rounded-2xl p-0 w-full max-w-md">
        <form method="dialog" className="card p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Crear cuenta</h3>
            <button value="cancel" className="btn-ghost px-2 py-1">✕</button>
          </div>
          <form id="formRegister" className="mt-3 space-y-3" autoComplete="on">
            <div>
              <label className="text-sm" htmlFor="reg_email">Email</label>
              <input id="reg_email" name="email" type="email" required className="mt-1 w-full input" />
              <p className="text-xs chip">R1.1 / CA2: Email debe ser único → 409 Conflict si existe.</p>
            </div>
            <div>
              <label className="text-sm" htmlFor="reg_password">Contraseña</label>
              <input id="reg_password" name="password" minLength={8} type="password" required className="mt-1 w-full input" />
            </div>
            <div>
              <label className="text-sm" htmlFor="reg_name">Nombre para mostrar</label>
              <input id="reg_name" name="display_name" maxLength={60} type="text" className="mt-1 w-full input" />
            </div>
            <button className="btn-primary w-full" type="submit">Registrarme</button>
          </form>
        </form>
      </dialog>

      <dialog id="modalForgot" className="glass rounded-2xl p-0 w-full max-w-md">
        <form method="dialog" className="card p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Recuperar contraseña</h3>
            <button value="cancel" className="btn-ghost px-2 py-1">✕</button>
          </div>
          <form id="formForgot" className="mt-3 space-y-3">
            <div>
              <label className="text-sm" htmlFor="forgot_email">Email</label>
              <input id="forgot_email" name="email" type="email" required className="mt-1 w-full input" />
            </div>
            <button className="btn-primary w-full" type="submit">Enviar enlace</button>
            <p className="text-xs chip">R1.3: Email con link temporal.</p>
          </form>
        </form>
      </dialog>

      {/* Drawer Notificaciones */}
      <aside id="drawerNotifications" className="fixed right-0 top-16 bottom-0 w-full sm:w-[26rem] translate-x-full transition-transform duration-300 card p-4 overflow-y-auto">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Notificaciones</h3>
          <button id="closeNotifications" className="btn-ghost px-2 py-1">✕</button>
        </div>
        <ul className="mt-3 space-y-2 text-sm">
          <li className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.06)" }}>
            <div className="flex items-start gap-3">
              <div className="text-xl">👍</div>
              <div>
                <div><strong>Ana</strong> le dio like a tu post.</div>
                <div className="text-xs chip">hace 5 min</div>
              </div>
              <button className="ml-auto text-xs link hover:underline">Marcar leída</button>
            </div>
          </li>
          <li className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.06)" }}>
            <div className="flex items-start gap-3">
              <div className="text-xl">💬</div>
              <div>
                <div><strong>Luis</strong> comentó tu post.</div>
                <div className="text-xs chip">hace 1 h</div>
              </div>
              <button className="ml-auto text-xs link hover:underline">Marcar leída</button>
            </div>
          </li>
        </ul>
      </aside>
    </>
  );
}
