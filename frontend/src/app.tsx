export function App() {

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <p className="text-zinc-300 text-lg">
          Convide seus amigos e planeje sua próxima viagem!
        </p>

        <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center justify-center shadow-shape">
          <input type="text" placeholder="Para onde você vai?" />
          <input type="text" placeholder="Quando?" />
          <button>Continuar</button>
        </div>
        
        <p className="text-zinc-500 text-sm">
          Ao planejar sua viagem pela Triplann.er você automaticamente concorda <br />
          com nossos <a href="" className="text-zinc-300 underline">termos de uso</a> e <a href="" className="text-zinc-300 underline">políticas de privacidade</a>.
        </p>

      </div>
    </div>
  )
}
