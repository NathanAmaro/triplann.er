import { Link2, Plus } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { useEffect, useState } from "react";
import { CreateLinkDialog } from "./create-link-dialog";
import { api } from "../../../lib/axios";


interface ImportantLinksProps {
    tripId?: string
}

interface LinksResponse {
    links: [
        {
            id: string,
            title: string,
            url: string,
            trip_id: string
        }
    ]
}

export function ImportantLinks(props: ImportantLinksProps) {
    const [isOpenLinkModal, setOpenLinkModal] = useState(false)
    const [linksReponse, setLinksResponse] = useState<LinksResponse | undefined>()
    const [hookRequest, setHookRequest] = useState<string>('')

    useEffect(() => {
        async function request() {

            const optionsRequest = {
                method: 'GET',
                url: `/trips/${props.tripId}/links`
            }

            try {
                // Enviando a requisição
                const response = await api.request(optionsRequest)

                setLinksResponse(response.data)

            } catch (error) {
                console.log(error)

            }
        } request()

    }, [props.tripId, hookRequest])

    function handleLinkActivityModal() {
        setOpenLinkModal(true)
    }


    return (
        <>
            <div className="space-y-6">
                <h2 className="font-semibold text-xl">Links importantes</h2>
                <div className="space-y-5">
                    {linksReponse?.links.map((link) => (
                        <div key={link.id} className="flex items-center justify-between gap-4">
                            <div className="flex flex-col gap-2 w-full">
                                <span className="text-zinc-100 font-medium">{link.title}</span>
                                <a href={link.url} className="text-zinc-400 text-sm truncate hover:text-zinc-200">
                                    {link.url}
                                </a>
                            </div>
                            <Link2 className="text-zinc-400 size-5 shrink-0" />
                        </div>
                    ))}
                </div>
                <Button variant='zinc' className="w-full" type="button" onClick={handleLinkActivityModal}>
                    <Plus className="size-5 text-zinc-200" />
                    Cadastrar novo link
                </Button>

            </div>
            <CreateLinkDialog open={isOpenLinkModal} onOpenChange={setOpenLinkModal} onCreateLinkCallback={setHookRequest} tripId={props.tripId} />
        </>

    )
}