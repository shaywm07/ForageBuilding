import { getProducts } from '@/actions/product'
import ProductGrid from '@/components/ProductGrid'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const products = await getProducts()
  return <ProductGrid products={products} />
}