"use client"

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from 'next/navigation';

export default function CustomOrderPage() {
  const [selectedArtStyle, setSelectedArtStyle] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).slice(0, 2); // Only allow 2 images
      setImages(files);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (!phone.trim() || images.length < 2) {
      setError("Please provide a phone number and upload two reference images.");
      return;
    }
    const form = event.currentTarget;
    // Convert images to base64
    const imageBase64s = await Promise.all(images.map(file => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }));
    const formData = {
      name: (form[0] as HTMLInputElement).value,
      email: (form[1] as HTMLInputElement).value,
      phone,
      artStyle: selectedArtStyle,
      size: selectedSize,
      description: (form[6] as HTMLTextAreaElement).value,
      images: imageBase64s,
    };
    const response = await fetch('/api/save-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const result = await response.json();
    if (result.message === 'Order saved successfully!') {
      router.push('/custom-order/thankyou');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container px-4 py-12 mx-auto md:px-6">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-4 text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            Custom Artwork Commission
          </h1>
          <p className="mb-8 text-lg text-center text-gray-600 dark:text-gray-300">
            Bring your vision to life with a custom piece of art. Fill out the form below to get started.
          </p>

          <div className="p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800 md:p-8 animate-fade-in">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="Your name"
                    required
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    required
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="tel"
                    placeholder="Your phone number"
                    required
                    className="w-full"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Preferred Art Style
                </label>
                <Select value={selectedArtStyle} onValueChange={setSelectedArtStyle}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select art style" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                    <SelectItem value="abstract" className="focus:bg-gray-100 dark:focus:bg-gray-700">charchole portrait</SelectItem>
                    <SelectItem value="realism" className="focus:bg-gray-100 dark:focus:bg-gray-700">Pencil Portrait</SelectItem>
                    <SelectItem value="impressionism" className="focus:bg-gray-100 dark:focus:bg-gray-700">Water Colour Portrait</SelectItem>
                    <SelectItem value="surrealism" className="focus:bg-gray-100 dark:focus:bg-gray-700">Acrylic Portrait</SelectItem>
                    <SelectItem value="minimalism" className="focus:bg-gray-100 dark:focus:bg-gray-700">Oil Colour Portrait</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Canvas Size
                </label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select canvas size" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                    <SelectItem value="small" className="focus:bg-gray-100 dark:focus:bg-gray-700">Small A4</SelectItem>
                    <SelectItem value="medium" className="focus:bg-gray-100 dark:focus:bg-gray-700">Medium A3</SelectItem>
                    <SelectItem value="large" className="focus:bg-gray-100 dark:focus:bg-gray-700">Large A2</SelectItem>
                    <SelectItem value="xlarge" className="focus:bg-gray-100 dark:focus:bg-gray-700">Extra Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Artwork Description <span className="text-red-500">*</span>
                </label>
                <Textarea
                  placeholder="Describe your vision for the artwork..."
                  required
                  className="min-h-[150px]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Reference Images <span className="text-red-500">*</span> (Upload 2 images)
                </label>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  className="w-full"
                  onChange={handleImageChange}
                  required
                />
                <div className="flex gap-2 mt-2">
                  {images.map((img, idx) => (
                    <img
                      key={idx}
                      src={URL.createObjectURL(img)}
                      alt={`Reference ${idx + 1}`}
                      className="object-cover w-24 h-24 rounded border"
                    />
                  ))}
                </div>
              </div>
              {error && <div className="text-sm text-center text-red-500">{error}</div>}

              <button
                type="submit"
                className="px-6 py-3 w-full font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg transition-all duration-300 transform hover:from-purple-700 hover:to-pink-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                Submit Commission Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
