import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { CreateActivityDialog } from "./components/create-activity-dialog";
import { ImportantLinks } from "./components/important-links";
import { Guests } from "./components/guests";
import { Activities } from "./components/activities";
import { PageHeader } from "./components/page-header";
import { Button } from "../../components/ui/button";
import { useParams } from 'react-router-dom'
import { api } from "../../lib/axios";
import { dayjs } from '../../lib/dayjs'


interface TripDetails {
    id: string,
    sequence: number,
    destination: string,
    starts_at: string,
    ends_at: string,
    is_confirmed: boolean
}

export function TripDetailsPage() {
    const { tripId } = useParams()
    const [isOpenActivityModal, setOpenActivityModal] = useState(false)
    const [tripDetails, setTripDetails] = useState<TripDetails | undefined>()
    const [newActivityCreated, setNewActivityCreated] = useState<string>('')


    useEffect(() => {
        async function request() {
            const optionsRequest = {
                method: 'GET',
                url: `/trips/${tripId}`
            }

            try {
                // Enviando a requisição
                const response = await api.request(optionsRequest)

                setTripDetails(response.data)

            } catch (error) {
                console.log(error)

            }
        } request()

    }, [tripId])

    function handleOpenActivityModal() {
        setOpenActivityModal(true)
    }

    return (
        <>
            <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">

                <PageHeader destination={tripDetails?.destination}
                    starts_at={dayjs(tripDetails?.starts_at).toDate()} 
                    ends_at={dayjs(tripDetails?.ends_at).toDate()}/>

                <main className="flex gap-16 pl-4">
                    <section className="w-full space-y-6 flex-col">
                        <div className="flex flex-1 items-center justify-between">
                            <h2 className="text-3xl font-semibold">Atividades</h2>
                            <Button variant='lime' onClick={handleOpenActivityModal}>
                                <Plus className="size-5 text-lime-950" />
                                Cadastrar atividade
                            </Button>
                        </div>
                        <Activities tripId={tripId} hookRequest={newActivityCreated}/>
                    </section>
                    <section className="w-80 space-y-6">
                        <ImportantLinks />

                        <hr className="w-full h-px bg-zinc-800 border-none" />

                        <Guests tripId={tripId}/>
                    </section>
                </main>
            </div>

            <CreateActivityDialog open={isOpenActivityModal} onOpenChange={setOpenActivityModal} tripId={tripId} onCreateActivityCallback={setNewActivityCreated}/>
        </>
    )
}