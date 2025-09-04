"use client"

import { Prisma } from "@prisma/client"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { format, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import { useState, useEffect } from "react"
import Image from "next/image"
import BookingSummary from "./booking-summary"
import PhoneItem from "./phone-item"
import { Button } from "./ui/button"

import { DialogCancelBooking } from "./dialog-cancel-booking"

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: { service: { include: { barbershop: true } } }
  }>
  onClick?: () => void
}

const BookingItem = ({ booking, onClick }: BookingItemProps) => {
  const barbershop = booking.service?.barbershop
  const isConfirmed = isFuture(booking.date)

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768) // md = 768px
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  // const handleSheetOpenChange = (isOpen: boolean) => {
  //   setIsSheetOpen(isOpen)
  // }
  const content = (
    <Card
      onClick={!isMobile ? onClick : undefined} // só dispara onClick em md+
      className="cursor-pointer transition hover:shadow-md"
    >
      <CardContent className="flex justify-between p-0">
        <div className="flex flex-col gap-2 py-5 pl-5">
          <Badge
            className="w-fit"
            variant={isConfirmed ? "default" : "secondary"}
          >
            {isConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>
          <h3>{booking.service?.name}</h3>

          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={barbershop?.imageUrl} />
            </Avatar>
            <p>{barbershop?.name}</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center border-l-2 px-5">
          <p className="text-sm capitalize">
            {format(booking.date, "MMMM", { locale: ptBR })}
          </p>
          <p className="text-xl">
            {format(booking.date, "dd", { locale: ptBR })}
          </p>
          {format(booking.date, "HH:mm", { locale: ptBR })}
        </div>
      </CardContent>
    </Card>
  )

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger className="w-full">{content}</SheetTrigger>
        <SheetContent className="w-[85%]">
          <SheetHeader>
            <SheetTitle className="text-left">
              Informações da Reserva
            </SheetTitle>
          </SheetHeader>

          <div className="relative mt-6 flex h-[180px] w-full items-end">
            <Image
              src="/map.png"
              alt={`Mapa da barbearia ${barbershop?.name}`}
              fill
              className="rounded-xl object-cover"
            />

            <Card className="z-50 mx-5 mb-3 w-full rounded-xl">
              <CardContent className="flex items-center gap-3 px-5 py-3">
                <Avatar>
                  <AvatarImage src={barbershop?.imageUrl} />
                </Avatar>

                <div>
                  <h3 className="font-bold">{barbershop?.name}</h3>
                  <p className="text-xs">{barbershop?.address}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Badge
              className="w-fit"
              variant={isConfirmed ? "default" : "secondary"}
            >
              {isConfirmed ? "Confirmado" : "Finalizado"}
            </Badge>

            <div className="mb-6 mt-3">
              <BookingSummary
                barberShop={
                  barbershop ? { name: barbershop.name } : { name: "" }
                }
                service={
                  booking.service
                    ? {
                        name: booking.service.name,
                        price: booking.service.price,
                      }
                    : { name: "", price: new Prisma.Decimal(0) }
                }
                selectedDate={booking.date}
              />
            </div>

            <div className="space-y-3">
              {barbershop?.phones.map((phone, index) => (
                <PhoneItem key={index} phone={phone} />
              ))}
            </div>
          </div>

          <SheetFooter className="mt-6">
            <div className="flex items-center gap-3">
              <SheetClose asChild>
                <Button className="w-full" variant={"outline"}>
                  Voltar
                </Button>
              </SheetClose>

              {isConfirmed && <DialogCancelBooking booking={booking} />}
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    )
  }

  return content
}

export default BookingItem
