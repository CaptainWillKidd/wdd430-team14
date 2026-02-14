'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Limit file size to 1MB to prevent database issues
      if (file.size > 1024 * 1024) {
        alert("File is too big! Please choose an image under 1MB.");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    
    const data = {
      name: formData.get('name'),
      description: formData.get('description'),
      price: formData.get('price'),
      category: formData.get('category'),
      stock: formData.get('stock'),
      image_url: imagePreview, 
    };

    try {
      const res = await fetch('/api/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Failed to add product');

      router.push('/dashboard/products');
      router.refresh(); 
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-stone-900">Add New Product</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl border border-stone-200 shadow-sm">
        
        {/* Image Upload Section */}
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">Product Image</label>
          <div className="flex items-center gap-4">
            <div className="relative w-24 h-24 bg-stone-100 rounded-lg overflow-hidden border border-stone-300 flex items-center justify-center">
              {imagePreview ? (
                <Image src={imagePreview} alt="Preview" fill className="object-cover" />
              ) : (
                <span className="text-stone-400 text-xs text-center px-2">No image</span>
              )}
            </div>
            <input 
              type="file" 
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-stone-900 file:text-white hover:file:bg-stone-800"
            />
          </div>
          <p className="text-xs text-stone-500 mt-1">Max file size: 1MB</p>
        </div>

        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Product Name</label>
          <input 
            name="name" 
            required 
            type="text" 
            className="w-full border border-stone-300 rounded-lg p-2 focus:ring-2 focus:ring-stone-900 focus:outline-none"
            placeholder="e.g. Handmade Clay Vase"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Description</label>
          <textarea 
            name="description" 
            required 
            rows={4} 
            className="w-full border border-stone-300 rounded-lg p-2 focus:ring-2 focus:ring-stone-900 focus:outline-none"
            placeholder="Tell the story behind this piece..."
          />
        </div>

        {/* Price & Stock Row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Price ($)</label>
            <input 
              name="price" 
              required 
              type="number" 
              step="0.01" 
              min="0"
              className="w-full border border-stone-300 rounded-lg p-2 focus:ring-2 focus:ring-stone-900 focus:outline-none"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Stock</label>
            <input 
              name="stock" 
              required 
              type="number" 
              min="1"
              className="w-full border border-stone-300 rounded-lg p-2 focus:ring-2 focus:ring-stone-900 focus:outline-none"
              placeholder="1"
            />
          </div>
        </div>

        {/* Updated Categories */}
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Category</label>
          <select 
            name="category" 
            className="w-full border border-stone-300 rounded-lg p-2 focus:ring-2 focus:ring-stone-900 focus:outline-none bg-white"
          >
            <option value="Classical">Classical</option>
            <option value="Modern">Modern</option>
            <option value="Media Focus">Media Focus</option>
            <option value="Decorative">Decorative</option>
          </select>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-stone-900 text-white py-3 rounded-lg font-bold hover:bg-stone-800 transition disabled:opacity-50"
        >
          {loading ? 'Adding...' : 'Publish Product'}
        </button>
      </form>
    </div>
  );
}