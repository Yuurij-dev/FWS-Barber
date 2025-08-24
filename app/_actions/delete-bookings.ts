"use server"

import { revalidatePath } from "next/cache"
import { db } from "../_lib/prisma"

export const deleteBookings = async (bookingId: string) => {
  await db.booking.delete({
    where: {
      id: bookingId,
    },
  })
  revalidatePath("/bookigns")
}
