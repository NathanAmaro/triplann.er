import { CircleCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../../../lib/axios";
import { dayjs } from '../../../lib/dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)


interface ActivitiesProps {
    tripId?: string
    hookRequest?: string
}

interface DayActivities {
    date: string,
    activities: [
        {
            id: string,
            title: string,
            occurs_at: string,
            trip_id: string
        }
    ]
}

export function Activities(props: ActivitiesProps) {
    const [dayActivities, setDayActivities] = useState<DayActivities[]>([])

    useEffect(() => {
        async function request() {

            const optionsRequest = {
                method: 'GET',
                url: `/trips/${props.tripId}/activities`
            }

            try {
                // Enviando a requisição
                const response = await api.request(optionsRequest)

                setDayActivities(response.data)

            } catch (error) {
                console.log(error)

            }
        } request()

    }, [props.tripId, props.hookRequest])



    return (
        <div className="flex gap-10 flex-col">
            {dayActivities.map((day) => (
                <div key={day.date} className="space-y-2">
                    <div className="flex gap-2 items-baseline">
                        <span className="text-xl text-zinc-300 font-semibold">Dia {dayjs(day.date).format('DD')}</span>
                        <span className="text-xs text-zinc-500">{dayjs(day.date).format('dddd')}</span>
                    </div>
                    {day.activities.length > 0 ? (
                        day.activities.map((activity) => (
                            <div key={activity.id} className="space-y-2">
                                <div className="px-4 py-3 bg-zinc-900 shadow-shape rounded-xl flex items-center gap-3">
                                    <CircleCheck className="size-5 text-lime-300" />
                                    <span className="text-zinc-100">{activity.title}</span>
                                    <span className="text-zinc-400 text-sm ml-auto">{dayjs(activity.occurs_at).format('hh:mm')}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-zinc-500 text-sm">Nenhuma atividade cadastrada nessa data.</p>
                    )}
                </div>
            ))}
        </div>
    )
}