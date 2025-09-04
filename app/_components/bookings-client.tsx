"use client"

import { useState } from "react"
import BookingItem from "../_components/booking-item"
import { Card, CardContent } from "../_components/ui/card"
import { Badge } from "../_components/ui/badge"
import BookingSummary from "../_components/booking-summary"
import PhoneItem from "../_components/phone-item"
import { isFuture } from "date-fns"
import { Prisma } from "@prisma/client"
import Image from "next/image"
import { Avatar, AvatarImage } from "./ui/avatar"
import { DialogCancelBooking } from "./dialog-cancel-booking"

type BookingWithService = Prisma.BookingGetPayload<{
  include: {
    service: {
      include: {
        barbershop: true
      }
    }
  }
}>

export default function BookingsClient({
  bookings,
}: {
  bookings: BookingWithService[]
}) {
  const [selectedBooking, setSelectedBooking] =
    useState<BookingWithService | null>(null)

  const barberShop = selectedBooking?.service?.barbershop
  const service = selectedBooking?.service
  const selectedDate = selectedBooking?.date
  const isConfirmed = selectedBooking ? isFuture(selectedBooking.date) : false

  const [confirmedBookings, setConfirmedBookings] = useState(
    bookings.filter((b) => isFuture(b.date)),
  )
  const [concludedBookings] = useState(
    bookings.filter((b) => !isFuture(b.date)),
  )

  const handleCancelBooking = (id: string) => {
    setSelectedBooking(null)
    setConfirmedBookings((prev) => prev.filter((b) => b.id !== id))
  }
  return (
    <div className="flex gap-5">
      <div className="flex flex-col gap-6">
        {/* Confirmados */}
        {confirmedBookings.length > 0 && (
          <>
            <h2 className="mb-2 text-xs font-bold uppercase text-gray-400">
              Confirmados
            </h2>
            <div className="flex flex-col gap-4">
              {confirmedBookings.map((booking) => (
                <BookingItem
                  key={booking.id}
                  booking={booking}
                  onClick={() => setSelectedBooking(booking)}
                />
              ))}
            </div>
          </>
        )}

        {/* Finalizados */}
        {concludedBookings.length > 0 && (
          <>
            <h2 className="mb-2 mt-6 text-xs font-bold uppercase text-gray-400">
              Finalizados
            </h2>
            <div className="flex flex-col gap-4">
              {concludedBookings.map((booking) => (
                <BookingItem
                  key={booking.id}
                  booking={booking}
                  onClick={() => setSelectedBooking(booking)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <Card className="hidden md:block">
        <CardContent>
          {selectedBooking && barberShop && service && selectedDate ? (
            <>
              <div className="space-y-3 border-b-2 border-solid pb-5">
                <div className="relative mt-6 flex h-[180px] w-full items-end">
                  <Image
                    src="/map.png"
                    alt={`Mapa da barbearia ${barberShop?.name}`}
                    fill
                    className="rounded-xl object-cover"
                  />

                  <Card className="z-50 mx-5 mb-3 w-full rounded-xl">
                    <CardContent className="flex items-center gap-3 px-5 py-3">
                      <Avatar>
                        <AvatarImage src={barberShop?.imageUrl} />
                      </Avatar>

                      <div>
                        <h3 className="font-bold">{barberShop?.name}</h3>
                        <p className="text-xs">{barberShop?.address}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <h2 className="text-md font-bold uppercase">Sobre nós</h2>
                <p className="text-sm text-gray-400">
                  {barberShop?.description}
                </p>
              </div>
              <div className="space-y-2 border-b border-solid py-6">
                {barberShop?.phones.map((phone, index) => (
                  <PhoneItem phone={phone} key={phone + index} />
                ))}
              </div>

              <div className="space-y-4 py-6">
                <Badge
                  className="w-fit"
                  variant={isConfirmed ? "default" : "secondary"}
                >
                  {isConfirmed ? "Confirmado" : "Finalizado"}
                </Badge>

                <BookingSummary
                  barberShop={barberShop}
                  service={service}
                  selectedDate={selectedDate}
                />
              </div>
              <div className="w-full">
                {isConfirmed && (
                  <DialogCancelBooking
                    booking={selectedBooking}
                    onSuccess={() => handleCancelBooking(selectedBooking.id)}
                  />
                )}
              </div>
            </>
          ) : (
            <p className="text-gray-400">
              Clique em um agendamento para ver os detalhes.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
