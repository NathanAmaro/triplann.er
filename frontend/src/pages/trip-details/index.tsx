import { Plus } from "lucide-react";
import { useState } from "react";
import { CreateActivityDialog } from "../../components/dialogs/create-activity-dialog";
import { ImportantLinks } from "./components/important-links";
import { Guests } from "./components/guests";
import { Activities } from "./components/activities";
import { PageHeader } from "./components/page-header";


export function TripDetailsPage() {
    const [isOpenActivityModal, setOpenActivityModal] = useState(false)

    function  handleOpenActivityModal() {
        setOpenActivityModal(true)
    }

    return (
        <>
            <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
                
                <PageHeader />

                <main className="flex gap-16 pl-4">
                    <section className="w-full space-y-6 flex-col">
                        <div className="flex flex-1 items-center justify-between">
                            <h2 className="text-3xl font-semibold">Atividades</h2>
                            <button className="bg-lime-300 text-lime-950 rounded-lg py-2 px-5 font-medium text-center flex items-center gap-2 hover:bg-lime-400"
                                onClick={handleOpenActivityModal}
                                type="submit">
                                <Plus className="size-5 text-lime-950" />
                                Cadastrar atividade
                            </button>
                        </div>
                        <Activities />
                    </section>
                    <section className="w-80 space-y-6">
                        <ImportantLinks />

                        <hr className="w-full h-px bg-zinc-800 border-none" />

                        <Guests />
                    </section>
                </main>
            </div>

            <CreateActivityDialog open={isOpenActivityModal} onOpenChange={setOpenActivityModal} />
        </>
    )
}