import BarberShopItem from "../_components/barbershop-item"
import Header from "../_components/header"
import HeaderDesktop from "../_components/header-desktop"
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
      <HeaderDesktop />
      <div className="my-6 px-5 md:hidden">
        <Search />
      </div>

      <div className="mb-6 px-5 md:m-auto md:max-w-[1500px]">
        <h2 className="upercase mb-3 mt-6 text-xs font-bold text-gray-400 md:text-lg md:text-white">
          Resultados para &quot;{searchParams.title || searchParams.service}
          &quot;
        </h2>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {barberShops.map((barberShop) => (
            <BarberShopItem key={barberShop.id} barbershop={barberShop} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BarberShopsPage
