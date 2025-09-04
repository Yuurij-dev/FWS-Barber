import { getServerSession } from "next-auth"
import Header from "../_components/header"
import { authOptions } from "../_lib/auth"
import { notFound } from "next/navigation"
import { getConfirmedBookings } from "../_data/get-confirmed-bookings"
import { getConcluedBookings } from "../_data/get-concluded-bookings"
import HeaderDesktop from "../_components/header-desktop"
// import { Card, CardContent } from "../_components/ui/card"
import BookingsClient from "../_components/bookings-client"

const Bookings = async () => {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    // TODO: mostrar pop-up de login
    return notFound()
  }
  const confirmedBookings = await getConfirmedBookings()

  const concludedBookings = await getConcluedBookings()

  return (
    <>
      <Header />
      <HeaderDesktop />

      <div className="jusctify-center flex w-full flex-col space-y-3 p-5 md:m-auto md:max-w-[1500px]">
        <h1 className="text-xl font-bold">Agendamentos</h1>

        {confirmedBookings.length === 0 && concludedBookings.length === 0 && (
          <p className="text-gray-400">Você ainda não tem agendamentos.</p>
        )}
        {confirmedBookings.length > 0 && (
          <>
            <div className="">
              <BookingsClient
                bookings={[...confirmedBookings, ...concludedBookings]}
              />
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Bookings
