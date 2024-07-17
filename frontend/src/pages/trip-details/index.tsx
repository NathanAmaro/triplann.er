import { Calendar, CircleCheck, Link2, MapPin, Plus, Settings2 } from "lucide-react";

// AULA 2 - 54:51

export function TripDetailsPage() {
    return (
        <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
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
            <main className="flex gap-16 pl-4">
                <section className="flex flex-1 space-y-6 flex-col">
                    <div className="flex flex-1 items-center justify-between">
                        <h2 className="text-3xl font-semibold">Atividades</h2>
                        <button className="bg-lime-300 text-lime-950 rounded-lg py-2 px-5 font-medium text-center flex items-center gap-2 hover:bg-lime-400"
                            type="submit">
                            <Plus className="size-5 text-lime-950" />
                            Cadastrar atividade
                        </button>
                    </div>
                    <div className="flex gap-10 flex-col">
                        <div className="space-y-2">
                            <div className="flex gap-2 items-baseline">
                                <span className="text-xl text-zinc-300 font-semibold">Dia 17</span>
                                <span className="text-xs text-zinc-500">Sábado</span>
                            </div>
                            <p className="text-zinc-500 text-sm">Nenhuma atividade cadastrada nessa data.</p>
                        </div>

                        <div className="space-y-2">
                            <div className="flex gap-2 items-baseline">
                                <span className="text-xl text-zinc-300 font-semibold">Dia 18</span>
                                <span className="text-xs text-zinc-500">Domingo</span>
                            </div>
                            <div className="space-y-2">
                                <div className="px-4 py-3 bg-zinc-900 shadow-shape rounded-xl flex items-center gap-3">
                                    <CircleCheck className="size-5 text-lime-300"/>
                                    <span className="text-zinc-100">Academia em grupo</span>
                                    <span className="text-zinc-400 text-sm ml-auto">08:00h</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-80 space-y-6">
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
                                <Link2 className="text-zinc-400 size-5 shrink-0"/>
                            </div>
                        </div>
                        <button className="bg-zinc-800 w-full text-zinc-200 rounded-lg py-3 px-5 font-medium flex items-center justify-center gap-2 hover:bg-zinc-700"
                            type="button">
                            <Plus className="size-5 text-zinc-200" />
                            Cadastrar novo link
                        </button>
                    </div>
                    <div className="w-full h-px bg-zinc-800" />
                    <div></div>
                </section>
            </main>
        </div>
    )
}