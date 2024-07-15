import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { InviteGuestsDialog } from "../../components/dialogs/invite-guests-dialog"
import { ConfirmTripDialog } from "../../components/dialogs/confirm-trip-dialog"
import { Step1 } from "./components/step-1"
import { Step2 } from "./components/step-2"



export function CreateTripPage() {
    const navigate = useNavigate()
    const [isSecondInputActive, setSecondInputActive] = useState(false)
    const [isOpenGuestsModal, setOpenGuestsModal] = useState(false)
    const [isOpenConfirmTripModal, setOpenConfirmTripModal] = useState(false)
    const [emailsToInvite, setEmailsToInvite] = useState<string[]>([])

    function handleActiveSecondInput() {
        setSecondInputActive(true)
    }

    function handleInactiveSecondInput() {
        setSecondInputActive(false)
    }

    function handleOpenGuestsModal() {
        setOpenGuestsModal(true)
    }

    function handleSubmitFormInvite(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const data = new FormData(event.currentTarget)

        const email = data.get('guestEmail')?.toString()

        if (!email) {
            return
        }

        if (emailsToInvite.includes(email)) {
            return
        }

        setEmailsToInvite([...emailsToInvite, email])

        event.currentTarget.reset()
    }

    function handleRemoveEmailFormInvite(emailToRemove: string) {
        const newEmailList = emailsToInvite.filter((email) => email !== emailToRemove)

        setEmailsToInvite(newEmailList)
    }

    function handleOpenConfirmTripModal() {
        setOpenConfirmTripModal(true)
    }

    function handleCreateTrip(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        navigate('/trips/123')
    }

    return (
        <>
            <div className="h-screen flex items-center justify-center">
                <div className="max-w-3xl w-full px-6 text-center space-y-10">

                    <div className="flex flex-col items-center gap-3">
                        <img className="w-64" src="/logo.svg" alt="triplann.er" />
                        <p className="text-zinc-300 text-lg">
                            Convide seus amigos e planeje sua próxima viagem!
                        </p>
                    </div>

                    <div className="space-y-4">
                        <Step1 handleActiveSecondInput={handleActiveSecondInput}
                            handleInactiveSecondInput={handleInactiveSecondInput}
                            isSecondInputActive={isSecondInputActive}/>

                        {isSecondInputActive && (
                            <Step2 emailsToInvite={emailsToInvite}
                                handleOpenConfirmTripModal={handleOpenConfirmTripModal}
                                handleOpenGuestsModal={handleOpenGuestsModal}/>
                        )}

                    </div>

                    <p className="text-zinc-500 text-sm">
                        Ao planejar sua viagem pela Triplann.er você automaticamente concorda <br />
                        com nossos <a href="" className="text-zinc-300 underline">termos de uso</a> e <a href="" className="text-zinc-300 underline">políticas de privacidade</a>.
                    </p>

                </div>
            </div >

            <InviteGuestsDialog open={isOpenGuestsModal} 
                onOpenChange={setOpenGuestsModal}
                handleActiveSecondInput={handleActiveSecondInput}
                handleRemoveEmailFormInvite={handleRemoveEmailFormInvite}
                handleSubmitFormInvite={handleSubmitFormInvite}
                emailsToInvite={emailsToInvite}/>

            <ConfirmTripDialog open={isOpenConfirmTripModal}
                onOpenChange={setOpenConfirmTripModal}
                handleCreateTrip={handleCreateTrip}/>
        </>
    )
}
