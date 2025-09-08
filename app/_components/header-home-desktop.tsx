"use client"
import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { CalendarIcon, MenuIcon, User } from "lucide-react"
import { Sheet, SheetTrigger } from "./ui/sheet"
import { Button } from "./ui/button"
import SideBarSheet from "./sidebar-sheet"
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import SignInDialog from "./sign-in-dialog"
import { Avatar, AvatarImage } from "./ui/avatar"

const HeaderHomeDesktop = () => {
  const { data } = useSession()
  const handleLogoutClick = () => signOut()

  return (
    <Card className="hidden w-full rounded-none border-l-0 bg-[#141518] md:block">
      <CardContent className="flex w-full flex-row items-center justify-between gap-5 p-5 xl:m-auto xl:max-w-[1500px]">
        <div className="flex w-full items-center gap-5">
          <Link href={"/"}>
            <Image alt="FSW Barber" src="/logo.png" height={10} width={120} />
          </Link>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button size={"icon"} variant={"outline"} className="xl:hidden">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SideBarSheet />
        </Sheet>

        {data?.user ? (
          <div className="hidden items-center gap-4 xl:flex">
            <Button variant={"ghost"} size={"default"} asChild>
              <Link href={"/bookings"}>
                <CalendarIcon size={18} />
                Agendamentos
              </Link>
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <div className="hidden items-center gap-2 xl:flex">
                  <Avatar>
                    <AvatarImage
                      src={data.user.image ?? undefined}
                      alt="User image"
                    />
                  </Avatar>
                  <h2 className="truncate font-semibold">{data.user.name}</h2>
                </div>
              </DialogTrigger>

              <DialogContent className="w-[90vw] max-w-sm rounded-2xl p-6 text-center">
                <DialogHeader className="items-center justify-center">
                  <DialogTitle className="text-lg font-semibold">
                    Sair
                  </DialogTitle>
                  <DialogDescription className="text-sm text-gray-400">
                    Deseja sair da plataforma?
                  </DialogDescription>
                </DialogHeader>

                <div className="mt-4 flex w-full gap-3">
                  <Button className="flex-1" variant="secondary">
                    Cancelar
                  </Button>
                  <Button
                    className="flex-1"
                    variant="destructive"
                    onClick={handleLogoutClick}
                  >
                    Sair
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="hidden xl:flex"
                variant={"default"}
                size={"default"}
              >
                <User size={18} />
                Faça Login
              </Button>
            </DialogTrigger>

            <DialogContent className="w-[90%]">
              <SignInDialog />
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  )
}

export default HeaderHomeDesktop
