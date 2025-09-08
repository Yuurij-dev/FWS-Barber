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
import HeaderDesktop from "./_components/header-desktop"

export default async function Home() {
  const session = await getServerSession(authOptions)

  const barberShops = await getBarberShops()
  const popularBarberShops = await getPopularBarberShops()
  const confirmedBookings = await getConfirmedBookings()

  return (
    <div className="">
      <Header />
      <HeaderDesktop />
      <div className="">
        <div className="relative">
          <div className="absolute inset-0 -z-10 hidden lg:block">
            <Image
              src="/background-desktop.jpg"
              alt="Foto Barbeiro background"
              fill
              className="object-cover object-top opacity-[0.1] grayscale filter"
            />
          </div>
          <div className="p-5 lg:m-auto lg:flex lg:max-w-[1200px] lg:flex-col lg:gap-5 lg:py-16 2xl:max-w-[1400px]">
            <div className="gap-4 lg:flex lg:justify-between">
              <div className="lg:mt-4 lg:w-full">
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
                <div className="mt-6 lg:mt-10 lg:w-full lg:max-w-[400px]">
                  <Search />
                </div>

                {confirmedBookings.length > 0 && (
                  <div className="">
                    <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
                      Agendamentos
                    </h2>

                    <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                      {(() => {
                        // Ordena os agendamentos pela data mais próxima
                        const sortedBookings = confirmedBookings.sort(
                          (a, b) =>
                            new Date(a.date).getTime() -
                            new Date(b.date).getTime(),
                        )
                        // Pega apenas o primeiro (mais próximo)
                        const nextBooking = sortedBookings[0]
                        return (
                          <BookingItem
                            key={nextBooking.id}
                            booking={JSON.parse(JSON.stringify(nextBooking))}
                          />
                        )
                      })()}
                    </div>
                  </div>
                )}
              </div>

              {/* Recomendados (desktop) */}
              <div className="hidden w-full lg:block">
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
          <div className="mt-6 flex gap-3 overflow-x-scroll lg:hidden [&::-webkit-scrollbar]:hidden">
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
          <div className="relative mt-6 h-[150px] w-full lg:hidden">
            <Image
              alt="Agende nos melhores..."
              src="/banner-01.png"
              fill
              className="rounded-xl object-cover"
            />
          </div>

          {/* Agendamentos */}
          {confirmedBookings.length > 0 && (
            <div className="lg:hidden">
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
          <div className="lg:hidden">
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
          <div className="mt-6 lg:m-auto lg:flex lg:max-w-[1200px] lg:flex-col lg:gap-5 2xl:max-w-[1400px]">
            <h2 className="mb-3 text-xs font-bold uppercase text-gray-400 lg:text-lg lg:font-semibold lg:text-white">
              populares
            </h2>

            <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
              {popularBarberShops.map((barberShop) => (
                <BarberShopItem key={barberShop.id} barbershop={barberShop} />
              ))}
            </div>
          </div>

          {/* Mais Vísitados */}
          <div className="lg:m-auto lg:mb-6 lg:flex lg:max-w-[1200px] lg:flex-col lg:gap-5 2xl:max-w-[1400px]">
            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400 lg:text-lg lg:font-semibold lg:text-white">
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
