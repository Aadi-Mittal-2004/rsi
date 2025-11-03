import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import quartziteImg from "@/assets/quartzite-texture.jpg";
import graniteImg from "@/assets/granite-texture.jpg";
import marbleImg from "@/assets/marble-texture.jpg";
import sandstoneImg from "@/assets/sandstone-texture.jpg";

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  properties: string[];
}

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const products: Product[] = [
    {
      id: "1",
      name: "Taj Mahal Quartzite",
      category: "quartzite",
      description: "Elegant veining with a warm, creamy base",
      image: quartziteImg,
      properties: ["Durable", "Heat Resistant", "Low Maintenance"],
    },
    {
      id: "2",
      name: "Azul Macaubas Quartzite",
      category: "quartzite",
      description: "Deep blue tones with striking white veins",
      image: quartziteImg,
      properties: ["Unique Color", "Durable", "Premium Quality"],
    },
    {
      id: "3",
      name: "Black Galaxy Granite",
      category: "granite",
      description: "Bold patterns with exceptional durability",
      image: graniteImg,
      properties: ["High Durability", "Scratch Resistant", "Easy to Clean"],
    },
    {
      id: "4",
      name: "Imperial Red Granite",
      category: "granite",
      description: "Rich red tones with black and grey patterns",
      image: graniteImg,
      properties: ["Bold Appearance", "Weather Resistant", "Versatile"],
    },
    {
      id: "5",
      name: "Calacatta Marble",
      category: "marble",
      description: "Classic white with subtle grey veining",
      image: marbleImg,
      properties: ["Elegant", "Timeless", "Premium Finish"],
    },
    {
      id: "6",
      name: "Statuario Marble",
      category: "marble",
      description: "Bright white with bold grey veining",
      image: marbleImg,
      properties: ["Luxurious", "High-End", "Statement Piece"],
    },
    {
      id: "7",
      name: "Rainbow Sandstone",
      category: "sandstone",
      description: "Natural layers with earthy warmth",
      image: sandstoneImg,
      properties: ["Natural Beauty", "Slip Resistant", "Outdoor Safe"],
    },
    {
      id: "8",
      name: "Teak Wood Sandstone",
      category: "sandstone",
      description: "Warm brown tones with natural grain patterns",
      image: sandstoneImg,
      properties: ["Warm Tones", "Textured", "Weather Resistant"],
    },
  ];

  const categories = [
    { id: "all", name: "All Products" },
    { id: "quartzite", name: "Quartzite" },
    { id: "granite", name: "Granite" },
    { id: "marble", name: "Marble" },
    { id: "sandstone", name: "Sandstone" },
  ];

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our extensive collection of premium natural stones, perfect for any project.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="min-w-[120px]"
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{product.name}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {product.properties.map((prop) => (
                    <span
                      key={prop}
                      className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
                    >
                      {prop}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-16 text-center bg-muted rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Looking for something specific?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            We have a wide variety of natural stones in stock. Contact us to discuss your requirements
            and we'll help you find the perfect stone for your project.
          </p>
          <Button asChild>
            <a href="/contact">Request a Quote</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Products;
