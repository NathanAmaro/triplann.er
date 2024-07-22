import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Calendar as DatePicker } from "../../../components/ui/calendar"
import { ptBR } from "date-fns/locale"
import { DateRange } from "react-day-picker"
import { dayjs } from '../../../lib/dayjs'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../../../components/ui/popover"
import { useRef } from "react";



interface Step1Props {
    isSecondInputActive: boolean
    handleInactiveSecondInput: () => void
    handleActiveSecondInput: () => void
    dateState: DateRange | undefined
    setDateState: (dateRange: DateRange | undefined) => void
    setDestinationState: (destination: string) => void
}

export function Step1(props: Step1Props) {
    const tripInput = useRef<HTMLInputElement>(null)


    function handleValidFieldsBeforeStep2() {
        if (!tripInput.current?.value) {
            return alert('Informe o destino da viagem')
        }

        if (!props.dateState) {
            return alert('Selecione uma data')
        }

        props.setDestinationState(tripInput.current.value)

        return props.handleActiveSecondInput()
    }

    return (
        <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center justify-center shadow-shape gap-3">
            <div className="flex items-center gap-2 flex-1">
                <MapPin className="size-5 text-zinc-400" />
                <input className="bg-transparent text-lg text-zinc-200 placeholder-zinc-400 w-full outline-none flex-1 disabled:cursor-not-allowed" ref={tripInput} disabled={props.isSecondInputActive} type="text" placeholder="Para onde você vai?" />
            </div>

            <div className="flex items-center gap-2">
                <Popover>
                    <PopoverTrigger asChild>
                        <button className="text-zinc-400 text-lg bg-transparent border-none min-w-44 max-w-max rounded-lg flex items-center gap-2 disabled:cursor-not-allowed" disabled={props.isSecondInputActive}>
                            <Calendar className="text-zinc-400 size-5" />
                            {
                                props.dateState?.from ? (
                                    props.dateState.to ? (
                                        <span className="text-center text-zinc-200">
                                            {`${dayjs(props.dateState.from).format('DD [de] MMMM')}  -  ${dayjs(props.dateState.to).format('DD [de] MMMM')}`}
                                        </span>

                                    ) : (
                                        <span className="text-center text-zinc-200">
                                            {dayjs(props.dateState.from).format('DD [de] MMMM')}
                                        </span>
                                    )
                                ) : (
                                    <span className="text-center text-zinc-400">
                                        {'Quando?'}
                                    </span>
                                )
                            }
                            <input className="[display:none]" type="date" name="date" />
                        </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <DatePicker
                            mode="range"
                            selected={props.dateState}
                            onSelect={props.setDateState}
                            initialFocus
                            locale={ptBR}
                        />
                    </PopoverContent>
                </Popover>
            </div>

            <hr className="w-px h-6 bg-zinc-800 border-none" />

            {props.isSecondInputActive ? (
                <Button variant='zinc' onClick={props.handleInactiveSecondInput} size='default'>
                    Alterar local/data
                    <Settings2 className="size-5 text-zinc-200" />
                </Button>
            ) : (
                <Button variant='lime' onClick={handleValidFieldsBeforeStep2}>
                    Continuar
                    <ArrowRight className="size-5 text-lime-950" />
                </Button>
            )}
        </div>
    )
}