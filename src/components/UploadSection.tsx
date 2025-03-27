import React, { useState, useCallback } from 'react';
import { Upload, Image as ImageIcon, X } from 'lucide-react';

export default function UploadSection() {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(prev => [...prev, ...droppedFiles]);
  }, []);

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <section id="upload" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#2C3E50] mb-8">Upload Your Artwork</h2>
        
        <div className="max-w-2xl mx-auto">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center ${
              dragActive ? 'border-[#3498DB] bg-[#EBF5FB]' : 'border-gray-300'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto h-12 w-12 text-[#3498DB] mb-4" />
            <p className="text-lg text-[#2C3E50]">
              Drag and drop your images here, or{' '}
              <button className="text-[#3498DB] hover:text-[#2980B9]">browse</button>
            </p>
            <p className="text-sm text-gray-500 mt-2">Supported formats: PNG, JPG, JPEG</p>
          </div>

          {files.length > 0 && (
            <div className="mt-8 space-y-4">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <ImageIcon className="h-6 w-6 text-[#3498DB]" />
                    <span className="text-[#2C3E50]">{file.name}</span>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <form className="mt-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#2C3E50]" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                id="title"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3498DB] focus:ring focus:ring-[#3498DB] focus:ring-opacity-50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#2C3E50]" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3498DB] focus:ring focus:ring-[#3498DB] focus:ring-opacity-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2C3E50]" htmlFor="affiliate-link">
                Amazon Affiliate Link
              </label>
              <input
                type="url"
                id="affiliate-link"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3498DB] focus:ring focus:ring-[#3498DB] focus:ring-opacity-50"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#3498DB] text-white py-3 px-6 rounded-lg hover:bg-[#2980B9] transition-colors"
            >
              Upload Product
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}