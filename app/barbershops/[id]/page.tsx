import { AboutBarberShop } from "@/app/_components/about-barbershop"
import HeaderDesktop from "@/app/_components/header-desktop"
import PhoneItem from "@/app/_components/phone-item"
import ServiceItem from "@/app/_components/service-item"
import SideBarSheet from "@/app/_components/sidebar-sheet"
import { Button } from "@/app/_components/ui/button"
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet"
import { db } from "@/app/_lib/prisma"
import { ChevronLeftIcon, MapIcon, MenuIcon, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

interface BarberShopPageProps {
  params: {
    id: string
  }
}

const BarberShopPage = async ({ params }: BarberShopPageProps) => {
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
      schedules: true,
    },
  })
  if (!barbershop) {
    return notFound()
  }
  return (
    <div>
      <HeaderDesktop />
      <div className="md:my-10 md:flex md:gap-10 md:p-5 xl:m-auto xl:my-10 xl:max-w-[1500px]">
        <div className="w-full xl:w-[75%]">
          <div className="relative h-[250px] w-full md:h-[600px]">
            {/* Image */}
            <Image
              alt={barbershop.name}
              src={barbershop.imageUrl}
              fill
              className="object-cover"
            />

            <Button
              size={"icon"}
              className="absolute left-4 top-4 md:hidden"
              variant="secondary"
              asChild
            >
              <Link href="/">
                <ChevronLeftIcon />
              </Link>
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  size={"icon"}
                  variant={"outline"}
                  className="absolute right-4 top-4 md:hidden"
                >
                  <MenuIcon />
                </Button>
              </SheetTrigger>
              <SideBarSheet />
            </Sheet>
          </div>

          {/* Informações Mobile*/}
          <div className="border-b border-solid p-5 lg:hidden">
            <h1 className="mb-3 text-xl font-bold">{barbershop.name}</h1>
            <div className="mb-2 flex items-center gap-2">
              <MapIcon className="text-primary" size={18} />
              <p className="text-sm">{barbershop.address}</p>
            </div>

            <div className="flex items-center gap-2">
              <StarIcon className="fill-primary text-primary" size={18} />
              <p className="text-sm">5,0 (459 Avaliações)</p>
            </div>
          </div>

          {/* Informações Desktop */}
          <div className="hidden items-center justify-between border-b border-solid p-5 lg:flex">
            <div>
              <h1 className="mb-3 text-3xl font-bold">{barbershop.name}</h1>
              <div className="mb-2 flex items-center gap-2">
                <MapIcon className="text-primary" size={18} />
                <p className="text-lg">{barbershop.address}</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 rounded-xl bg-[#1a1b1f] p-5">
              <div className="flex items-center gap-3">
                <StarIcon className="fill-primary text-primary" size={18} />
                <p className="text-3xl font-bold">5,0</p>
              </div>
              <p className="text-md">459 Avaliações</p>
            </div>
          </div>

          {/* Descrição */}
          <div className="space-y-2 border-b border-solid p-5">
            <h2 className="text-xs font-bold uppercase text-gray-400">
              sobre nós
            </h2>
            <p className="text-justify text-sm">{barbershop.description}</p>
          </div>

          {/* Serviços */}
          <div className="space-y-4 border-b border-solid p-5 md:border-0">
            <h1 className="text-xs font-bold uppercase text-gray-400">
              Serviços
            </h1>
            <div className="grid-cols-2 gap-4 space-y-3 xl:grid xl:space-y-0">
              {barbershop.services.map((service) => (
                <ServiceItem
                  key={service.id}
                  barberShop={JSON.parse(JSON.stringify(barbershop))}
                  service={JSON.parse(JSON.stringify(service))}
                />
              ))}
            </div>
          </div>

          {/* Contato */}
          <div className="space-y-3 p-5 md:hidden">
            <h1 className="text-xs font-bold uppercase text-gray-400">
              Contato
            </h1>
            {barbershop.phones.map((phone, index) => (
              <PhoneItem key={phone + "-" + index} phone={phone} />
            ))}
          </div>
        </div>
        <div className="hidden xl:block xl:w-[25%]">
          <AboutBarberShop barberShop={barbershop} />
        </div>
      </div>
    </div>
  )
}

export default BarberShopPage
