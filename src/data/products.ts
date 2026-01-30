
import quartziteImg from "@/assets/quartzite-texture.jpg";
import graniteImg from "@/assets/granite-texture.jpg";
import marbleImg from "@/assets/marble-texture.jpg";
import sandstoneImg from "@/assets/sandstone-texture.jpg";

// Real product images
import terraRedImg from "@/assets/products/terra-red.jpg";
import silverShineImg from "@/assets/products/silver-shine.jpg";
import silverGrayPolishedImg from "@/assets/products/silver-gray-polished.jpg";
import teakwoodImg from "@/assets/products/teakwood.jpg";
import kotaBrownImg from "@/assets/products/kota-brown.jpg";
import kotaBlueImg from "@/assets/products/kota-blue.jpg";
import rainbowImg from "@/assets/products/rainbow.jpg";
import sandstoneRedImg from "@/assets/products/sandstone-red.jpg";
import sandstonePinkImg from "@/assets/products/sandstone-pink.jpg";
import sandstoneAgraRedImg from "@/assets/products/sandstone-agra-red.jpg";
import sandstoneKandlaGreyImg from "@/assets/products/sandstone-kandla-grey.jpg";
import sandstoneLalitpurGreyImg from "@/assets/products/sandstone-lalitpur-grey.jpg";
import sandstoneYellowImg from "@/assets/products/sandstone-yellow.jpg";

export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  description: string;
  usage: string;
  image: string;
  properties: string[];
}

// Import mosaic images using Vite glob import
// @ts-ignore
const mosaicModules = import.meta.glob('@/assets/mosaic/*.{jpg,jpeg,png,webp}', { eager: true, query: '?url', import: 'default' });

// Helper function to determine subcategory from filename
const getSubcategory = (filename: string): string => {
  const lowerFilename = filename.toLowerCase();
  if (lowerFilename.startsWith('pebbles')) return 'pebbles';
  if (lowerFilename.startsWith('right angle')) return 'corner-pieces';
  if (lowerFilename.includes('wall cladding') || lowerFilename.includes('desig')) return 'wall-cladding';
  if (lowerFilename.startsWith('matrix')) return 'matrix';
  return 'stone-patterns';
};

// Helper function to get description based on subcategory
const getSubcategoryDescription = (subcategory: string): string => {
  switch (subcategory) {
    case 'pebbles': return 'Natural stone pebbles that add texture and organic beauty to any space. Perfect for creating serene garden paths or adding a unique touch to interior designs.';
    case 'corner-pieces': return 'Precision-cut right angle corner pieces designed to provide a seamless and professional finish to your wall cladding projects, ensuring structural integrity and visual continuity.';
    case 'wall-cladding': return 'Exquisite designer wall cladding that transforms ordinary walls into architectural masterpieces. Features intricate patterns and rich textures for a premium look.';
    case 'matrix': return 'Geometric matrix patterns that offer a modern and sophisticated aesthetic. These stones create a striking visual impact with their structured yet natural appearance.';
    default: return 'Premium decorative stone patterns available in a variety of intricate designs and textures. Ideal for adding character and elegance to both interior and exterior surfaces.';
  }
};

// Helper function to get usage based on subcategory
const getSubcategoryUsage = (subcategory: string): string => {
  switch (subcategory) {
    case 'pebbles': return 'Garden Pathways, Landscaping, Aquariums, Decorative Features';
    case 'corner-pieces': return 'External Corners, Pillars, Wall Returns';
    case 'wall-cladding': return 'Interior Feature Walls, Exterior Facades, Chimney Breasts, Garden Walls';
    case 'matrix': return 'Modern Facades, Office Interiors, Feature Walls';
    default: return 'Feature Walls, Exterior Cladding, Garden Features, Interior Accents';
  }
};

// Generate pattern products from imported images
const mosaicProducts: Product[] = Object.entries(mosaicModules).map(([path, url], index) => {
  // Extract filename as name (simplified)
  const filename = path.split('/').pop()?.split('.')[0] || `Pattern ${index + 1}`;
  const cleanName = filename.replace(/_/g, ' ').replace(/-/g, ' ').replace(/model config 2k/gi, '').replace(/\d+/g, '').trim() || `Stone Pattern ${index + 1}`;
  const subcategory = getSubcategory(filename);
  
  return {
    id: `m${index + 1}`,
    name: cleanName.charAt(0).toUpperCase() + cleanName.slice(1),
    category: "mosaic",
    subcategory,
    description: getSubcategoryDescription(subcategory),
    usage: getSubcategoryUsage(subcategory),
    image: url as string,
    properties: ["Panels", "Pebbles", "Right Angles", "Decorative Patterns"],
  };
});

export const products: Product[] = [
    // Quartzite & Slate
    {
      id: "q1",
      name: "Terra Red Slate",
      category: "quartzite",
      description: "Terra Red is a premium quartzite slate characterized by its deep red hues and natural cleft texture. This durable natural stone cladding brings warmth and earthy charm to any space, making it a standout choice for traditional and contemporary designs alike.",
      usage: "Wall Cladding, Roofing, Flooring, Outdoor Paving",
      image: terraRedImg,
      properties: ["Natural Cleft", "Durable", "Slate"],
    },
    {
      id: "q2",
      name: "Silver Shine",
      category: "quartzite",
      description: "Silver Shine is a stunning quartzite stone featuring a shimmering silver-grey surface with subtle metallic notes. Its natural cleft finish captures light beautifully, adding a touch of glamour and sophistication to interiors and exteriors.",
      usage: "Feature Walls, Flooring, Patios, Pool Surrounds",
      image: silverShineImg,
      properties: ["Natural Cleft", "Metallic Lustre", "Premium"],
    },
    {
      id: "q3",
      name: "Silver Gray Polished",
      category: "quartzite",
      description: "Sleek and sophisticated, Silver Gray Polished Quartzite offers a smooth silver-grey finish. It combines the extreme durability of quartzite with a refined aesthetic, perfect for modern architectural projects requiring a clean look.",
      usage: "Interior Flooring, Wall Cladding, Countertops, Bathroom Tiles",
      image: silverGrayPolishedImg,
      properties: ["Polished", "Modern", "Sophisticated"],
    },
    {
      id: "q4",
      name: "Deoli Green Polished",
      category: "quartzite",
      description: "Deoli Green Polished is a luxurious quartzite with deep green tones and sparkling mica inclusions. This polished natural stone surface enhances the stone's rich color depth, creating an elegant and high-end visual appeal.",
      usage: "Flooring, Wall Cladding, Bathrooms, Countertops",
      image: quartziteImg,
      properties: ["Polished", "Rich Color", "Elegant"],
    },
    {
      id: "q5",
      name: "Deoli Green",
      category: "quartzite",
      description: "Natural Deoli Green quartzite features a textured, organic surface with rich green hues. Its localized natural cleft finish provides excellent slip resistance and a raw, earthy beauty.",
      usage: "Outdoor Paving, Garden Paths, Pool Decks, Wall Cladding",
      image: quartziteImg,
      properties: ["Natural Cleft", "Textured", "Organic"],
    },
    {
      id: "q6",
      name: "Golden",
      category: "quartzite",
      description: "Radiating warmth, Golden quartzite showcases a beautiful blend of gold, yellow, and metallic tones. Its natural texture and vibrant colors make it an inviting choice for creating sunlit, welcoming spaces.",
      usage: "Feature Walls, Pender Cladding, Patios, Garden Features",
      image: quartziteImg,
      properties: ["Natural Cleft", "Warm", "Luxury"],
    },
    {
      id: "q7",
      name: "Copper Polished",
      category: "quartzite",
      description: "A unique quartzite with striking copper and reddish-brown hues, finished to a high polish. The glossy surface highlights the intricate details and vibrant color variations of this distinctive stone.",
      usage: "Interior Feature Walls, Flooring, Countertops, Decorative Accents",
      image: quartziteImg,
      properties: ["Polished", "Vibrant", "Unique"],
    },
    {
      id: "q8",
      name: "Copper",
      category: "quartzite",
      description: "Rustic and bold, Natural Copper quartzite offers deep copper tones with a textured cleft surface. This stone exudes a rugged charm perfect for adding character to both interior and exterior designs.",
      usage: "Exterior Cladding, Roofing, Paving, Feature Walls",
      image: quartziteImg,
      properties: ["Natural Cleft", "Rustic", "Warm"],
    },
    {
      id: "q9",
      name: "Ocean Green",
      category: "quartzite",
      description: "Resembling the depths of the sea, Ocean Green quartzite features a calming blend of green and grey tones with intricate natural textures. A durable and versatile choice for serene environments.",
      usage: "Pool Surrounds, Paving, Wall Cladding, Bathrooms",
      image: quartziteImg,
      properties: ["Natural", "Calming", "Textured"],
    },
    {
      id: "q10",
      name: "Gold (Zeera) Green",
      category: "quartzite",
      description: "A distinctive quartzite with a green base speckled with unique gold 'Zeera' (cumin-like) patterns. This decorative stone adds a layer of visual interest and texture to any application.",
      usage: "Feature Walls, Cladding, Garden Ornaments, Paving",
      image: quartziteImg,
      properties: ["Unique Pattern", "Natural", "Decorative"],
    },
    {
      id: "q11",
      name: "Kund Multi",
      category: "quartzite",
      description: "A vibrant multi-colored slate exhibiting a spectrum of reds, purples, yellows, and greys. Each tile is unique, creating a rich tapestry of color that brings energy and life to floors and walls.",
      usage: "Flooring, Wall Cladding, Roofing, Paviors",
      image: quartziteImg,
      properties: ["Colorful", "Varied", "Eye-catching"],
    },
    {
      id: "q12",
      name: "Kund Black",
      category: "quartzite",
      description: "Classic and timeless, Kund Black slate offers a deep, intense black color with a natural cleft finish. Its monochromatic elegance allows it to blend seamlessly with various design styles, from rustic to modern.",
      usage: "Flooring, Roofing, Wall Cladding, Blackboards",
      image: quartziteImg,
      properties: ["Bold", "Classic", "Versatile"],
    },

    // Sandstone
    {
      id: "s1",
      name: "Teakwood",
      category: "sandstone",
      description: "Teakwood Sandstone is a luxurious fine-grained natural stone featuring distinct wood-like veining in golden and yellow tones. Its smooth texture creates an elegant, timber-like aesthetic without the maintenance of real wood.",
      usage: "Interior Walls, Exterior Facades, Pool Surrounds, Patios",
      image: teakwoodImg,
      properties: ["Wood Effect", "Warm", "Natural"],
    },
    {
      id: "s2",
      name: "Rainbow",
      category: "sandstone",
      description: "Rainbow Sandstone is known for its intense swirls of violet, plum, and orange. Each slab of this Indian sandstone is unique, offering a vibrant and artistic kaleidoscope of natural colors that serves as a bold focal point.",
      usage: "Feature Walls, Garden Ornaments, Paving, Pool Edges",
      image: rainbowImg,
      properties: ["Colorful", "Artistic", "Unique"],
    },
    {
      id: "s3",
      name: "Heritage Red (Jodhpur)",
      category: "sandstone",
      description: "Embodying the grandeur of historic Indian architecture, Heritage Red features deep earthy red tones with a robust textured surface. This strong and durable stone adds a sense of permanence and tradition.",
      usage: "Exterior Cladding, Boundary Walls, Landscaping, Pathways",
      image: sandstoneRedImg,
      properties: ["Traditional", "Bold", "Textured"],
    },
    {
      id: "s4",
      name: "Heritage Pink (Jodhpur)",
      category: "sandstone",
      description: "Soft and inviting, Heritage Pink sandstone offers a gentle pink hue with a natural grainy texture. Its subtle coloring makes it versatile for creating warm, welcoming spaces with a touch of softness.",
      usage: "Façades, Garden Paving, Wall Cladding, Pillars",
      image: sandstonePinkImg,
      properties: ["Subtle", "Grainy", "Soft Tone"],
    },
    {
      id: "s5",
      name: "Kandla Grey",
      category: "sandstone",
      description: "A contemporary favorite, Kandla Grey provides consistent cool grey tones that complement modern architectural styles. Its neutral palette serves as a perfect backdrop for vibrant landscapes and interiors.",
      usage: "Patio Paving, Driveways, Garden Steps, Modern Interiors",
      image: sandstoneKandlaGreyImg,
      properties: ["Neutral", "Modern", "Consistent"],
    },
    {
      id: "s6",
      name: "Lalitpur Grey",
      category: "sandstone",
      description: "Lalitpur Grey is known for its subtle grey shades with occasional variations, offering a sophisticated and understated look. It is highly durable and versatile, suitable for a wide range of applications.",
      usage: "Flooring, Wall Cladding, Pool Surrounds, Patios",
      image: sandstoneLalitpurGreyImg,
      properties: ["Subtle", "Versatile", "Durable"],
    },
    {
      id: "s7",
      name: "Lalitpur Yellow",
      category: "sandstone",
      description: "Bright and sunny, Lalitpur Yellow brings a cheerful energy to any space with its vibrant yellow tones. It is ideal for brightening up outdoor areas and creating lively, inviting atmospheres.",
      usage: "Garden Paving, Pool Decks, Feature Walls, Pathways",
      image: sandstoneYellowImg,
      properties: ["Bright", "Welcoming", "Vibrant"],
    },
    {
      id: "s8",
      name: "Agra Red",
      category: "sandstone",
      description: "Famous for its use in iconic monuments like the Red Fort, Agra Red is a deep, robust red sandstone. Its rich color and strength make it perfect for grand architectural statements and durable outdoor features.",
      usage: "Monuments, Exterior Walls, Coping, Pillars",
      image: sandstoneAgraRedImg,
      properties: ["Historic", "Robust", "Deep Color"],
    },
    {
      id: "s9",
      name: "Dholpur Beige",
      category: "sandstone",
      description: "A classic cream and beige sandstone with a uniform texture. Dholpur Beige is celebrated for its elegance and neutrality, seamlessly blending with various architectural and landscape designs.",
      usage: "Façades, Interior Walls, Garden Paving, Carvings",
      image: sandstoneImg,
      properties: ["Neutral", "Creamy", "Elegant"],
    },
    {
      id: "s10",
      name: "Dholpur Pink",
      category: "sandstone",
      description: "Exhibiting gentle pink hues with a smooth, refined appearance, Dholpur Pink adds a delicate touch of color. It is widely used for enhancing the aesthetic appeal of residential and commercial exteriors.",
      usage: "Cladding, Columns, Window Sills, Garden Features",
      image: sandstonePinkImg,
      properties: ["Soft", "Smooth", "Pastel"],
    },
    {
      id: "s11",
      name: "Raj Green",
      category: "sandstone",
      description: "Often compared to reclaimed York stone, Raj Green is a versatile mix of green, brown, and grey earth tones. Its natural appearance blends harmoniously with garden landscapes, making it a popular choice for traditional settings.",
      usage: "Garden Paving, Driveways, Patios, Wall Coping",
      image: sandstoneImg,
      properties: ["Earthy", "Natural Blend", "Popular"],
    },
    {
      id: "s13",
      name: "Autumn Brown",
      category: "sandstone",
      description: "Reminiscent of falling leaves, Autumn Brown features a warm palette of reddish-browns and tans. This sandstone creates a rustic and inviting atmosphere, perfect for cozy outdoor retreats.",
      usage: "Patio Paving, Garden Paths, Retaining Walls, Driveways",
      image: sandstoneImg,
      properties: ["Warm", "Rustic", "Inviting"],
    },
    {
      id: "s14",
      name: "Garada Buff",
      category: "sandstone",
      description: "Garada Buff offers light buff and cream shades with a smooth surface texture. Its clean, airy appearance helps to visually expand spaces, making small gardens or courtyards feel distinctive and larger.",
      usage: "Pool Surrounds, Modern Patios, Interior Flooring, Steps",
      image: sandstoneImg,
      properties: ["Light", "Airy", "Neutral"],
    },
    {
      id: "s15",
      name: "Multi Mint",
      category: "sandstone",
      description: "A fascinating sandstone characterized by its minty green base and unique fossil-like patterns. The surface markings tell a geological story, adding intrigue and natural history to your design.",
      usage: "Feature Walls, Museum Floors, Garden Features, Cladding",
      image: sandstoneImg,
      properties: ["Unique", "Fossil Look", "Green Tones"],
    },
    {
      id: "s16",
      name: "Raveena",
      category: "sandstone",
      description: "Raveena stands out with its bold variations of purple, grey, and pink. Its distinct color palette makes a strong design statement, ideal for projects that require a unique and dramatic stone.",
      usage: "Statement Paving, Feature Walls, Commercial Landscapes",
      image: sandstoneImg,
      properties: ["Distinctive", "Bold", "Varied"],
    },
    {
      id: "s17",
      name: "Double Colour",
      category: "sandstone",
      description: "As the name suggests, this stone presents a striking two-tone effect, typically blending light and dark shades. This dynamic contrast adds depth and visual movement to paved surfaces.",
      usage: "Patterned Paving, Borders, Pool Decks, Courtyards",
      image: sandstoneImg,
      properties: ["Contrast", "Dynamic", "Eye-catching"],
    },
    {
      id: "s18",
      name: "Mandana Red",
      category: "sandstone",
      description: "A deep reddish-brown to maroon stone known for its exceptional hardness and acid resistance. Mandana Red is perfect for heavy-traffic areas where durability and rich color are equally important.",
      usage: "Industrial Flooring, Commercial Paving, Heavy Traffic Areas",
      image: sandstoneRedImg,
      properties: ["Dark", "Rich", "Durable"],
    },
    {
      id: "s19",
      name: "Panther",
      category: "sandstone",
      description: "Showcasing a unique spotted and patterned surface reminiscent of a panther's coat. This exotic sandstone creates a wild and adventurous aesthetic for those looking to make a bold design choice.",
      usage: "Accent Walls, Garden Features, Artistic Installations",
      image: sandstoneImg,
      properties: ["Patterned", "Wild", "Statement"],
    },
    {
      id: "s20",
      name: "Mall Green",
      category: "sandstone",
      description: "Mall Green offers a dark, rich green color with a heavily textured surface. Its robust nature and deep tones provide a solid, grounded feel to landscapes and architectural elements.",
      usage: "Retaining Walls, Rustic Paving, Water Features",
      image: sandstoneImg,
      properties: ["Dark Green", "Textured", "Natural"],
    },
    {
      id: "s21",
      name: "Lahriya Yellow",
      category: "sandstone",
      description: "Distinguished by its wave-like 'Lahriya' patterns in varying shades of yellow. This dynamic stone adds flow and movement to static surfaces, creating a lively and engaging visual experience.",
      usage: "Feature Paving, Interior Accents, Garden Paths",
      image: sandstoneImg,
      properties: ["Wavy", "Patterned", "Yellow"],
    },
    {
      id: "s22",
      name: "Polish Green",
      category: "sandstone",
      description: "A polished variation of green sandstone that combines natural color with a sleek finish. It offers a sophisticated verdant look suitable for premium interior and exterior applications.",
      usage: "Tabletops, Countertops, Interior Flooring, Wall Cladding",
      image: sandstoneImg,
      properties: ["Polished", "Smooth", "Green"],
    },

    // Limestone
    {
      id: "l1",
      name: "Kota Brown",
      category: "limestone",
      description: "A dense, fine-grained limestone with subtle brown tones. Kota Brown is renowned for its non-slip properties and durability, making it an excellent practical choice that doesn't compromise on style.",
      usage: "Commercial Flooring, Paving, Pathways, Heavy Traffic Zones",
      image: kotaBrownImg,
      properties: ["Smooth", "Durable", "Flooring"],
    },
    {
      id: "l2",
      name: "Kota Blue",
      category: "limestone",
      description: "Presenting a cool blue-grey palette, Kota Blue is a classic limestone with a smooth, matte finish. Its refined appearance and hard-wearing nature make it a staple in both residential and civic architecture.",
      usage: "Interior Flooring, Hallways, Exterior Paving, Wall Cladding",
      image: kotaBlueImg,
      properties: ["Cool Tone", "Classic", "Hard"],
    },


    // Add Mosaic products
    ...mosaicProducts
];
