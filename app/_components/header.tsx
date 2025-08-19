import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import SideBarSheet from "./sidebar-sheet";


const Header = () => {
    return ( 
        <Card>
            <CardContent className="p-5 flex flex-row items-center justify-between">
                <Image alt="FSW Barber" src="/logo.png" height={10} width={120}/>

                <Sheet>
                    <SheetTrigger asChild>
                        <Button size={"icon"} variant={'outline'}>
                            <MenuIcon/>
                        </Button>
                    </SheetTrigger>
                    <SideBarSheet/>
                </Sheet>
            </CardContent>
        </Card>
     );
}
 
export default Header;
