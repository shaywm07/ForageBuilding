import { getProducts } from '@/actions/product'
import ProductGrid from '@/components/ProductGrid'

export const dynamic = 'force-dynamic'

export default async function Home() {
  let products: any[] = []
  try {
    products = await getProducts()
  } catch {
    products = []
  }
  return <ProductGrid products={products} />
}