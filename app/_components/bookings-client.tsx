"use client"

import { useEffect, useState } from "react"
import BookingItem from "../_components/booking-item"
import { Card, CardContent } from "../_components/ui/card"
import { Badge } from "../_components/ui/badge"
import BookingSummary from "../_components/booking-summary"
import PhoneItem from "../_components/phone-item"
import { isFuture, isPast } from "date-fns"
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
    bookings.filter((b) => isFuture(new Date(b.date))),
  )

  const [concludedBookings] = useState(
    bookings.filter((b) => isPast(new Date(b.date))),
  )

  const handleCancelBooking = (id: string) => {
    setSelectedBooking(null)
    setConfirmedBookings((prev) => prev.filter((b) => b.id !== id))
  }

  useEffect(() => {
    bookings.forEach((b) => {
      console.log("ID:", b.id)
      console.log("Date bruto:", b.date)
      console.log("isFuture:", isFuture(b.date))
      console.log("isPast:", isPast(b.date))
    })
  }, [bookings])
  return (
    <div className="flex items-start justify-between gap-5 md:mx-auto lg:w-[90%]">
      <div className="flex w-full flex-col gap-6 md:w-[50%]">
        {/* Confirmados */}
        {confirmedBookings.length > 0 && (
          <div className="w-full">
            <h2 className="mb-3 text-xs font-bold uppercase text-gray-400">
              Confirmados
            </h2>
            <div className="scrollbar flex max-h-[400px] flex-col gap-4 overflow-y-auto">
              {confirmedBookings.map((booking) => (
                <BookingItem
                  key={booking.id}
                  booking={booking}
                  onClick={() => setSelectedBooking(booking)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Finalizados */}
        {concludedBookings.length > 0 && (
          <div className="w-full">
            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
              Finalizados
            </h2>
            <div className="scrollbar flex max-h-[400px] flex-col gap-4 overflow-y-auto">
              {concludedBookings.map((booking) => (
                <BookingItem
                  key={booking.id}
                  booking={booking}
                  onClick={() => setSelectedBooking(booking)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <Card
        className={`hidden max-w-[500px] md:block ${confirmedBookings.length > 0 ? "mt-[27px]" : "mt-[52px]"}`}
      >
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
            <div className="w-full p-5 text-center">
              <p className="text-gray-400">
                Clique em um agendamento para ver os detalhes.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
