"use client"
import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { CalendarIcon, MenuIcon, User } from "lucide-react"
import { Sheet, SheetTrigger } from "./ui/sheet"
import { Button } from "./ui/button"
import SideBarSheet from "./sidebar-sheet"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import SignInDialog from "./sign-in-dialog"

const Header = () => {
  const { data } = useSession()
  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between p-5 xl:m-auto xl:max-w-[1200px] xl:gap-5 2xl:max-w-[1400px]">
        <Link href={"/"}>
          <Image alt="FSW Barber" src="/logo.png" height={10} width={120} />
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button size={"icon"} variant={"outline"} className="xl:hidden">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SideBarSheet />
        </Sheet>

        {data?.user ? (
          <Button
            className="hidden xl:flex"
            variant={"ghost"}
            size={"default"}
            asChild
          >
            <Link href={"/bookings"}>
              <CalendarIcon size={18} />
              Agendamentos
            </Link>
          </Button>
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

export default Header
