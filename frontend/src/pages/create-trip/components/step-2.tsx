import { ArrowRight, UserRoundPlus } from "lucide-react";


interface Step2Props {
    handleOpenGuestsModal: () => void
    emailsToInvite: string[]
    handleOpenConfirmTripModal: () => void
}


export function Step2(props: Step2Props) {
    return (
        <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center justify-center shadow-shape gap-3">
            <button className="flex items-center gap-2 flex-1 text-lg text-zinc-400"
                type="button"
                onClick={props.handleOpenGuestsModal}>
                <div className="flex items-center gap-2 flex-1">
                    <UserRoundPlus className="size-5 text-zinc-400" />
                    Quem estará na viagem?
                </div>
                <span className="text-zinc-100">
                    {props.emailsToInvite.length > 0 ? props.emailsToInvite.length === 1 ? ` ${props.emailsToInvite.length} convidado` : ` ${props.emailsToInvite.length} convidados` : ''}
                </span>
            </button>

            <div className="w-px h-6 bg-zinc-800" />

            <button className="bg-lime-300 text-lime-950 rounded-lg py-2 px-5 font-medium flex items-center gap-2 hover:bg-lime-400"
                onClick={props.handleOpenConfirmTripModal}>
                Confirmar viagem
                <ArrowRight className="size-5 text-lime-950" />
            </button>
        </div>
    )
}