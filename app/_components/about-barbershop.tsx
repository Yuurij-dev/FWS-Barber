import { Barbershop } from "@prisma/client"
import { Card, CardContent, CardFooter } from "./ui/card"
import Image from "next/image"
import { Avatar, AvatarImage } from "./ui/avatar"
import PhoneItem from "./phone-item"
import { db } from "../_lib/prisma"

interface AboutBarberShopProps {
  barberShop: Pick<
    Barbershop,
    "name" | "address" | "imageUrl" | "phones" | "id"
  > | null
}
export const AboutBarberShop = async ({ barberShop }: AboutBarberShopProps) => {
  if (!barberShop) {
    return null
  }

  const schedules = await db.barbershop.findUnique({
    where: {
      id: barberShop.id,
    },
    include: {
      schedules: true,
    },
  })

  return (
    <Card className="w-full">
      <CardContent className="w-full space-y-3 p-5">
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
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit
            molestias minima doloremque delectus, dignissimos doloribus veniam
            ratione similique nulla esse illo placeat architecto deserunt optio
            velit eum nobis recusandae eveniet!
          </p>
        </div>

        <div className="border-b-2 border-solid pb-5">
          {barberShop?.phones.map((phone, index) => (
            <PhoneItem phone={phone} key={phone + index} />
          ))}
        </div>

        <div>
          <div>
            {schedules?.schedules.map((schedule) => (
              <div
                key={schedule.id}
                className="mb-2 flex items-center justify-between"
              >
                <span className="font-semibold text-gray-400">
                  {schedule.dayOfWeek === 0
                    ? "Segunda"
                    : schedule.dayOfWeek === 1
                      ? "Terça"
                      : schedule.dayOfWeek === 2
                        ? "Quarta"
                        : schedule.dayOfWeek === 3
                          ? "Quinta"
                          : schedule.dayOfWeek === 4
                            ? "Sexta"
                            : schedule.dayOfWeek === 5
                              ? "Sábado"
                              : "Domingo"}
                </span>
                <span className="ml-2 font-semibold">
                  {schedule.isClosed
                    ? "Fechado"
                    : `${schedule.openTime ?? "-"} - ${schedule.closeTime ?? "-"}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between">
        <p className="text-sm font-bold">Em Parceria com</p>
        <Image alt="FSW Barber" src="/logo.png" height={10} width={120} />
      </CardFooter>
    </Card>
  )
}
