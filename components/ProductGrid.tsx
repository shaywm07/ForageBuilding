'use client'
import { navbarData } from '@/lib/data'
import { Minus, MoreVertical, Plus, PlusIcon, ShoppingCart, X } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'
import { useCart } from '@/hooks/use-cart'
import Image from 'next/image'
import Checkout from './checkout'

type Props = {
  products: any[]
}

const ProductGrid = ({ products }: Props) => {
  const [toggle, setToggle] = useState(false)
  const [gridIndex, setGridIndex] = useState(0) // Index for cycling through grid sizes

  const {
    isOpen,
    setIsOpen,
    items: cartItems,
    updateQuantity,
    removeItem: removeFromCart,
    cartTotal,
  } = useCart()

  // Grid sizes in the desired cycling pattern: 5 → 4 → 3 → 4 → 5 → 4 → 3 → 4 → 5...
  const gridSizes = [5, 4, 3, 4, 5, 4, 3, 4]
  const currentGridSize = gridSizes[gridIndex]

  // Cycle through grid sizes: 5 → 4 → 3 → 4 → 5 → 4 → 3 → 4 → 5...
  const cycleGridSize = () => {
    setGridIndex(prev => (prev + 1) % gridSizes.length)
  }

  // Get grid classes based on current size
  const getGridClasses = () => {
    const baseClasses = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-40 transition-all duration-500 ease-in-out"
    
    switch (currentGridSize) {
      case 3: return `${baseClasses} lg:grid-cols-3`
      case 4: return `${baseClasses} lg:grid-cols-4`
      case 5: return `${baseClasses} lg:grid-cols-5`
      default: return `${baseClasses} lg:grid-cols-5`
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-10 bg-white ">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className='flex gap-4 items-center'>
            <button
              onClick={cycleGridSize}
              title={`Toggle grid size (Current: ${currentGridSize} columns)`}
            >
              <PlusIcon className="h-5 w-5 text-black hover:text-gray-600 transition-colors" />
              <span className="sr-only">Toggle grid size</span>
            </button>
            <button
              className="p-2"
              onClick={() => setToggle(!toggle)}
            >
              {toggle ? (
                <X className="h-6 w-6 font-bold " />
              ) : (
                <MoreVertical className="h-6 w-6 hover:text-gray-600 transition-colors" />
              )}
              <span className="sr-only">Menu</span>
            </button>
          </div>
          
          {toggle && (
            <div className="flex gap-x-10 items-center">
              {navbarData.map((item) => (
                <Link
                  href={item.link}
                  key={item.idx}
                  className="text-lg font-medium text-primary hover:text-gray-600 transition-colors"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          )}

          <Sheet
            open={isOpen}
            onOpenChange={setIsOpen}
          >
            <SheetTrigger asChild>
              <button className="text-lg font-medium flex items-center gap-2">
                <div className='flex gap-2 items-center justify-between'>
                  <span>Cart</span>
                  <video src="/bag.mp4" muted autoPlay loop className='h-6'></video>
                </div>
                {cartItems.length > 0 && (
                  <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium bg-black text-white rounded-full">
                    {cartItems.reduce(
                      (total, item) => total + item.quantity,
                      0
                    )}
                  </span>
                )}
              </button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle>CART</SheetTitle>
              </SheetHeader>
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[50vh] mt-6">
                  <video src="/cart.mp4" muted autoPlay loop className='h-20 mb-4'></video>
                  <p className="text-gray-800">Your cart is empty..</p>
                </div>
              ) : (
                <div className="flex flex-col h-full">
                  <div className="flex-1 overflow-auto p-6">
                    <ul className="space-y-6">
                      {cartItems.map((item) => (
                        <li
                          key={item.id}
                          className="flex gap-4"
                        >
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                            <Image
                              src={item.images?.[0]?.src || '/placeholder.svg'}
                              alt={item.name}
                              width={96}
                              height={96}
                              className="h-full w-full object-contain p-2"
                            />
                          </div>
                          <div className="flex flex-1 flex-col">
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>{item.name}</h3>
                              <p className="ml-4">${item.price}</p>
                            </div>
                            <div className="flex items-center mt-2">
                              <button
                                className="rounded-md border p-1"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="mx-2 w-8 text-center">
                                {item.quantity}
                              </span>
                              <button
                                className="rounded-md border p-1"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                              >
                                <Plus className="h-4 w-4" />
                              </button>

                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="ml-auto text-gray-400 hover:text-gray-500"
                              >
                                <X className="h-5 w-5" />
                                <span className="sr-only">Remove</span>
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="border-t border-gray-200 p-6">
                    <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                      <p>Subtotal</p>
                      <p>${cartTotal}</p>
                    </div>
                    <Checkout />
                  </div>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className={getGridClasses()}>
          {products.map((product, index) => (
            <Link
              href={`/product/${product.id}`}
              key={index}
              className="flex flex-col group relative"
            >
              <div className="aspect-square rounded-md overflow-hidden">
                <Image
                  src={product.images?.[0]?.src || '/placeholder.svg'}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="group-hover:opacity-100 opacity-0 flex flex-col justify-end">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-base font-semibold text-primary">
                    {product.name}
                  </h3>

                  <p className="text-base font-semibold text-primary">
                    ${product.price}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}

export default ProductGrid