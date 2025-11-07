export default function Logo({ size = 56 }){
  return (
    <div className="flex items-center gap-3">
      <div className="grid place-items-center rounded-2xl bg-eco-blue2 shadow-soft" style={{width:size, height:size}}>
        <span className="text-2xl">🌿</span>
      </div>
      <div className="leading-tight">
        <h1 className="text-xl font-semibold">EcoUV</h1>
        <p className="text-sm text-eco-text2">Red social UV</p>
      </div>
    </div>
  )
}
