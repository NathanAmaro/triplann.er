import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react";

interface Step1Props {
    isSecondInputActive: boolean
    handleInactiveSecondInput: () => void
    handleActiveSecondInput: () => void
}

export function Step1(props: Step1Props) {
    return (
        <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center justify-center shadow-shape gap-3">
            <div className="flex items-center gap-2 flex-1">
                <MapPin className="size-5 text-zinc-400" />
                <input className="bg-transparent text-lg placeholder-zinc-400 w-full outline-none flex-1 disabled:cursor-not-allowed" disabled={props.isSecondInputActive} type="text" placeholder="Para onde você vai?" />
            </div>

            <div className="flex items-center gap-2">
                <Calendar className="size-5 text-zinc-400" />
                <input className="bg-transparent text-lg placeholder-zinc-400 w-44 outline-none disabled:cursor-not-allowed" disabled={props.isSecondInputActive} type="text" placeholder="Quando?" />
            </div>

            <div className="w-px h-6 bg-zinc-800" />

            {props.isSecondInputActive ? (
                <button className="bg-zinc-800 text-zinc-200 rounded-lg py-2 px-5 font-medium flex items-center gap-2 hover:bg-zinc-700"
                    type="button"
                    onClick={props.handleInactiveSecondInput}>
                    Alterar local/data
                    <Settings2 className="size-5 text-zinc-200" />
                </button>
            ) : (
                <button className="bg-lime-300 text-lime-950 rounded-lg py-2 px-5 font-medium flex items-center gap-2 hover:bg-lime-400"
                    type="button"
                    onClick={props.handleActiveSecondInput}>
                    Continuar
                    <ArrowRight className="size-5 text-lime-950" />
                </button>
            )}
        </div>
    )
}