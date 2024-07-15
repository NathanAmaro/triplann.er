import { Mail, User } from "lucide-react";
import { 
    Dialog, 
    DialogContent, 
    DialogDescription,
    DialogHeader, 
    DialogTitle 
} from "../ui/dialog"

interface ConfirmTripDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    handleCreateTrip: () => void
}


export function ConfirmTripDialog(props: ConfirmTripDialogProps) {
    return (
        <Dialog open={props.open} onOpenChange={props.onOpenChange}>
            <DialogContent className="shadow-shape rounded-xl py-5 px-6 bg-zinc-900 border-none w-[640px] max-w-max space-y-2">
                <DialogHeader className="space-y-2">
                    <DialogTitle className="text-lg font-semibold">Confirmar criação de viagem</DialogTitle>
                    <DialogDescription className="text-sm text-zinc-400">
                        Para concluir a criação da viagem <span className="text-zinc-100 font-semibold">Florianópolis, Brasil</span> nas datas de <span className="text-zinc-100 font-semibold">16 a 27 de Agosto de 2024</span> preencha os dados abaixo:
                    </DialogDescription>
                </DialogHeader>

                <form className="flex flex-col gap-3">
                    <div className="py-4 pl-4 pr-2 bg-zinc-950 border border-zinc-800 w-full rounded-lg flex items-center gap-2">
                        <User className="text-zinc-400 size-5" />
                        <input className="bg-transparent placeholder-zinc-400 outline-none flex-1" placeholder="Seu nome completo" type="text" name="name" />
                    </div>

                    <div className="py-4 pl-4 pr-2 bg-zinc-950 border border-zinc-800 w-full rounded-lg flex items-center gap-2">
                        <Mail className="text-zinc-400 size-5" />
                        <input className="bg-transparent placeholder-zinc-400 outline-none flex-1" placeholder="Seu e-mail pessoal" type="email" name="email" />
                    </div>

                    <button className="bg-lime-300 text-lime-950 rounded-lg h-11 px-5 font-medium text-center hover:bg-lime-400"
                        onClick={props.handleCreateTrip}
                        type="submit">
                        Confirmar criação de viagem
                    </button>
                </form>

            </DialogContent>
        </Dialog>
    )
}