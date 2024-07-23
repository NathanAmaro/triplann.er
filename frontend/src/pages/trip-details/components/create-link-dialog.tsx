import { FormEvent, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Link2, Tag } from "lucide-react";
import { toast } from "sonner";
import { api } from "../../../lib/axios";


interface CreateLinkDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    tripId?: string
    onCreateLinkCallback?: (link: string) => void
}



export function CreateLinkDialog(props: CreateLinkDialogProps) {
    const [isLoading, setLoadingRequest] = useState<boolean>(false)


    async function handleSubmitForm(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        setLoadingRequest(true)

        console.log(props.tripId)

        const data = new FormData(event.currentTarget)

        const title = data.get('title')?.toString()
        const url = data.get('url')?.toString()

        if (!title) {
            return toast('A descrição do link é obrigatória.')
        }

        if (!url) {
            return toast('O link é obrigatório.')
        }

        // Configurando a requisição
        const optionsRequest = {
            method: 'POST',
            url: `/trips/${props.tripId}/links`,
            data: {
                title: title,
                url: url
            }
        }

        try {
            // Enviando a requisição
            const response = await api.request(optionsRequest)

            toast("Link cadastrado com sucesso.")

            props.onOpenChange(false)

            if (props.onCreateLinkCallback) {
                props.onCreateLinkCallback(response.data.linkId)
            }

            event.currentTarget.reset()

        } catch (error) {
            console.log(error)

        } finally {
            // Desativando o loading do botão
            setLoadingRequest(false)
        }
    }

    return (
        <Dialog open={props.open} onOpenChange={props.onOpenChange} >
            <DialogContent className="shadow-shape rounded-xl py-5 px-6 bg-zinc-900 border-none w-[640px] space-y-2">
                <DialogHeader className="space-y-2">
                    <DialogTitle className="text-lg font-semibold">Cadastrar link</DialogTitle>
                    <DialogDescription className="text-sm text-zinc-400">
                        Links úteis na viagem.
                    </DialogDescription>
                </DialogHeader>

                <form className="w-full flex flex-col gap-3" onSubmit={handleSubmitForm}>
                    <div className="py-4 pl-4 pr-2 bg-zinc-950 border border-zinc-800 flex-1 rounded-lg flex items-center gap-2">
                        <Tag className="text-zinc-400 size-5" />
                        <input className="bg-transparent placeholder-zinc-400 outline-none w-full" placeholder="Qual a descrição do link?" type="text" name="title" />
                    </div>

                    <div className="flex gap-2">
                        <div className="py-4 px-4 bg-zinc-950 border border-zinc-800 flex-1 rounded-lg flex items-center gap-2">
                            <Link2 className="text-zinc-400 size-5 hover:cursor-pointer" />
                            <input className="bg-transparent placeholder-zinc-400 outline-none w-full" placeholder="Link" type="url" name="url" />
                        </div>
                    </div>

                    <Button variant='lime' type="submit" isLoading={isLoading}>
                        Salvar link
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}