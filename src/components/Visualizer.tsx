import React, { useState } from 'react';
import { standardSizes } from '../types';

export default function Visualizer() {
  const [selectedSize, setSelectedSize] = useState(standardSizes[0]);
  const [customWidth, setCustomWidth] = useState('');
  const [customHeight, setCustomHeight] = useState('');

  const basePrice = 99.99;
  const pricePerSquareInch = 0.1;

  const calculatePrice = (width: number, height: number) => {
    const area = width * height;
    return basePrice + (area * pricePerSquareInch);
  };

  return (
    <section id="visualizer" className="py-16 bg-[#ECF0F1]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#2C3E50] mb-8">
          Visualize Your Art
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-[#2C3E50] mb-4">
                Standard Sizes
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {standardSizes.map((size) => (
                  <button
                    key={size.name}
                    onClick={() => setSelectedSize(size)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedSize.name === size.name
                        ? 'border-[#3498DB] bg-[#EBF5FB]'
                        : 'border-gray-200 hover:border-[#3498DB]'
                    }`}
                  >
                    <div className="text-lg font-medium text-[#2C3E50]">
                      {size.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      ${calculatePrice(size.width, size.height).toFixed(2)}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-[#2C3E50] mb-4">
                Custom Size
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#2C3E50]">
                    Width (inches)
                  </label>
                  <input
                    type="number"
                    value={customWidth}
                    onChange={(e) => setCustomWidth(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3498DB] focus:ring focus:ring-[#3498DB] focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2C3E50]">
                    Height (inches)
                  </label>
                  <input
                    type="number"
                    value={customHeight}
                    onChange={(e) => setCustomHeight(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3498DB] focus:ring focus:ring-[#3498DB] focus:ring-opacity-50"
                  />
                </div>
              </div>
              {customWidth && customHeight && (
                <div className="mt-4 text-right text-lg font-medium text-[#2C3E50]">
                  Estimated Price: ${calculatePrice(Number(customWidth), Number(customHeight)).toFixed(2)}
                </div>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="aspect-video relative overflow-hidden rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
                alt="Room preview"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-4 border-white shadow-lg"
                style={{
                  width: `${selectedSize.width * 10}px`,
                  height: `${selectedSize.height * 10}px`,
                  aspectRatio: `${selectedSize.width} / ${selectedSize.height}`,
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1549887534-1541e9326642?auto=format&fit=crop&w=800&q=80"
                  alt="Selected artwork"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-500 text-center">
              Drag and drop your artwork to visualize it in the room
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}