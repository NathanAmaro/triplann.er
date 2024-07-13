import { ArrowRight, Calendar, MapPin } from "lucide-react"

// AULA 01 - 43:26

export function App() {

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <p className="text-zinc-300 text-lg">
          Convide seus amigos e planeje sua próxima viagem!
        </p>

        <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center justify-center shadow-shape gap-3">

          <div className="flex items-center gap-2 flex-1">
            <MapPin className="size-5 text-zinc-400" />
            <input className="bg-transparent text-lg placeholder-zinc-400 w-full outline-none" type="text" placeholder="Para onde você vai?" />
          </div>

          <div className="flex items-center gap-2 w-48">
            <Calendar className="size-5 text-zinc-400" />
            <input className="bg-transparent text-lg placeholder-zinc-400 w-auto outline-none" type="text" placeholder="Quando?" />
          </div>

          <div className="w-px h-6 bg-zinc-800"/>

          <button className="bg-lime-300 text-lime-950 rounded-lg py-2 px-5 font-medium flex items-center gap-2 hover:bg-lime-400">
            Continuar
            <ArrowRight className="size-5 text-lime-950"/>
          </button>
        </div>

        <p className="text-zinc-500 text-sm">
          Ao planejar sua viagem pela Triplann.er você automaticamente concorda <br />
          com nossos <a href="" className="text-zinc-300 underline">termos de uso</a> e <a href="" className="text-zinc-300 underline">políticas de privacidade</a>.
        </p>

      </div>
    </div>
  )
}
