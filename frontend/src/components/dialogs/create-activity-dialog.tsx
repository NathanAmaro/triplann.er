import { useRef, useState } from "react";
import { Calendar, Clock, Tag } from "lucide-react";
import {dayjs} from '../../lib/dayjs'
import { ptBR } from "date-fns/locale"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "../ui/dialog";
import { Calendar as DatePicker } from "../ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../ui/popover"

// AULA 2 - 1:02:02

interface CreateActivityDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function CreateActivityDialog(props: CreateActivityDialogProps) {
    const [date, setDate] = useState<Date>()
    const dateInput = useRef<HTMLInputElement | null>(null)
    const timeInput = useRef<HTMLInputElement | null>(null)

    function handleDialogChange(state: boolean) {
        !state && setDate(undefined);
        return props.onOpenChange(state)
    }

    function handleChangeDateInputValue (value: Date | undefined) {
        if (dateInput.current) {
            if (date) {
                dateInput.current.value = date.toString()
            }
        }

        return setDate(value)
    }

    function handleShowTimeInputPicker() {
        timeInput.current?.showPicker()
    }

    return (
        <Dialog open={props.open} onOpenChange={handleDialogChange} >
            <DialogContent className="shadow-shape rounded-xl py-5 px-6 bg-zinc-900 border-none w-[640px] space-y-2">
                <DialogHeader className="space-y-2">
                    <DialogTitle className="text-lg font-semibold">Cadastrar atividade</DialogTitle>
                    <DialogDescription className="text-sm text-zinc-400">
                        Todos convidados podem visualizar as atividades.
                    </DialogDescription>
                </DialogHeader>

                <form className="w-full flex flex-col gap-3">
                    <div className="py-4 pl-4 pr-2 bg-zinc-950 border border-zinc-800 flex-1 rounded-lg flex items-center gap-2">
                        <Tag className="text-zinc-400 size-5" />
                        <input className="bg-transparent placeholder-zinc-400 outline-none w-full" placeholder="Qual a atividade?" type="text" name="activity" />
                    </div>

                    <div className="flex gap-2">
                        <Popover>
                            <PopoverTrigger asChild>
                                <button className="py-4 pl-4 pr-2 bg-zinc-950 border border-zinc-800 w-full rounded-lg flex items-center gap-2">
                                    <Calendar className="text-zinc-400 size-5" />
                                    <span className="text-center">{date ? dayjs(date).format('DD [de] MMMM [de] YYYY') : 'Quando?'}</span>
                                    <input className="[display:none]" type="date" name="date" />
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <DatePicker
                                    mode="single"
                                    selected={date}
                                    onSelect={handleChangeDateInputValue}
                                    initialFocus
                                    locale={ptBR}
                                />
                            </PopoverContent>
                        </Popover>

                        <div className="py-4 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                            <Clock className="text-zinc-400 size-5 hover:cursor-pointer" onClick={handleShowTimeInputPicker} />
                            <input className="bg-transparent placeholder-zinc-400 outline-none w-min" ref={timeInput} placeholder="Horário" type="time" name="time" />
                        </div>
                    </div>

                    <button className="bg-lime-300 text-lime-950 rounded-lg h-11 px-5 font-medium text-center hover:bg-lime-400"
                        type="submit">
                        Salvar atividade
                    </button>
                </form>
            </DialogContent>
        </Dialog>
    )
}