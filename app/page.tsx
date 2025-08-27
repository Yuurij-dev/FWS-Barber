import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import Image from "next/image"
import BarberShopItem from "./_components/barbershop-item"
import { quickSearchOptions } from "./_contants/search"
import Search from "./_components/search"
import Link from "next/link"
import BookingItem from "./_components/booking-item"
import { getServerSession } from "next-auth"
import { authOptions } from "./_lib/auth"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { getConfirmedBookings } from "./_data/get-confirmed-bookings"
import { getPopularBarberShops } from "./_data/get-popular-barbershops"
import { getBarberShops } from "./_data/get-barbershops"

export default async function Home() {
  const session = await getServerSession(authOptions)

  const barberShops = await getBarberShops()

  const popularBarberShops = await getPopularBarberShops()

  const confirmedBookings = await getConfirmedBookings()

  return (
    <div className="">
      <Header />
      <div className="">
        <div className="relative">
          <div className="absolute inset-0 -z-10 hidden xl:block">
            <Image
              src="/background-desktop.jpg"
              alt="Foto Barbeiro background"
              fill
              className="object-cover object-top opacity-[0.1] grayscale filter"
            />
          </div>
          <div className="p-5 xl:m-auto xl:flex xl:max-w-[1200px] xl:flex-col xl:gap-5 xl:py-16 2xl:max-w-[1400px]">
            <div className="gap-4 xl:flex xl:justify-between">
              <div className="xl:mt-4 xl:w-full">
                <h1 className="text-xl font-bold">
                  Olá, {session?.user ? session?.user.name : "Faça seu login"}!
                </h1>
                <p>
                  <span className="capitalize">
                    {format(new Date(), "EEEE, dd", { locale: ptBR })}
                  </span>
                  <span> de </span>
                  <span>{format(new Date(), "MMMM", { locale: ptBR })}</span>
                </p>

                {/* Busca */}
                <div className="mt-6 xl:mt-10 xl:w-full xl:max-w-[400px]">
                  <Search />
                </div>
              </div>

              {/* Recomendados (desktop) */}
              <div className="hidden w-full xl:block">
                <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
                  Recomendados
                </h2>

                <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
                  {barberShops.slice(0, 3).map((barberShop) => (
                    <BarberShopItem
                      key={barberShop.id}
                      barbershop={barberShop}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-5">
          {/* Busca Rapida */}
          <div className="mt-6 flex gap-3 overflow-x-scroll xl:hidden [&::-webkit-scrollbar]:hidden">
            {quickSearchOptions.map((option) => (
              <Button
                key={option.title}
                variant="secondary"
                className="w-full"
                asChild
              >
                <Link href={`/barbershops?service=${option.title}`}>
                  <Image
                    src={option.imageUrl}
                    alt={option.title}
                    width={16}
                    height={16}
                  />
                  {option.title}
                </Link>
              </Button>
            ))}
          </div>

          {/* Banner */}
          <div className="relative mt-6 h-[150px] w-full xl:hidden">
            <Image
              alt="Agende nos melhores..."
              src="/banner-01.png"
              fill
              className="rounded-xl object-cover"
            />
          </div>

          {/* Agendamentos */}
          {confirmedBookings.length > 0 && (
            <div className="xl:hidden">
              <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
                Agendamentos
              </h2>

              <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                {confirmedBookings.map((booking) => (
                  <BookingItem
                    key={booking.id}
                    booking={JSON.parse(JSON.stringify(booking))}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Acabamentos */}
          <div className="xl:hidden">
            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
              Recomendados
            </h2>

            <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
              {barberShops.map((barberShop) => (
                <BarberShopItem key={barberShop.id} barbershop={barberShop} />
              ))}
            </div>
          </div>

          {/* Populares */}
          <div className="mt-6 xl:m-auto xl:flex xl:max-w-[1200px] xl:flex-col xl:gap-5 2xl:max-w-[1400px]">
            <h2 className="mb-3 text-xs font-bold uppercase text-gray-400 xl:text-lg xl:font-semibold xl:text-white">
              populares
            </h2>

            <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
              {popularBarberShops.map((barberShop) => (
                <BarberShopItem key={barberShop.id} barbershop={barberShop} />
              ))}
            </div>
          </div>

          {/* Mais Vísitados */}
          <div className="xl:m-auto xl:mb-6 xl:flex xl:max-w-[1200px] xl:flex-col xl:gap-5 2xl:max-w-[1400px]">
            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400 xl:text-lg xl:font-semibold xl:text-white">
              mais visitados
            </h2>

            <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
              {barberShops.map((barberShop) => (
                <BarberShopItem key={barberShop.id} barbershop={barberShop} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
