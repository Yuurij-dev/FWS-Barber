import { Prisma } from "@prisma/client"
import { ButtonCancelBooking } from "./button-cancel-booking"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: { service: { include: { barbershop: true } } }
  }>
  onSuccess?: () => void
}

export const DialogCancelBooking = ({
  booking,
  onSuccess,
}: BookingItemProps) => {
  return (
    <Dialog>
      <DialogTrigger className="w-full" asChild>
        <Button className="w-full" variant={"destructive"}>
          Cancelar reserva
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90vw] max-w-[350px]">
        <DialogHeader className="md:flex md:flex-col md:items-center md:justify-center md:text-center">
          <DialogTitle>Cancelar reserva?</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja cancelar sua reserva, essa ação é
            irreversível!
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex flex-row gap-3">
          <DialogClose asChild>
            <Button className="w-full" variant={"secondary"}>
              Voltar
            </Button>
          </DialogClose>

          <ButtonCancelBooking booking={booking} onSuccess={onSuccess} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
