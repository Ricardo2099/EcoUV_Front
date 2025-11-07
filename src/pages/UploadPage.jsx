import TopBar from "../components/TopBar.jsx";

function Post({author, group, text}){
  return (
    <article className="rounded-2xl border border-[rgba(255,255,255,.10)] bg-eco-blue2 p-4">
      <div className="mb-2 text-sm text-eco-text2">{author} · {group}</div>
      <p>{text}</p>
    </article>
  );
}

export default function FeedPage(){
  const posts = [
    {id:1, author:"Eudy", group:"Grupo 502", text:"No habrá clases mañana."},
    {id:2, author:"Contabilidad", group:"Carrera", text:"Nueva guía de ejercicios (PDF)."}
  ];

  return (
    <div className="min-h-screen">
      <TopBar />
      <main className="mx-auto grid max-w-5xl gap-6 px-4 py-6 md:grid-cols-[1fr_320px]">
        <section className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {["General","Salón","Carrera","Campus"].map(f => (
              <button key={f} className="rounded-xl2 border border-[rgba(255,255,255,.10)] px-3 py-1.5 hover:bg-eco-blue2">{f}</button>
            ))}
          </div>
          {posts.map(p => <Post key={p.id} {...p} />)}
        </section>
        <aside className="hidden md:block">
          <div className="rounded-2xl border border-[rgba(255,255,255,.10)] bg-eco-blue2 p-4">
            <h3 className="mb-2 font-semibold">Grupos</h3>
            <ul className="space-y-1 text-eco-text2">
              <li>Grupo 502</li>
              <li>Contabilidad</li>
              <li>Campus Xalapa</li>
              <li>UV Global</li>
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
}
