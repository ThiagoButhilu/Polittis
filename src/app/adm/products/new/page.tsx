"use client";

import { useState } from "react";
import Image from "next/image";

interface KitItem {
  name: string;
  quantity: number;
}

export default function NewProductPage() {
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [productType, setProductType] = useState<"SIMPLE" | "CUSTOM">("SIMPLE");
  const [kitItems, setKitItems] = useState<KitItem[]>([]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    images.forEach((img) => formData.append("images", img));

    if (productType === "CUSTOM") {
      formData.append("kitItems", JSON.stringify(kitItems));
    }

    const res = await fetch("/api/product", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if(res.ok){
      alert("Produto cadastrado com sucesso!");
    }else{	
      alert("Erro ao cadastrar produto: " + (data.error || "Erro desconhecido"));
    }
    console.log("Produto cadastrado:", data);
    setLoading(false);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  }

  function handleTypeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value as "SIMPLE" | "CUSTOM";
    setProductType(value);
  }

  function handleKitItemChange(index: number, field: "name" | "quantity", value: string) {
    setKitItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [field]: field === "quantity" ? parseInt(value) : value } : item
      )
    );
  }

  function addKitItem() {
    setKitItems((prev) => [...prev, { name: "", quantity: 1 }]);
  }

  function removeKitItem(index: number) {
    setKitItems((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Cadastrar Produto</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Nome do produto"
          className="border rounded w-full p-2"
          required
        />

        <textarea
          name="description"
          placeholder="Descrição"
          className="border rounded w-full p-2"
        />

        <input
          type="number"
          name="price"
          placeholder="Preço"
          step="0.01"
          className="border rounded w-full p-2"
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Categoria"
          className="border rounded w-full p-2"
          required
        />

        {productType === "SIMPLE" && (
          <input
            type="number"
            name="quantity"
            placeholder="Quantidade"
            className="border rounded w-full p-2"
            min={1}
            defaultValue={1}
          />
        )}

        <select
          name="type"
          value={productType}
          onChange={handleTypeChange}
          className="border rounded w-full p-2"
        >
          <option value="SIMPLE">Produto comum</option>
          <option value="CUSTOM">Produto encomendado (kit)</option>
        </select>

        {productType === "CUSTOM" && (
          <div className="border p-2 rounded space-y-2">
            <h3 className="font-medium mb-2">Itens do kit (descritivo)</h3>
            {kitItems.map((item, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <input
                  type="text"
                  placeholder="Descrição do item"
                  value={item.name}
                  onChange={(e) => handleKitItemChange(idx, "name", e.target.value)}
                  className="border rounded p-1 flex-1"
                  required
                />
                <input
                  type="number"
                  placeholder="Quantidade"
                  value={item.quantity}
                  min={1}
                  onChange={(e) => handleKitItemChange(idx, "quantity", e.target.value)}
                  className="border rounded p-1 w-20"
                  required
                />
                <button type="button" onClick={() => removeKitItem(idx)} className="text-red-500">
                  Remover
                </button>
              </div>
            ))}
            <button type="button" onClick={addKitItem} className="bg-gray-200 px-2 py-1 rounded">
              Adicionar item
            </button>
          </div>
        )}

        <div>
          <label className="block font-medium mb-2">Imagens do produto</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full mb-2"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {images.map((img, idx) => (
              <div key={idx} className="relative w-24 h-24 border rounded overflow-hidden">
                <Image
                  src={URL.createObjectURL(img)}
                  alt={`Imagem ${idx + 1}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Salvando..." : "Cadastrar Produto"}
        </button>
      </form>
    </div>
  );
}
