import { FormEvent } from "react";
import { AtSign, Plus, X } from "lucide-react";
import { 
    Dialog, 
    DialogContent, 
    DialogDescription, 
    DialogFooter, 
    DialogHeader, 
    DialogTitle 
} from "../ui/dialog";


interface InviteGuestsDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    emailsToInvite: string[]
    handleRemoveEmailFormInvite: (email: string) => void
    handleSubmitFormInvite: (event: FormEvent<HTMLFormElement>) => void
    handleActiveSecondInput: () => void
}

export function InviteGuestsDialog(props: InviteGuestsDialogProps) {
    return (
        <Dialog open={props.open} onOpenChange={props.onOpenChange}>
            <DialogContent className="shadow-shape rounded-xl py-5 px-6 bg-zinc-900 border-none w-[640px] max-w-max space-y-2">
                <DialogHeader className="space-y-2">
                    <DialogTitle className="text-lg font-semibold">Selecionar convidados</DialogTitle>
                    <DialogDescription className="text-sm text-zinc-400">
                        Os convidados irão receber e-mails para confirmar sua participação na viagem. Você poderá adicionar mais convidados futuramente.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-wrap gap-2">
                    {props.emailsToInvite.map((email) => (
                        <div key={email} className="py-1 px-2 rounded-md bg-zinc-800 flex items-center gap-2">
                            <span className="text-zinc-300">{email}</span>
                            <button type="button" onClick={() => props.handleRemoveEmailFormInvite(email)}><X className="size-4 text-zinc-400" /></button>
                        </div>
                    ))}

                </div>

                <div className="w-full h-px bg-zinc-800" />

                <DialogFooter>
                    <form className="py-2 pl-4 pr-2 bg-zinc-950 border border-zinc-800 w-full rounded-lg flex items-center gap-2" onSubmit={props.handleSubmitFormInvite}>
                        <AtSign className="text-zinc-400 size-5" />
                        <input className="bg-transparent placeholder-zinc-400 outline-none flex-1" placeholder="Digite o e-mail do convidado" type="email" name="guestEmail" />
                        <button className="bg-lime-300 text-lime-950 rounded-lg py-2 px-5 font-medium flex items-center gap-2 hover:bg-lime-400"
                            onClick={props.handleActiveSecondInput}
                            type="submit">
                            Convidar
                            <Plus className="size-5 text-lime-950" />
                        </button>
                    </form>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}