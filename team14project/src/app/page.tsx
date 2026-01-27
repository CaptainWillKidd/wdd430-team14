// components/LandingPage.js
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Mock data for the navigation and products
const navLinks = ['Home', 'Blog', 'Shop', 'Collection', 'Pages', 'Elements'];
const products = [
  { id: 1, name: 'Fashion Bag', price: '$120.00', image: '/images/fashion-bag.png' },
  { id: 2, name: 'Fashion Heels', price: '$250.00', image: '/images/fashion-heels.png' },
  { id: 3, name: 'Fashion Watches', price: '$320.00', image: '/images/fashion-watches.png' },
  { id: 4, name: 'Summer Jacket', price: '$180.00', image: '/images/summer-jacket.png' },
  { id: 5, name: 'Denim Shorts', price: '$45.00', image: '/images/denim-shorts.png' },
  { id: 6, name: 'Pink Bomber Jacket', price: '$85.00', image: '/images/pink-bomber-jacket.png' },
  { id: 7, name: 'Blue Sneakers', price: '$110.00', image: '/images/blue-sneakers.png' },
];

const PagePreview = ({ title, description, buttonText, image, showProducts, showNewArrival }) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden relative mb-16">
      {/* Top Navigation Bar */}
      <div className="flex justify-between items-center p-6 border-b border-gray-100">
        <div className="flex items-center">
          <h3 className="text-2xl font-bold text-gray-800 mr-8">Art MarketPlace</h3>
          <nav className="hidden md:flex space-x-6 text-gray-600 text-sm font-medium">
            {navLinks.map((link, index) => (
              <Link key={index} href="#" className="hover:text-coral-500 transition">
                {link}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search..."
              className="border border-gray-300 rounded-full py-2 px-4 text-sm focus:outline-none focus:border-coral-500"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute right-3 top-2.5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <button className="text-gray-600 hover:text-coral-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
          <button className="text-gray-600 hover:text-coral-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between p-6 md:p-16 bg-gray-50">
        <div className="md:w-1/2 space-y-6 z-10">
          <span className="text-coral-500 font-semibold text-sm tracking-wider uppercase">{description}</span>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">{title}</h1>
          {buttonText && (
            <Link href="#" className="inline-block bg-coral-500 text-white py-3 px-8 rounded-full font-medium hover:bg-coral-600 transition shadow-lg shadow-coral-500/30">
              {buttonText}
            </Link>
          )}
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0 relative">
          <div className="rounded-full bg-coral-100 w-[400px] h-[400px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0"></div>
          <Image src={image} alt={title} width={500} height={600} objectFit="contain" className="relative z-10" />
        </div>
      </div>

      {/* Optional New Arrival / Products Section */}
      {showNewArrival && (
        <div className="p-6 md:p-12 bg-white">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">New Arrival</h2>
            <div className="hidden md:flex space-x-4 text-gray-500 text-sm font-medium">
              {['All Products', 'Clothing', 'Bags', 'Shoes', 'Watches & Glasses'].map((category, index) => (
                <Link key={index} href="#" className="hover:text-coral-500 transition">
                  {category}
                </Link>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.slice(0, 3).map((product) => (
              <div key={product.id} className="group">
                <div className="bg-gray-100 rounded-xl overflow-hidden relative">
                  <Image src={product.image} alt={product.name} width={300} height={300} objectFit="cover" className="w-full h-64 object-center transition-transform duration-300 group-hover:scale-105" />
                  <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="bg-white p-2 rounded-full shadow-md text-gray-600 hover:text-coral-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                    <button className="bg-white p-2 rounded-full shadow-md text-gray-600 hover:text-coral-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-coral-500 transition">{product.name}</h3>
                  <p className="text-coral-500 font-medium">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Optional Products Section */}
      {showProducts && (
        <div className="p-6 md:p-12 bg-white">
          <div className="flex justify-center space-x-8 text-gray-500 text-sm font-medium mb-8">
            {['All Products', 'Clothing', 'Bags', 'Shoes', 'Watches & Glasses'].map((category, index) => (
              <Link key={index} href="#" className="hover:text-coral-500 transition">
                {category}
              </Link>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {products.slice(3).map((product) => (
              <div key={product.id} className="group">
                <div className="bg-gray-100 rounded-xl overflow-hidden relative">
                  <Image src={product.image} alt={product.name} width={300} height={300} objectFit="cover" className="w-full h-64 object-center transition-transform duration-300 group-hover:scale-105" />
                  <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="bg-white p-2 rounded-full shadow-md text-gray-600 hover:text-coral-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                    <button className="bg-white p-2 rounded-full shadow-md text-gray-600 hover:text-coral-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-coral-500 transition">{product.name}</h3>
                  <p className="text-coral-500 font-medium">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-coral-400 to-coral-500 p-8 flex flex-col items-center">
      {/* Header */}
      <div className="text-center text-white mb-16">
        <h1 className="text-5xl font-bold mb-4">Art MarketPlace</h1>
        <p className="text-2xl font-light">Curated. Collectible. Yours.</p>
      </div>

      {/* Page Previews */}
      <div className="w-full max-w-6xl">
        {/* First Preview */}
        <PagePreview
          title="New Product Collection"
          description="SPECIAL PRICE"
          buttonText="DISCOVER MORE"
          image="/images/hero-man.png"
        />

        {/* Second Preview with New Arrivals */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white text-center mb-8">Our Story</h2>
          <PagePreview
            title="SUMMER '23 COLLECTIONS"
            description="NEW TRENDING STYLE"
            image="/images/hero-woman.png"
            showNewArrival={true}
          />
        </div>

        {/* Third Preview with Products Grid */}
        <PagePreview
          title="FASHION THAT EXISTS IN EVERYTHING"
          description="Special Offer Discount"
          image="/images/hero-handbag.png"
          showProducts={true}
        />
      </div>
    </div>
  );
};

export default LandingPage;