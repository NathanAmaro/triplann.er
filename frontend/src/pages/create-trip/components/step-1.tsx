import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react";
import { Button } from "../../../components/ui/button";

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

            <hr className="w-px h-6 bg-zinc-800 border-none" />

            {props.isSecondInputActive ? (
                <Button variant='zinc' onClick={props.handleInactiveSecondInput} size='default'>
                    Alterar local/data
                    <Settings2 className="size-5 text-zinc-200" />
                </Button>
            ) : (
                <Button variant='lime' onClick={props.handleActiveSecondInput}>
                    Continuar
                    <ArrowRight className="size-5 text-lime-950" />
                </Button>
            )}
        </div>
    )
}