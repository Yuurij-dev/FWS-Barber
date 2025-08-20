"use client"

import { Button } from "./ui/button";
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon,  } from "lucide-react";
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { quickSearchOptions } from "../_contants/search";
// import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import Image from "next/image";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "./ui/avatar";

const SideBarSheet = () => {

    const {data} = useSession()
    const handleLoginWithGoogleClick = () => signIn("google")
    const handleLogoutClick = () => signOut()

    return ( 
            <SheetContent className="overflowy-y-auto">
                <SheetHeader>
                    <SheetTitle className="text-left">Menu</SheetTitle>
                </SheetHeader>
                
                <div className="flex items-center gap-3 justify-between border-b border-solid py-5">
                    
                    
                    {data?.user ? (
                    <div className="flex items-center gap-2">
                        <Avatar>
                            <AvatarImage src={data.user.image?? ""} alt="image user"/>
                        </Avatar>

                        <div>
                            <p className="font-bold">{data.user.name}</p>
                            <p className="text-xs">{data.user.email}</p>
                        </div> 
                    </div>
                    ): (
                        <>
                        <h2 className="font-bold">Olá, Faça seu login!</h2>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button size={'icon'}>
                                    <LogInIcon/>
                                </Button>
                            </DialogTrigger>

                            <DialogContent className="w-[90%]">
                                <DialogHeader>
                                    <DialogTitle>
                                        Faça login na plataforma
                                    </DialogTitle>

                                    <DialogDescription>
                                        Conecte-se usando sua conta do Google.
                                    </DialogDescription>

                                </DialogHeader>

                                <Button variant={'outline'} className="gap-1 font-bold" onClick={handleLoginWithGoogleClick}>
                                    <Image src={"/google.svg"} alt="Fazer login com o google" width={18} height={18}/>
                                    Google
                                </Button>
                            </DialogContent>
                        </Dialog>
                        </>
                    )}
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
                        <SheetClose asChild key={option.title}>
                            <Button className="justify-start gap-2" variant="ghost" asChild>
                                <Link href={`/barbershops?service=${option.title}`} >
                                    <Image src={option.imageUrl} alt={option.title} width={18} height={18}/>
                                    {option.title}
                                </Link>
                            </Button>
                        </SheetClose>
                    ))}
                </div>

                <div className="flex flex-col gap-2 py-5 border-b border-solid">
                    <Button variant="ghost" className="justify-start gap-2" onClick={handleLogoutClick}>
                        <LogOutIcon size={18}/>
                        Sair da conta
                    </Button>
                </div>
            </SheetContent>
    );
}
 
export default SideBarSheet;