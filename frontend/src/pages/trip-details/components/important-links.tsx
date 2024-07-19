import { Link2, Plus } from "lucide-react";
import { Button } from "../../../components/ui/button";

export function ImportantLinks() {
    return (
        <div className="space-y-6">
            <h2 className="font-semibold text-xl">Links importantes</h2>
            <div className="space-y-5">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-col gap-2 w-full">
                        <span className="text-zinc-100 font-medium">Reserva do AirBnB</span>
                        <a href="#" className="text-zinc-400 text-sm truncate hover:text-zinc-200">
                            https://www.airbnb.com.br/rooms/1231231231276142648712647816278461276487126412764871264
                        </a>
                    </div>
                    <Link2 className="text-zinc-400 size-5 shrink-0" />
                </div>
            </div>
            <Button variant='zinc' className="w-full">
                <Plus className="size-5 text-zinc-200" />
                Cadastrar novo link
            </Button>
            
        </div>
    )
}