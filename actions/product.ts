'use server'

const fallbackProducts = [
  { id: 1, name: 'Hoodie One', price: '59.00', description: '<p>A premium hoodie crafted for comfort and style.</p>', images: [{ src: '/01.png', alt: 'Hoodie One' }] },
  { id: 2, name: 'Hoodie Two', price: '64.00', description: '<p>Heavyweight fleece with a relaxed fit.</p>', images: [{ src: '/02.png', alt: 'Hoodie Two' }] },
  { id: 3, name: 'Hoodie Three', price: '69.00', description: '<p>Limited edition drop with embroidered logo.</p>', images: [{ src: '/03.png', alt: 'Hoodie Three' }] },
  { id: 4, name: 'Hoodie Four', price: '59.00', description: '<p>Classic pullover in heather grey.</p>', images: [{ src: '/04.png', alt: 'Hoodie Four' }] },
  { id: 5, name: 'Hoodie Five', price: '72.00', description: '<p>Oversized silhouette with brushed interior.</p>', images: [{ src: '/05.png', alt: 'Hoodie Five' }] },
  { id: 6, name: 'Hoodie Six', price: '65.00', description: '<p>Zip-up hoodie in midnight black.</p>', images: [{ src: '/06.png', alt: 'Hoodie Six' }] },
  { id: 7, name: 'Hoodie Seven', price: '78.00', description: '<p>Premium cotton blend with kangaroo pocket.</p>', images: [{ src: '/07.png', alt: 'Hoodie Seven' }] },
  { id: 8, name: 'Hoodie Eight', price: '62.00', description: '<p>Lightweight layer for transitional weather.</p>', images: [{ src: '/08.png', alt: 'Hoodie Eight' }] },
]

export const getProducts = async () => {
  return fallbackProducts
}

export const getProduct = async (id: string) => {
  return fallbackProducts.find((p) => p.id === parseInt(id)) ?? fallbackProducts[0]
}
