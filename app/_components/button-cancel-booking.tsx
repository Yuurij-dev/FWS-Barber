import { Prisma } from "@prisma/client"
import { deleteBookings } from "../_actions/delete-bookings"
import { Button } from "./ui/button"
import { toast } from "sonner"
import { DialogClose } from "@radix-ui/react-dialog"

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true
        }
      }
    }
  }>
}

interface ButtonCancelBookingProps extends BookingItemProps {
  onSuccess?: () => void
}

export const ButtonCancelBooking = ({
  booking,
  onSuccess,
}: ButtonCancelBookingProps) => {
  const handleCancelBooking = async () => {
    try {
      await deleteBookings(booking.id)
      toast.success("Reserva cancelada com sucesso!")
      onSuccess?.()
    } catch (err) {
      console.error(err)
      toast.error("Erro ao cancelar resarva. Tente novamente.")
    }
  }
  return (
    <DialogClose asChild>
      <Button
        className="w-full"
        variant={"destructive"}
        onClick={handleCancelBooking}
      >
        Confirmar
      </Button>
    </DialogClose>
  )
}
