import { Barbershop } from "@prisma/client"
import { Card, CardContent, CardFooter } from "./ui/card"
import Image from "next/image"
import { Avatar, AvatarImage } from "./ui/avatar"
import PhoneItem from "./phone-item"

interface AboutBarberShopProps {
    barberShop: Pick<Barbershop, "name" | "address" | "imageUrl" | "phones"> | null
}
export const AboutBarberShop = ({ barberShop }: AboutBarberShopProps) => {
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

                    <h2 className="uppercase font-bold text-md">Sobre nós</h2>
                    <p className="text-gray-400 text-sm">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit molestias minima doloremque delectus, dignissimos doloribus veniam ratione similique nulla esse illo placeat architecto deserunt optio velit eum nobis recusandae eveniet!</p>
                </div>

                <div className="border-b-2 border-solid pb-5">
                    {barberShop?.phones.map((phone, index) => (
                        <PhoneItem phone={phone} key={phone + index} />
                    ))}
                </div>
            </CardContent>

            <CardFooter className=" flex items-center justify-between">
                <p className="text-sm text-gray-400">Em Parceria com</p>
                <Image alt="FSW Barber" src="/logo.png" height={10} width={120} />

            </CardFooter>
        </Card>
    )
}