import React, { useEffect, useState } from 'react';
import { ExternalLink, Loader } from 'lucide-react';
import { Product } from '../types';
import { supabase } from '../lib/supabase';

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setProducts(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader className="h-12 w-12 text-[#3498DB] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-8">
        {error}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="aspect-[3/4] relative overflow-hidden">
              <img
                src={product.image_url}
                alt={product.title}
                className="w-full h-full object-cover"
                onClick={() => setSelectedProduct(product)}
              />
              <div className="product-info">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Dimensions: {product.width}" × {product.height}"</p>
                    <p className="text-xl font-bold text-[#2C3E50]">${product.price.toFixed(2)}</p>
                  </div>
                  {product.affiliate_link && (
                    <a
                      href={product.affiliate_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-[#3498DB] text-white rounded-lg hover:bg-[#2980B9] transition-colors"
                    >
                      Buy Now
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setSelectedProduct(null)}>
          <div className="max-w-4xl w-full bg-white rounded-xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="aspect-[16/9] relative">
              <img
                src={selectedProduct.image_url}
                alt={selectedProduct.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">{selectedProduct.title}</h3>
              <p className="text-gray-600 mb-6">{selectedProduct.description}</p>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500">Dimensions: {selectedProduct.width}" × {selectedProduct.height}"</p>
                  <p className="text-3xl font-bold text-[#2C3E50]">${selectedProduct.price.toFixed(2)}</p>
                </div>
                {selectedProduct.affiliate_link && (
                  <a
                    href={selectedProduct.affiliate_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-[#3498DB] text-white rounded-lg hover:bg-[#2980B9] transition-colors"
                  >
                    Purchase Now
                    <ExternalLink className="ml-2 h-5 w-5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}