import { CircleCheck, CircleDashed, UserCog } from "lucide-react";
import { Button } from "../../../components/ui/button";

export function Guests() {
    return (
        <div className="space-y-6">
            <h2 className="font-semibold text-xl">Convidados</h2>
            <div className="space-y-5">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-col gap-2 w-full">
                        <span className="text-zinc-100 font-medium">Jessica White</span>
                        <span className="text-zinc-400 text-sm truncate">
                            jessica.white44@yahoo.com
                        </span>
                    </div>
                    <CircleDashed className="text-zinc-400 size-5 shrink-0" />
                </div>

                <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-col gap-2 w-full">
                        <span className="text-zinc-100 font-medium">Dr. Rita Pacocha</span>
                        <span className="text-zinc-400 text-sm truncate">
                            lacy.stiedemann@gmail.com
                        </span>
                    </div>
                    <CircleCheck className="text-lime-300 size-5 shrink-0" />
                </div>
            </div>
            <Button variant='zinc' className="w-full">
                <UserCog className="size-5 text-zinc-200" />
                Gerenciar convidados
            </Button>
        </div>
    )
}