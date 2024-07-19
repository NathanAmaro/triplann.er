import { Calendar, MapPin, Settings2 } from "lucide-react";

export function PageHeader() {
    return (
        <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
            <div className="flex items-center gap-2">
                <MapPin className="size-5 text-zinc-400" />
                <span className="text-zinc-100 text-lg">Florianópolis, Brasil</span>
            </div>
            <div className="flex items-center gap-5">
                <div className="flex items-center gap-2">
                    <Calendar className="size-5 text-zinc-400" />
                    <span className="text-zinc-100">17 a 23 de Agosto</span>
                </div>
                <div>
                    <button className="bg-zinc-800 text-zinc-200 rounded-lg py-2 px-5 font-medium flex items-center gap-2 hover:bg-zinc-700"
                        type="button">
                        Alterar local/data
                        <Settings2 className="size-5 text-zinc-200" />
                    </button>
                </div>
            </div>
        </div>
    )
}