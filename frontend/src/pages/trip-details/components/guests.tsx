import { CircleCheck, CircleDashed, UserCog } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { useEffect, useState } from "react";
import { api } from "../../../lib/axios";

interface GuestsProps {
    tripId?: string
}

interface Participant {
    id: string,
    is_confirmed: boolean,
    name: string,
    email: string
}

export function Guests(props: GuestsProps) {
    const [participants, setParticipants] = useState<Participant[]>([])

    useEffect(() => {
        async function request() {

            const optionsRequest = {
                method: 'GET',
                url: `/trips/${props.tripId}/participants`
            }

            try {
                // Enviando a requisição
                const response = await api.request(optionsRequest)

                setParticipants(response.data.participants)

            } catch (error) {
                console.log(error)

            }
        } request()

    }, [props.tripId])


    return (
        <div className="space-y-6">
            <h2 className="font-semibold text-xl">Convidados</h2>
            <div className="space-y-5">
                {participants.map((participant, index) => (
                    <div key={participant.id} className="flex items-center justify-between gap-4">
                        <div className="flex flex-col gap-2 w-full">
                            <span className="text-zinc-100 font-medium">{participant.name ?? `Convidado ${index}`}</span>
                            <span className="text-zinc-400 text-sm truncate">
                                {participant.email}
                            </span>
                        </div>
                        {participant.is_confirmed ? 
                            <CircleCheck className="text-lime-300 size-5 shrink-0" /> 
                            : <CircleDashed className="text-zinc-400 size-5 shrink-0" /> 
                        }
                        
                    </div>
                ))}
            </div>
            <Button variant='zinc' className="w-full">
                <UserCog className="size-5 text-zinc-200" />
                Gerenciar convidados
            </Button>
        </div>
    )
}