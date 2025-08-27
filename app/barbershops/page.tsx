import BarberShopItem from "../_components/barbershop-item"
import Header from "../_components/header"
import Search from "../_components/search"
import { getBarberShopsByTitleOrService } from "../_data/get-barbershops-by-title-or-service"

interface BarberShopProps {
  searchParams: {
    title?: string
    service?: string
  }
}

const BarberShopsPage = async ({ searchParams }: BarberShopProps) => {
  const barberShops = await getBarberShopsByTitleOrService(searchParams)
  return (
    <div>
      <Header />
      <div className="my-6 px-5">
        <Search />
      </div>

      <div className="mb-6 px-5">
        <h2 className="upercase mb-3 mt-6 text-xs font-bold text-gray-400">
          Resultados para {searchParams.title || searchParams.service}
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {barberShops.map((barberShop) => (
            <BarberShopItem key={barberShop.id} barbershop={barberShop} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BarberShopsPage
