import { Calendar, MapPin, Settings2 } from "lucide-react";
import { Button } from "../../../components/ui/button";

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
                    <Button variant='zinc'>
                        Alterar local/data
                        <Settings2 className="size-5 text-zinc-200" />
                    </Button>
                </div>
            </div>
        </div>
    )
}