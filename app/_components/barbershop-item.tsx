import { Barbershop } from "@prisma/client";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Star } from "lucide-react";

interface BarberShopItemProps{
    barbershop: Barbershop
}
const BarberShopItem = ({barbershop}: BarberShopItemProps) => {
    return ( 
        <Card className="min-w-[159px]">
            <CardContent className="p-0 px-1 pt-1">
                {/* Image */}
                <div className="relative h-[167px] w-full rounded-2xl">
                    <Image fill className="object-cover rounded-2xl" src={barbershop.imageUrl} alt={barbershop.name}/>

                    <Badge className="absolute top-2 left-2 space-x-1" variant={"secondary"}>
                        <Star size={12} className="fill-primary text-primary"/>
                        <span className="text-xs font-semibold">5,0</span>
                    </Badge>
                </div>

                {/* TEXTO */}
                <div className="px-1 py-3">
                    <h3 className="font-semibold truncate">{barbershop.name}</h3>
                    <p className="text-sm text-gray-400 truncate">{barbershop.address}</p>
                    <Button variant="secondary" className="w-full mt-3">
                        Reservar
                    </Button>
                </div>
            </CardContent>
        </Card>
     );
}
 
export default BarberShopItem;