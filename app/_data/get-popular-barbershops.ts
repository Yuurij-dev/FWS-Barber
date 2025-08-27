"use server"

import { db } from "../_lib/prisma"

export const getPopularBarberShops = async () => {
  return await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })
}
