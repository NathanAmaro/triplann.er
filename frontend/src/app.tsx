import { useState } from "react"
import { ArrowRight, Calendar, MapPin, Settings2, UserRoundPlus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "../src/components/ui/dialog"


//AULA 1 - 1:05:18


export function App() {
  const [isSecondInputActive, setSecondInputActive] = useState(false)
  const [isOpenGuestsModal, setOpenGuestsModal] = useState(false)

  function handleActiveSecondInput() {
    setSecondInputActive(true)
  }

  function handleInactiveSecondInput() {
    setSecondInputActive(false)
  }

  function handleOpenGuestsModal() {
    setOpenGuestsModal(true)
  }

  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <div className="max-w-3xl w-full px-6 text-center space-y-10">

          <div className="flex flex-col items-center gap-3">
            <img className="w-64" src="/logo.svg" alt="triplann.er" />
            <p className="text-zinc-300 text-lg">
              Convide seus amigos e planeje sua próxima viagem!
            </p>
          </div>

          <div className="space-y-4">
            <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center justify-center shadow-shape gap-3">
              <div className="flex items-center gap-2 flex-1">
                <MapPin className="size-5 text-zinc-400" />
                <input className="bg-transparent text-lg placeholder-zinc-400 w-full outline-none flex-1 disabled:cursor-not-allowed" disabled={isSecondInputActive} type="text" placeholder="Para onde você vai?" />
              </div>

              <div className="flex items-center gap-2 w-48">
                <Calendar className="size-5 text-zinc-400" />
                <input className="bg-transparent text-lg placeholder-zinc-400 w-auto outline-none disabled:cursor-not-allowed" disabled={isSecondInputActive} type="text" placeholder="Quando?" />
              </div>

              <div className="w-px h-6 bg-zinc-800" />

              {isSecondInputActive ? (
                <button className="bg-zinc-800 text-zinc-200 rounded-lg py-2 px-5 font-medium flex items-center gap-2 hover:bg-zinc-700"
                  type="button"
                  onClick={handleInactiveSecondInput}>
                  Alterar local/data
                  <Settings2 className="size-5 text-zinc-200" />
                </button>
              ) : (
                <button className="bg-lime-300 text-lime-950 rounded-lg py-2 px-5 font-medium flex items-center gap-2 hover:bg-lime-400"
                  type="button"
                  onClick={handleActiveSecondInput}>
                  Continuar
                  <ArrowRight className="size-5 text-lime-950" />
                </button>
              )}
            </div>

            {isSecondInputActive && (
              <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center justify-center shadow-shape gap-3">
                <button className="flex items-center gap-2 flex-1 text-lg text-zinc-400" 
                  type="button"
                  onClick={handleOpenGuestsModal}>
                  <UserRoundPlus className="size-5 text-zinc-400" />
                  Quem estará na viagem?
                </button>

                <div className="w-px h-6 bg-zinc-800" />

                <button className="bg-lime-300 text-lime-950 rounded-lg py-2 px-5 font-medium flex items-center gap-2 hover:bg-lime-400"
                  onClick={handleActiveSecondInput}>
                  Confirmar viagem
                  <ArrowRight className="size-5 text-lime-950" />
                </button>
              </div>
            )}

          </div>

          <p className="text-zinc-500 text-sm">
            Ao planejar sua viagem pela Triplann.er você automaticamente concorda <br />
            com nossos <a href="" className="text-zinc-300 underline">termos de uso</a> e <a href="" className="text-zinc-300 underline">políticas de privacidade</a>.
          </p>

        </div>
      </div >

      <Dialog open={isOpenGuestsModal} onOpenChange={setOpenGuestsModal}>
        <DialogContent className="shadow-shape rounded-xl py-5 px-6 bg-zinc-900 border-none w-[640px] max-w-max space-y-5">
          <DialogHeader className="space-y-2">
            <DialogTitle className="text-lg font-semibold">Selecionar convidados</DialogTitle>
            <DialogDescription className="text-sm text-zinc-400">
              Os convidados irão receber e-mails para confirmar sua participação na viagem.
            </DialogDescription>
          </DialogHeader>
          <div>

          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
