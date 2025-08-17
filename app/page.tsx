
import { SearchIcon } from "lucide-react"
import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import { Input } from "./_components/ui/input"
import Image from "next/image"
import { Card, CardContent } from "./_components/ui/card"
import { db } from "./_lib/prisma"
import BarberShopItem from "./_components/barbershop-item"
import { quickSearchOptions } from "./_contants/search"
import BookingItem from "./_components/booking-item"

export default async function Home() {

  const barberShops = await db.barbershop.findMany({})
  const popularBarberShops = await db.barbershop.findMany({
    orderBy: {
      name: 'desc'
    }
  })
  return (
    <div>
      <Header/>
      <div className="p-5">
        <h1 className="text-xl font-bold">Olá, Yuri</h1>
        <p>Segunda-feira, 16 agosto.</p>

        {/* Busca */}
        <div className="flex items-center gap-2 mt-6">
          <Input placeholder="Faça sua busca..."/>  
          <Button>
            <SearchIcon/>
          </Button>
        </div>

        {/* Busca Rapida */}
        <div className="flex gap-3 mt-6 overflow-x-scroll  [&::webkit-scrollbar]:hidden">

          {quickSearchOptions.map((option) => (
            <Button key={option.title} variant="secondary" className="w-full">
              <Image src={option.imageUrl} alt={option.title} width={16} height={16}/>
              {option.title}
            </Button>
          ))}
          
        </div>

        {/* Banner */}
        <div className="relative h-[150px] w-full mt-6">
          <Image alt="Agende nos melhores..." src="/banner-01.png" fill className="object-cover rounded-xl"/>
        </div>

        {/* Agendamentos */}
        <BookingItem />

        {/* Acabamentos */}
        <h2 className="mt-6 mb-3 text-xs font-bold uppercase text-gray-400 ">Recomendados</h2>

        <div className="flex gap-4 overflow-auto [&::webkit-scrollbar]:hidden">
          {barberShops.map((barberShop) => (
            <BarberShopItem key={barberShop.id} barbershop={barberShop}/>
          ))}
        </div>

        {/* Populares */}
        <h2 className="mt-6 mb-3 text-xs font-bold uppercase text-gray-400 ">populares</h2>

        <div className="flex gap-4 overflow-auto [&::webkit-scrollbar]:hidden">
          {popularBarberShops.map((barberShop) => (
            <BarberShopItem key={barberShop.id} barbershop={barberShop}/>
          ))}
        </div>

      </div>

      {/* Footer */}
      <footer>
        <Card>
          <CardContent className="px-5 py-6">
            <p className="text-xs text-gray-400">2023 Copyright <span className="font-bold">FSW Barber</span></p>
          </CardContent>
        </Card>
      </footer>
    </div>
  )
}
