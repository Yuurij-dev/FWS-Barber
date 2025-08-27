"use server"

import { db } from "../_lib/prisma"

export const getBarberShops = async () => {
  return await db.barbershop.findMany({})
}
