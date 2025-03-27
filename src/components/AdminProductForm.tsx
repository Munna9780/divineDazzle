import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function AdminProductForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const formData = new FormData(e.currentTarget);
      
      if (!imageFile) {
        throw new Error('Please select an image');
      }

      // Upload image to Supabase Storage
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(fileName, imageFile);

      if (uploadError) throw uploadError;

      // Get the public URL of the uploaded image
      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(fileName);

      // Insert product data into the database
      const { error: insertError } = await supabase
        .from('products')
        .insert({
          title: formData.get('title'),
          description: formData.get('description'),
          width: Number(formData.get('width')),
          height: Number(formData.get('height')),
          price: Number(formData.get('price')),
          affiliate_link: formData.get('affiliate_link'),
          image_url: publicUrl,
          user_id: (await supabase.auth.getUser()).data.user?.id
        });

      if (insertError) throw insertError;

      setMessage({ type: 'success', text: 'Product added successfully!' });
      e.currentTarget.reset();
      setImageFile(null);
      setPreviewUrl(null);
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Failed to add product' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-[#2C3E50] mb-6">Add New Product</h2>

      {message && (
        <div className={`p-4 rounded-lg mb-6 ${
          message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-[#2C3E50]" htmlFor="image">
            Product Image
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-[#3498DB]" />
              <div className="flex text-sm text-gray-600">
                <label htmlFor="image" className="relative cursor-pointer rounded-md font-medium text-[#3498DB] hover:text-[#2980B9]">
                  <span>Upload a file</span>
                  <input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
          {previewUrl && (
            <div className="mt-4 relative">
              <img src={previewUrl} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
              <button
                type="button"
                onClick={() => {
                  setImageFile(null);
                  setPreviewUrl(null);
                }}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2C3E50]" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3498DB] focus:ring focus:ring-[#3498DB] focus:ring-opacity-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2C3E50]" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3498DB] focus:ring focus:ring-[#3498DB] focus:ring-opacity-50"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#2C3E50]" htmlFor="width">
              Width (inches)
            </label>
            <input
              type="number"
              id="width"
              name="width"
              required
              min="1"
              step="0.1"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3498DB] focus:ring focus:ring-[#3498DB] focus:ring-opacity-50"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#2C3E50]" htmlFor="height">
              Height (inches)
            </label>
            <input
              type="number"
              id="height"
              name="height"
              required
              min="1"
              step="0.1"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3498DB] focus:ring focus:ring-[#3498DB] focus:ring-opacity-50"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2C3E50]" htmlFor="price">
            Price ($)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            required
            min="0.01"
            step="0.01"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3498DB] focus:ring focus:ring-[#3498DB] focus:ring-opacity-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2C3E50]" htmlFor="affiliate_link">
            Amazon Affiliate Link
          </label>
          <input
            type="url"
            id="affiliate_link"
            name="affiliate_link"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3498DB] focus:ring focus:ring-[#3498DB] focus:ring-opacity-50"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#3498DB] text-white py-3 px-6 rounded-lg hover:bg-[#2980B9] transition-colors disabled:opacity-50"
        >
          {loading ? 'Adding Product...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
}