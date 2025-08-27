"use server"

import { db } from "../_lib/prisma"

interface SearchParams {
  title?: string
  service?: string
}

export const getBarberShopsByTitleOrService = async (
  searchParams: SearchParams,
) => {
  return await db.barbershop.findMany({
    where: {
      OR: [
        searchParams?.title
          ? {
              name: {
                contains: searchParams?.title,
                mode: "insensitive",
              },
            }
          : {},
        searchParams.service
          ? {
              services: {
                some: {
                  name: {
                    contains: searchParams?.service,
                    mode: "insensitive",
                  },
                },
              },
            }
          : {},
      ],
    },
  })
}
