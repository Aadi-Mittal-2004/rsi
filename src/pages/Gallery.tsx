import { useState } from "react";
import { Button } from "@/components/ui/button";
import quartziteImg from "@/assets/quartzite-texture.jpg";
import graniteImg from "@/assets/granite-texture.jpg";
import marbleImg from "@/assets/marble-texture.jpg";
import sandstoneImg from "@/assets/sandstone-texture.jpg";
import craftsmanshipImg from "@/assets/craftsmanship.jpg";
import quarryImg from "@/assets/quarry.jpg";

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
}

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const galleryItems: GalleryItem[] = [
    { id: "1", title: "Luxury Bathroom", category: "bathroom", image: marbleImg },
    { id: "2", title: "Commercial Facade", category: "commercial", image: graniteImg },
    { id: "3", title: "Residential Kitchen", category: "kitchen", image: quartziteImg },
    { id: "4", title: "Modern Living Room Flooring", category: "flooring", image: sandstoneImg },
    { id: "5", title: "Hotel Lobby Entrance", category: "commercial", image: graniteImg },
    { id: "6", title: "Minimalist Bathroom", category: "bathroom", image: marbleImg },
    { id: "7", title: "Outdoor Patio", category: "outdoor", image: sandstoneImg },
    { id: "8", title: "Restaurant Interior", category: "commercial", image: quartziteImg },
    { id: "9", title: "Residential Facade", category: "facade", image: graniteImg },
    { id: "10", title: "Spa Interior", category: "bathroom", image: marbleImg },
    { id: "11", title: "Stone Craftsmanship", category: "craftsmanship", image: craftsmanshipImg },
    { id: "12", title: "Natural Quarry", category: "quarry", image: quarryImg },
  ];

  const categories = [
    { id: "all", name: "All" },
    { id: "kitchen", name: "Kitchens" },
    { id: "bathroom", name: "Bathrooms" },
    { id: "flooring", name: "Flooring" },
    { id: "facade", name: "Facades" },
    { id: "commercial", name: "Commercial" },
    { id: "outdoor", name: "Outdoor" },
  ];

  const filteredItems =
    selectedCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Stone in Application</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover the timeless elegance of our natural stones in real-world settings.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-lg aspect-[4/3] cursor-pointer hover:shadow-xl transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-6 text-background w-full">
                  <h3 className="text-xl font-bold">{item.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-muted rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Inspired by our work? Explore our collection.</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Find the perfect stone for your next project, from classic marbles to exotic granites. We have a
            solution for every design vision.
          </p>
          <Button asChild>
            <a href="/products">See Our Full Product Range</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
