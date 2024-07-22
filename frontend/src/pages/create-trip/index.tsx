import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { InviteGuestsDialog } from "./components/invite-guests-dialog"
import { ConfirmTripDialog } from "./components/confirm-trip-dialog"
import { Step1 } from "./components/step-1"
import { Step2 } from "./components/step-2"
import { DateRange } from "react-day-picker"
import { api } from "../../lib/axios"


// AULA 3 - 36:25

export function CreateTripPage() {
    const navigate = useNavigate()
    const [isSecondInputActive, setSecondInputActive] = useState(false)
    const [isOpenGuestsModal, setOpenGuestsModal] = useState(false)
    const [isOpenConfirmTripModal, setOpenConfirmTripModal] = useState(false)

    const [dateTrip, setDateTrip] = useState<DateRange>()
    const [tripDestination, setTripDestination] = useState<string>()
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

    async function handleSubmitFormConfirmTrip(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const data = new FormData(event.currentTarget)

        const ownerName = data.get('name')?.toString()
        const ownerEmail = data.get('email')?.toString()


        console.log(tripDestination)
        console.log(dateTrip)
        console.log(emailsToInvite)
        console.log(ownerName)
        console.log(ownerEmail)

        const optionsRequest = {
            method: 'POST',
            url: '/trips',
            data: {
                destination: tripDestination,
                starts_at: dateTrip?.from,
                ends_at: dateTrip?.to,
                owner_name: ownerName,
                owner_email: ownerEmail,
                emails_to_invite: emailsToInvite
            }
        };

        const response = await api.request(optionsRequest)

        const { tripId } = response.data

        event.currentTarget.reset()

        navigate(`/trips/${tripId}`)

    }



    return (
        <>
            <div className="h-screen flex items-center justify-center">
                <div className="w-3xl max-w-max w-full px-6 text-center space-y-10">

                    <div className="flex flex-col items-center gap-3">
                        <img className="w-64" src="/logo.svg" alt="triplann.er" />
                        <p className="text-zinc-300 text-lg">
                            Convide seus amigos e planeje sua próxima viagem!
                        </p>
                    </div>

                    <div className="space-y-4">
                        <Step1 handleActiveSecondInput={handleActiveSecondInput}
                            handleInactiveSecondInput={handleInactiveSecondInput}
                            isSecondInputActive={isSecondInputActive}
                            dateState={dateTrip}
                            setDateState={setDateTrip}
                            setDestinationState={setTripDestination} />

                        {isSecondInputActive && (
                            <Step2 emailsToInvite={emailsToInvite}
                                handleOpenConfirmTripModal={handleOpenConfirmTripModal}
                                handleOpenGuestsModal={handleOpenGuestsModal} />
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
                emailsToInvite={emailsToInvite} />

            <ConfirmTripDialog open={isOpenConfirmTripModal}
                onOpenChange={setOpenConfirmTripModal}
                handleSubmitFormConfirmTrip={handleSubmitFormConfirmTrip} />
        </>
    )
}
