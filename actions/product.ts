'use server'
import WooCommerceRestApi from 'woocommerce-rest-ts-api'

let _wc: WooCommerceRestApi | null = null
function wc() {
  if (!_wc) {
    _wc = new WooCommerceRestApi({
      url: process.env.WORDPRESS_URL || 'http://meeeezy.local/',
      consumerKey: process.env.WC_CONSUMER_KEY as string,
      consumerSecret: process.env.WC_CONSUMER_SECRET as string,
      version: 'wc/v3',
    })
  }
  return _wc
}

export const getProducts = async () => {
  const products = await wc().get('products')
  return products.data
}

export const getProduct = async (id: string) => {
  const product = await wc().get(`products/${parseInt(id)}`)
  return product.data
}