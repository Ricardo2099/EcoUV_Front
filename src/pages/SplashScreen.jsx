import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SplashScreen(){
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => {
      navigate("/Feed", { replace: true });
    }, 5000);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <>
      <style>{`
        :root{
          --eco-blue: #0B1020;
          --eco-text: #E9EEF7;
          --eco-accent: #22c55e;
        }
        *{box-sizing:border-box}
        html,body{height:100%}
        body{
          margin:0;
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji";
          background: radial-gradient(1200px 800px at 50% 30%, #0F1730 0%, var(--eco-blue) 60%, #070A14 100%);
          color: var(--eco-text);
          display:grid;
          grid-template-rows: 1fr auto;
          min-height:100%;
          overflow:hidden;
        }
        .center{
          display:flex; 
          align-items:center; 
          justify-content:center;
          padding: 2rem;
          min-height: 100vh;        /* asegura centro vertical en toda la pantalla */
        }
        .brand{
          display:flex; 
          align-items:center; 
          gap: clamp(16px, 2vw, 28px);
          transform: translateY(0);  /* antes -6vh */
          animation: fadeIn .6s ease-out both;
        }
        .brand img{
          width: clamp(84px, 16vw, 160px);
          height: auto;
          filter: drop-shadow(0 8px 30px rgba(0,0,0,.35));
          user-select: none;
        }
        .brand h1{
          margin:0;
          font-weight: 800;
          letter-spacing: .4px;
          font-size: clamp(42px, 6vw, 80px);
          line-height: 0.95;
        }
        .tagline{
          text-align:center;
          font-size: clamp(12px, 1.8vw, 14px);
          opacity:.85;
          border-top: 1px solid rgba(255,255,255,.08);
          padding: 16px 20px;
          backdrop-filter: blur(4px);
        }
        .dots{
          display:inline-flex; gap:8px; margin-left: 8px; vertical-align: middle;
        }
        .dot{
          width:6px; height:6px; border-radius:999px; background: var(--eco-accent);
          opacity:.35; transform: translateY(0);
          animation: bounce 1s infinite ease-in-out;
        }
        .dot:nth-child(2){ animation-delay:.15s }
        .dot:nth-child(3){ animation-delay:.30s }

        @keyframes bounce{
          0%, 80%, 100% { transform: translateY(0); opacity:.35 }
          40% { transform: translateY(-6px); opacity:1 }
        }
        @keyframes fadeIn{
          from{ opacity:0; transform: translateY(-10px) }
          to{ opacity:1; transform: translateY(0) }   /* antes -6vh */
        }
        img{ -webkit-user-drag:none }
      `}</style>

      <main className="center" aria-label="Pantalla de carga de EcoUV">
        <div className="brand" role="img" aria-label="EcoUV">
          <img src="/img/logo.png" alt="Logo de EcoUV" />
          <h1>
            EcoUV
            <span className="dots" aria-hidden="true">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </span>
          </h1>
        </div>
      </main>

      <footer className="tagline">
        EcoUV • Red social para alumnos de la Universidad Veracruzana
      </footer>
    </>
  );
}
