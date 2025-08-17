
import { Eye, FootprintsIcon, SearchIcon } from "lucide-react"
import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import { Input } from "./_components/ui/input"
import Image from "next/image"
import { Card, CardContent } from "./_components/ui/card"
import { Avatar, AvatarImage } from "./_components/ui/avatar"
import { Badge } from "./_components/ui/badge"
import { db } from "./_lib/prisma"
import BarberShopItem from "./_components/barbershop-item"

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
          <Button variant="secondary" className="w-full">
            <Image src="/cabelo.svg" alt="Cabelo" width={16} height={16}/>
            Cabelo
          </Button>
          <Button variant="secondary" className="w-full">
            <Image src="/barba.svg" alt="Barba" width={16} height={16}/>  
            Barba
          </Button>
          <Button variant="secondary" className="w-full">
            <Image src="/acabamento.svg" alt="Acabamento" width={16} height={16}/>
            Acabamentos  
          </Button> 
          <Button variant="secondary" className="w-full">
            <FootprintsIcon size={16}/>
            Pézinho  
          </Button> 
          <Button variant="secondary" className="w-full">
            <Eye size={16}/>
            Sobrancelha  
          </Button> 
        </div>

        {/* Banner */}
        <div className="relative h-[150px] w-full mt-6">
          <Image alt="Agende nos melhores..." src="/banner-01.png" fill className="object-cover rounded-xl"/>
        </div>

        <h2 className="mt-6 mb-3 text-xs font-bold uppercase text-gray-400 ">Agendamentos</h2>

        <Card>
          <CardContent className="flex justify-between p-0">

            {/* Direita */}
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge className="w-fit">Confirmado</Badge>
              <h3>Corte de Cabelo</h3>
            
              <div className="flex items-center gap-2">
                <Avatar className="w-6 h-6">
                  <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png"/> 
                </Avatar>
                <p>Barbearia do Zé</p>
              </div>
            </div>

            {/* Esquerda */}
            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
              <p className="text-sm">Agosto</p>
              <p className="text-xl">05</p>
              <p className="text-sm">20:00</p>
            </div>


          </CardContent>
        </Card>

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
