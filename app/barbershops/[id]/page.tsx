import ServiceItem from "@/app/_components/service-item";
import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";
import { ChevronLeftIcon, MapIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface BarberShopPageProps {
    params: {
        id: string;
    }
}

const BarberShopPage = async ({params}: BarberShopPageProps) => {
    const barbershop = await db.barbershop.findUnique({
        where: {
            id: params.id
        },
        include:{
            services: true
        }
    });

    if(!barbershop){
        return notFound()
    }
    return (
       <div>
        {/* Image */}
        <div className="relative h-[250px] w-full">
            <Image
                alt={barbershop.name}
                src={barbershop.imageUrl}
                fill
                className="object-cover"
            />

            <Button size={"icon"} className="absolute top-4 left-4" variant="secondary" asChild>
                <Link href="/">
                    <ChevronLeftIcon/>
                </Link>
            </Button>

            <Button size={"icon"} className="absolute top-4 right-4" variant="secondary">
                <MenuIcon/>
            </Button>
        </div>

        {/* Informações */}
        <div className="border-b border-solid p-5">
            <h1 className="mb-3 text-xl font-bold">{barbershop.name}</h1>
            <div className="mb-2 flex items-center gap-2">
                <MapIcon className="text-primary" size={18}/>
                <p className="text-sm">{barbershop.address}</p>
            </div>

            <div className="flex items-center gap-2">
                <StarIcon className="text-primary fill-primary" size={18}/>
                <p className="text-sm">5,0 (459 Avaliações)</p>
            </div>
        </div>

        {/* Descrição */}
        <div className="border-b border-solid p-5 space-y-2">
            <h2 className="text-xs uppercase font-bold text-gray-400">sobre nós</h2>
            <p className="text-sm text-justify">{barbershop.description}</p>
        </div>

        {/* Serviços */}
        <div className="p-5 space-y-4">
            <h1 className="text-xs uppercase font-bold text-gray-400 ">Serviços</h1>
            <div className="space-y-3">
                {barbershop.services.map((service) => <ServiceItem key={service.id} service={service}/>)}
            </div>
        </div>
       </div>
    );
}
 
export default BarberShopPage;