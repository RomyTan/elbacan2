"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [activeTab, setActiveTab] = useState("Original");
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Sesuaikan data cerutu dengan ukuran milimeter/inci asli lo
  const cigarData = [
    { id: 1, name: "Churchill", type: "Original", length: "7\"", ring: "47", image: "/images/churchill.png" },
    { id: 2, name: "Toro", type: "Premium", length: "6\"", ring: "52", image: "/images/toro.png" },
    { id: 3, name: "Robusto", type: "Original", length: "5\"", ring: "50", image: "/images/robusto.png" },
    { id: 4, name: "Torpedo", type: "Premium", length: "6.1\"", ring: "52", image: "/images/torpedo.png" },
  ];

  const filteredCigars = cigarData.filter(cigar => cigar.type === activeTab);

  return (
    <main className="min-h-screen bg-black text-white font-sans">
      {/* HERO SECTION DENGAN VIBE KLASIK */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/hero-bg-classic.jpg" 
            alt="El Bacan Classic Heritage" 
            fill
            className="object-cover opacity-60"
            priority
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-widest mb-4">EL BACÁN</h1>
          <p className="text-xl md:text-2xl tracking-widest uppercase">Premium Cigars</p>
        </div>
      </section>

      {/* COLLECTION SECTION */}
      <section className="py-20 px-4 md:px-10 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light tracking-widest mb-8">THE COLLECTION</h2>
          
          {/* TAB ORIGINAL / PREMIUM */}
          <div className="flex justify-center gap-4 mb-10">
            <button 
              onClick={() => setActiveTab("Original")}
              className={`px-8 py-3 border border-white transition-all duration-300 ${activeTab === "Original" ? "bg-white text-black" : "bg-transparent text-white"}`}
            >
              ORIGINAL
            </button>
            <button 
              onClick={() => setActiveTab("Premium")}
              className={`px-8 py-3 border border-white transition-all duration-300 ${activeTab === "Premium" ? "bg-white text-black" : "bg-transparent text-white"}`}
            >
              PREMIUM
            </button>
          </div>
        </div>

        {/* GRID MOBILE (2 KOLOM) & DESKTOP (4 KOLOM) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {filteredCigars.map((cigar) => (
            <div 
              key={cigar.id} 
              className="cursor-pointer group relative flex flex-col items-center"
              onClick={() => setSelectedProduct(cigar)}
            >
              <div className="relative w-full aspect-[1/3] md:aspect-[1/4] mb-4 bg-zinc-900 rounded-lg overflow-hidden flex items-center justify-center p-4">
                <div className="w-8 h-full bg-[#5c4033] rounded-full shadow-xl"></div>
              </div>
              <h3 className="text-lg tracking-wider uppercase text-center">{cigar.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL POP-UP DETAIL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4">
          <div className="bg-zinc-900 border border-zinc-700 w-full max-w-md p-6 rounded-xl relative flex flex-col items-center">
            <button 
              className="absolute top-4 right-4 text-white hover:text-gray-400 text-2xl"
              onClick={() => setSelectedProduct(null)}
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold tracking-widest uppercase mb-2">{selectedProduct.name}</h3>
            <p className="text-gray-400 mb-6">{selectedProduct.type} Series</p>
            
            <div className="flex gap-8 text-center mb-6">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest">Length</p>
                <p className="text-lg">{selectedProduct.length}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest">Ring Gauge</p>
                <p className="text-lg">{selectedProduct.ring}</p>
              </div>
            </div>
            
            <button className="w-full py-3 bg-white text-black font-bold tracking-widest uppercase hover:bg-gray-200 transition-colors">
              Inquire Now
            </button>
          </div>
        </div>
      )}
    </main>
  );
}