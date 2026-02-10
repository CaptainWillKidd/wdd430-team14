'use client';

import React from 'react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      
      {/* 1. HERO SECTION (Fixed) */}
      <div className="relative w-full py-32 md:py-48 flex items-center justify-center bg-stone-900 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://placehold.co/1200x800/292524/white?text=Artisan+Hands" 
            alt="Craftsmanship" 
            fill 
            className="object-cover opacity-60"
          />
          {/* Gradient Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/50 to-stone-900/30"></div>
        </div>

        {/* Content - Relative ensures it sits ON TOP of the image */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <span className="text-rose-400 font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-4 block">
            Our Story
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-lg">
            Connecting the world with <br className="hidden md:block"/> the hands that create.
          </h1>
          <p className="text-lg md:text-xl text-stone-200 leading-relaxed max-w-2xl mx-auto drop-shadow-md">
            Handcrafted Haven is a digital sanctuary for independent artisans and those who value the human touch in a mass-produced world.
          </p>
        </div>
      </div>

      {/* 2. MISSION & VALUES */}
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          
          {/* Text Side */}
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-6">
              Preserving the Art of Making
            </h2>
            <div className="space-y-6 text-stone-600 leading-relaxed text-lg">
              <p>
                In an era of fast fashion and automated assembly lines, we noticed a fading connection between the object and its creator. We wanted to build a bridge back to the workshop.
              </p>
              <p>
                Our mission is simple: <strong className="text-rose-800">Empower artisans to thrive.</strong> We provide the platform, the tools, and the audience so they can focus on what they do best—creating beauty.
              </p>
            </div>
            
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="border-l-4 border-rose-800 pl-4 py-1">
                <h3 className="font-bold text-stone-900 text-lg">Authenticity</h3>
                <p className="text-sm text-stone-500 mt-1">Every item is verified handmade.</p>
              </div>
              <div className="border-l-4 border-rose-800 pl-4 py-1">
                <h3 className="font-bold text-stone-900 text-lg">Sustainability</h3>
                <p className="text-sm text-stone-500 mt-1">Supporting local, ethical production.</p>
              </div>
            </div>
          </div>
          
          {/* Image Side */}
          <div className="order-1 md:order-2 relative h-[300px] md:h-[500px] w-full bg-stone-100 rounded-xl overflow-hidden shadow-xl md:rotate-2 hover:rotate-0 transition duration-500">
             <Image 
               src="https://placehold.co/600x800/881337/white?text=Potter+Wheel" 
               alt="Artisan at work" 
               fill 
               className="object-cover" 
             />
          </div>
        </div>
      </div>

      {/* 3. MEET THE TEAM */}
      <div className="bg-stone-50 py-24 border-t border-stone-200">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-4">Meet the Builders</h2>
          <p className="text-stone-500 max-w-2xl mx-auto mb-16 text-lg">
            The passionate team of developers and designers behind Handcrafted Haven.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">

            {/* Team Member 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 hover:shadow-md transition">
              <div className="w-24 h-24 rounded-full bg-stone-100 mx-auto mb-4 overflow-hidden relative border border-stone-200">
                <Image src="https://placehold.co/200x200/333/white?text=WC" alt="Willian Canuto" fill className="object-cover"/>
              </div>
              <h3 className="font-bold text-stone-900 text-lg">Willian Canuto</h3>
              <p className="text-rose-800 text-xs uppercase font-bold mt-1 tracking-wider">Backend Engineer</p>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 hover:shadow-md transition">
              <div className="w-24 h-24 rounded-full bg-stone-100 mx-auto mb-4 overflow-hidden relative border border-stone-200">
                <Image src="https://placehold.co/200x200/333/white?text=FS" alt="Folusho Sanni" fill className="object-cover"/>
              </div>
              <h3 className="font-bold text-stone-900 text-lg">Folusho Sanni</h3>
              <p className="text-rose-800 text-xs uppercase font-bold mt-1 tracking-wider">UI/UX Designer</p>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 hover:shadow-md transition">
              <div className="w-24 h-24 rounded-full bg-stone-100 mx-auto mb-4 overflow-hidden relative border border-stone-200">
                <Image src="https://placehold.co/200x200/333/white?text=SJ" alt="Samuel Jonathan" fill className="object-cover"/>
              </div>
              <h3 className="font-bold text-stone-900 text-lg">Samuel Jonathan</h3>
              <p className="text-rose-800 text-xs uppercase font-bold mt-1 tracking-wider">Project Manager</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}