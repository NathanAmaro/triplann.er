import { FormEvent, useState } from "react"
import { ArrowRight, AtSign, Calendar, MapPin, Plus, Settings2, UserRoundPlus, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "../src/components/ui/dialog"

// AULA 2 - 02:56

export function App() {
  const [isSecondInputActive, setSecondInputActive] = useState(false)
  const [isOpenGuestsModal, setOpenGuestsModal] = useState(false)
  const [isOpenConfirmTripModal, setOpenConfirmTripModal] = useState(false)
  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([])

  function handleActiveSecondInput() {
    setSecondInputActive(true)
  }

  function handleInactiveSecondInput() {
    setSecondInputActive(false)
  }

  function handleOpenGuestsModal() {
    setOpenGuestsModal(true)
  }

  function handleSubmitFormInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)

    const email = data.get('guestEmail')?.toString()

    if (!email) {
      return
    }

    if (emailsToInvite.includes(email)) {
      return
    }

    setEmailsToInvite([...emailsToInvite, email])

    event.currentTarget.reset()
  }

  function handleRemoveEmailFormInvite(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter((email) => email !== emailToRemove)

    setEmailsToInvite(newEmailList)
  }

  function handleOpenConfirmTripModal() {
    setOpenConfirmTripModal(true)
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
                  onClick={handleOpenConfirmTripModal}>
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
        <DialogContent className="shadow-shape rounded-xl py-5 px-6 bg-zinc-900 border-none w-[640px] max-w-max space-y-2">
          <DialogHeader className="space-y-2">
            <DialogTitle className="text-lg font-semibold">Selecionar convidados</DialogTitle>
            <DialogDescription className="text-sm text-zinc-400">
              Os convidados irão receber e-mails para confirmar sua participação na viagem. Você poderá adicionar mais convidados futuramente.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-wrap gap-2">
            {emailsToInvite.map((email) => (
              <div key={email} className="py-1 px-2 rounded-md bg-zinc-800 flex items-center gap-2">
                <span className="text-zinc-300">{email}</span>
                <button type="button" onClick={() => handleRemoveEmailFormInvite(email)}><X className="size-4 text-zinc-400" /></button>
              </div>
            ))}

          </div>

          <div className="w-full h-px bg-zinc-800" />

          <DialogFooter>
            <form className="py-2 pl-4 pr-2 bg-zinc-950 border border-zinc-800 w-full rounded-lg flex items-center gap-2" onSubmit={handleSubmitFormInvite}>
              <AtSign className="text-zinc-400 size-5" />
              <input className="bg-transparent placeholder-zinc-400 outline-none flex-1" placeholder="Digite o e-mail do convidado" type="email" name="guestEmail" />
              <button className="bg-lime-300 text-lime-950 rounded-lg py-2 px-5 font-medium flex items-center gap-2 hover:bg-lime-400"
                onClick={handleActiveSecondInput}
                type="submit">
                Convidar
                <Plus className="size-5 text-lime-950" />
              </button>
            </form>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isOpenConfirmTripModal} onOpenChange={setOpenConfirmTripModal}>
        <DialogContent className="shadow-shape rounded-xl py-5 px-6 bg-zinc-900 border-none w-[640px] max-w-max space-y-2">
          <DialogHeader className="space-y-2">
            <DialogTitle className="text-lg font-semibold">Confirmar criação de viagem</DialogTitle>
            <DialogDescription className="text-sm text-zinc-400">
              Para concluir a criação da viagem <span className="text-zinc-100 font-semibold">Florianópolis, Brasil</span> nas datas de <span className="text-zinc-100 font-semibold">16 a 27 de Agosto de 2024</span> preencha os dados abaixo:
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <form className="py-2 pl-4 pr-2 bg-zinc-950 border border-zinc-800 w-full rounded-lg flex items-center gap-2" onSubmit={handleSubmitFormInvite}>
              <AtSign className="text-zinc-400 size-5" />
              <input className="bg-transparent placeholder-zinc-400 outline-none flex-1" placeholder="Digite o e-mail do convidado" type="email" name="guestEmail" />
              <button className="bg-lime-300 text-lime-950 rounded-lg py-2 px-5 font-medium flex items-center gap-2 hover:bg-lime-400"
                onClick={handleActiveSecondInput}
                type="submit">
                Convidar
                <Plus className="size-5 text-lime-950" />
              </button>
            </form>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
