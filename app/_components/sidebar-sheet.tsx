import { Button } from "./ui/button";
import { CalendarIcon, HomeIcon, LogOutIcon,  } from "lucide-react";
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { quickSearchOptions } from "../_contants/search";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import Image from "next/image";

const SideBarSheet = () => {
    return ( 
            <SheetContent className="overflowy-y-auto">
                <SheetHeader>
                    <SheetTitle className="text-left">Menu</SheetTitle>
                </SheetHeader>
                
                <div className="flex items-center gap-3 border-b border-solid py-5">
                    <Avatar>
                        <AvatarImage src="https://plus.unsplash.com/premium_photo-1755105194454-21564954e25e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
                    </Avatar>

                    <div>
                        <p className="font-bold">Yuri de Jesus</p>
                        <p className="text-xs">yuri@email.com</p>
                    </div>
                </div>

                <div className="flex flex-col gap-2 py-5 border-b border-solid">
                    <SheetClose asChild>
                        <Button className="justify-start gap-2" variant="ghost" asChild>
                            <Link href={"/"}>
                                <HomeIcon size={18}/>
                                Início
                            </Link>
                        </Button>
                    </SheetClose>

                    <Button className="justify-start gap-2" variant="ghost">
                        <CalendarIcon size={18}/>
                        Agendamentos
                    </Button>
                </div>

                <div className="flex flex-col gap-2 py-5 border-b border-solid">
                    {quickSearchOptions.map((option) =>(
                        <Button className="justify-start gap-2" variant="ghost" key={option.title}>
                            <Image src={option.imageUrl} alt={option.title} width={18} height={18}/>
                            {option.title}
                        </Button>
                    ))}
                </div>

                <div className="flex flex-col gap-2 py-5 border-b border-solid">
                    <Button variant="ghost" className="justify-start gap-2">
                        <LogOutIcon size={18}/>
                        Sair da conta
                    </Button>
                </div>
            </SheetContent>
    );
}
 
export default SideBarSheet;