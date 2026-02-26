
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

// New sandstone images
import sandstoneAgraRedNewImg from "@/assets/products/sandstone-agra-red-new.jpg";
import sandstoneBuffImg from "@/assets/products/sandstone-buff.png";
import sandstoneChocolateImg from "@/assets/products/sandstone-chocolate.png";
import sandstoneDesertBrownImg from "@/assets/products/sandstone-desert-brown.png";
import sandstoneDholpurBeigeImg from "@/assets/products/sandstone-dholpur-beige.jpeg";
import sandstoneDholpurPinkImg from "@/assets/products/sandstone-dholpur-pink.png";
import sandstoneGwaliorMintImg from "@/assets/products/sandstone-gwalior-mint.jpg";
import sandstoneHeritagePinkImg from "@/assets/products/sandstone-heritage-pink.jpeg";
import sandstoneMonsoonBlack1Img from "@/assets/products/sandstone-monsoon-black-1.png";
import sandstoneMonsoonBlack2Img from "@/assets/products/sandstone-monsoon-black-2.png";
import sandstoneMultiBrownImg from "@/assets/products/sandstone-multi-brown.jpg";
import sandstoneRajGreenImg from "@/assets/products/sandstone-raj-green.png";
import sandstoneFossilImg from "@/assets/products/sandstone-fossil.png";
import sandstoneLalitpurYellowImg from "@/assets/products/sandstone-lalitpur-yellow.jpeg";
import sandstoneRaveenaImg from "@/assets/products/sandstone-raveena.png";
import sandstoneAutumnBrownImg from "@/assets/products/sandstone-autumn-brown.jpg";

// Limestone images
import limestoneItaGoldImg from "@/assets/products/limestone-ita-gold.png";
import limestoneJaisalmerYellowImg from "@/assets/products/limestone-jaisalmer-yellow.png";
import limestoneKadappaBlackImg from "@/assets/products/limestone-kadappa-black.png";
import limestoneKotaBlueNewImg from "@/assets/products/limestone-kota-blue.png";
import limestoneKotaMixImg from "@/assets/products/limestone-kota-mix.png";
import limestonePearlGoldImg from "@/assets/products/limestone-pearl-gold.png";
import limestoneShabadYellowImg from "@/assets/products/limestone-shabad-yellow.png";

// Quartzite images
import quartziteCopperImg from "@/assets/products/quartzite-copper.png";
import quartziteGoldenImg from "@/assets/products/quartzite-golden.png";
import quartziteHimachalWhiteImg from "@/assets/products/quartzite-himachal-white.png";
import quartziteOceanGreenImg from "@/assets/products/quartzite-ocean-green.png";
import quartziteZeeraGreenImg from "@/assets/products/quartzite-zeera-green.png";

// Quartzite images from mosaic folder (reclassified)
import deoliGreenMosaicImg from "@/assets/mosaic/Deoli green.jpeg";
import silverShineMosaicImg from "@/assets/mosaic/Silver shine.jpeg";
import forestFireImg from "@/assets/mosaic/forest fire.jpeg";
import sliverGrey1Img from "@/assets/mosaic/sliver grey (1).jpeg";
import sliverGrey2Img from "@/assets/mosaic/sliver grey (2).jpeg";

export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  description: string;
  usage: string;
  image: string;
  images?: string[];
  properties: string[];
}

// Import mosaic images using Vite glob import
// @ts-ignore
const mosaicModules = import.meta.glob('@/assets/mosaic/*.{jpg,jpeg,png,webp}', { eager: true, query: '?url', import: 'default' });

const getSubcategory = (filename: string): string => {
  const lowerFilename = filename.toLowerCase();
  if (lowerFilename.startsWith('pebbles')) return 'pebbles';
  if (lowerFilename.startsWith('right angle')) return 'corner-pieces';
  if (lowerFilename.includes('wall cladding') || lowerFilename.includes('desig')) return 'wall-cladding';
  if (lowerFilename.startsWith('matrix')) return 'matrix';
  return 'stone-patterns';
};

const getSubcategoryDescription = (subcategory: string): string => {
  switch (subcategory) {
    case 'pebbles': return 'Natural stone pebbles that add texture and organic beauty to any space. Perfect for creating serene garden paths or adding a unique touch to interior designs.';
    case 'corner-pieces': return 'Precision-cut right angle corner pieces designed to provide a seamless and professional finish to your wall cladding projects, ensuring structural integrity and visual continuity.';
    case 'wall-cladding': return 'Exquisite designer wall cladding that transforms ordinary walls into architectural masterpieces. Features intricate patterns and rich textures for a premium look.';
    case 'matrix': return 'Geometric matrix patterns that offer a modern and sophisticated aesthetic. These stones create a striking visual impact with their structured yet natural appearance.';
    default: return 'Premium decorative stone patterns available in a variety of intricate designs and textures. Ideal for adding character and elegance to both interior and exterior surfaces.';
  }
};

const getSubcategoryUsage = (subcategory: string): string => {
  switch (subcategory) {
    case 'pebbles': return 'Garden Pathways, Landscaping, Aquariums, Decorative Features';
    case 'corner-pieces': return 'External Corners, Pillars, Wall Returns';
    case 'wall-cladding': return 'Interior Feature Walls, Exterior Facades, Chimney Breasts, Garden Walls';
    case 'matrix': return 'Modern Facades, Office Interiors, Feature Walls';
    default: return 'Feature Walls, Exterior Cladding, Garden Features, Interior Accents';
  }
};

const excludedMosaicFiles = [
  'deoli green',
  'silver shine',
  'forest fire',
  'sliver grey (1)',
  'sliver grey (2)',
];

const mosaicProducts: Product[] = Object.entries(mosaicModules)
  .filter(([path]) => {
    const filename = path.split('/').pop()?.split('.')[0] || '';
    return !excludedMosaicFiles.includes(filename.toLowerCase());
  })
  .map(([path, url], index) => {
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
    // ===== QUARTZITE =====

    {
      id: "q2",
      name: "Silver Shine Quartzite",
      category: "quartzite",
      description: "Silver Shine is a stunning quartzite stone featuring a shimmering silver-grey surface with subtle metallic notes. Its natural cleft finish captures light beautifully, adding a touch of glamour and sophistication to interiors and exteriors.",
      usage: "Feature Walls, Flooring, Patios, Pool Surrounds",
      image: silverShineMosaicImg,
      images: [silverShineImg],
      properties: ["Natural Cleft", "Metallic Lustre", "Premium"],
    },
    {
      id: "q3",
      name: "Silver Grey Quartzite",
      category: "quartzite",
      description: "Silver Grey quartzite is a versatile stone available in both polished and natural cleft finishes. The polished variant offers a sleek, sophisticated silver-grey surface ideal for modern interiors.",
      usage: "Interior Flooring, Wall Cladding, Countertops, Patios, Feature Walls",
      image: silverGrayPolishedImg,
      images: [sliverGrey1Img, sliverGrey2Img],
      properties: ["Polished", "Natural Cleft", "Modern", "Neutral", "Elegant"],
    },
    {
      id: "q4",
      name: "Deoli Green Quartzite",
      category: "quartzite",
      description: "Deoli Green is a luxurious quartzite featuring deep green tones with sparkling mica inclusions. Available in polished and natural cleft finishes for an elegant appeal.",
      usage: "Flooring, Wall Cladding, Bathrooms, Countertops, Outdoor Paving",
      image: deoliGreenMosaicImg,
      properties: ["Polished", "Natural Cleft", "Rich Color", "Elegant"],
    },

    {
      id: "q6",
      name: "Golden Quartzite",
      category: "quartzite",
      description: "Radiating warmth, Golden quartzite showcases a beautiful blend of gold, yellow, and metallic tones. Its natural texture and vibrant colors make it an inviting choice for creating sunlit, welcoming spaces.",
      usage: "Feature Walls, Pender Cladding, Patios, Garden Features",
      image: quartziteGoldenImg,
      properties: ["Natural Cleft", "Warm", "Luxury"],
    },
    {
      id: "q7",
      name: "Copper Quartzite",
      category: "quartzite",
      description: "Copper quartzite showcases striking copper and reddish-brown hues. Available in a high polish or a natural cleft finish that exudes rugged charm perfect for adding character.",
      usage: "Feature Walls, Flooring, Countertops, Exterior Cladding, Roofing",
      image: quartziteCopperImg,
      properties: ["Polished", "Natural Cleft", "Vibrant", "Rustic"],
    },
    {
      id: "q8",
      name: "Himachal White Quartzite",
      category: "quartzite",
      description: "Himachal White quartzite features a pristine white surface with subtle natural veining. Its clean, bright appearance makes it ideal for modern and minimalist designs.",
      usage: "Interior Flooring, Wall Cladding, Countertops, Bathrooms",
      image: quartziteHimachalWhiteImg,
      properties: ["White", "Clean", "Modern"],
    },
    {
      id: "q9",
      name: "Ocean Green Quartzite",
      category: "quartzite",
      description: "Resembling the depths of the sea, Ocean Green quartzite features a calming blend of green and grey tones with intricate natural textures. A durable and versatile choice for serene environments.",
      usage: "Pool Surrounds, Paving, Wall Cladding, Bathrooms",
      image: quartziteOceanGreenImg,
      properties: ["Natural", "Calming", "Textured"],
    },
    {
      id: "q10",
      name: "Zeera Green Quartzite",
      category: "quartzite",
      description: "Zeera Green quartzite features a distinctive green surface with fine, seed-like natural patterns. Its unique texture and rich green tones create a fresh, organic aesthetic for both indoor and outdoor applications.",
      usage: "Feature Walls, Wall Cladding, Flooring, Garden Features",
      image: quartziteZeeraGreenImg,
      properties: ["Green", "Textured", "Natural"],
    },
    {
      id: "q11",
      name: "Forest Fire Quartzite",
      category: "quartzite",
      description: "Forest Fire quartzite showcases a dramatic blend of fiery reds, burnt oranges, and earthy browns reminiscent of autumn foliage. This striking natural stone adds bold warmth and character.",
      usage: "Feature Walls, Exterior Cladding, Flooring, Landscaping",
      image: forestFireImg,
      properties: ["Natural Cleft", "Vibrant", "Bold"],
    },

    // ===== SANDSTONE =====
    {
      id: "s1",
      name: "Teakwood Sandstone",
      category: "sandstone",
      description: "Teakwood Sandstone is a luxurious fine-grained natural stone featuring distinct wood-like veining in golden and yellow tones. Its smooth texture creates an elegant, timber-like aesthetic.",
      usage: "Interior Walls, Exterior Facades, Pool Surrounds, Patios",
      image: teakwoodImg,
      properties: ["Wood Effect", "Warm", "Natural"],
    },
    {
      id: "s2",
      name: "Rainbow Sandstone",
      category: "sandstone",
      description: "Rainbow Sandstone is known for its intense swirls of violet, plum, and orange. Each slab is unique, offering a vibrant and artistic kaleidoscope of natural colors.",
      usage: "Feature Walls, Garden Ornaments, Paving, Pool Edges",
      image: rainbowImg,
      properties: ["Colorful", "Artistic", "Unique"],
    },
    {
      id: "s3",
      name: "Chocolate Sandstone",
      category: "sandstone",
      description: "Rich chocolate brown tones give this sandstone a warm, luxurious feel. Its deep color and natural texture make it perfect for creating sophisticated outdoor and indoor spaces.",
      usage: "Patio Paving, Feature Walls, Garden Paths, Driveways",
      image: sandstoneChocolateImg,
      properties: ["Rich", "Warm", "Luxurious"],
    },
    {
      id: "s4",
      name: "Kandla Grey Sandstone",
      category: "sandstone",
      description: "A contemporary favorite, Kandla Grey provides consistent cool grey tones that complement modern architectural styles. Its neutral palette serves as a perfect backdrop.",
      usage: "Patio Paving, Driveways, Garden Steps, Modern Interiors",
      image: sandstoneKandlaGreyImg,
      properties: ["Neutral", "Modern", "Consistent"],
    },
    {
      id: "s5",
      name: "Agra Red Sandstone",
      category: "sandstone",
      description: "A rich, warm red sandstone reminiscent of the iconic Agra Fort. Known for its deep reddish hue with fine grain, this stone adds a regal and historical character to any project.",
      usage: "Exterior Cladding, Boundary Walls, Landscaping, Pathways",
      image: sandstoneAgraRedNewImg,
      properties: ["Red", "Regal", "Traditional"],
    },
    {
      id: "s6",
      name: "Buff Sandstone",
      category: "sandstone",
      description: "A versatile, light-toned sandstone in warm cream and buff shades. Buff Sandstone is a UK favorite, offering a clean, contemporary look ideal for paving and walling.",
      usage: "Patio Paving, Garden Walls, Driveways, Cladding",
      image: sandstoneBuffImg,
      properties: ["Cream", "Versatile", "Clean"],
    },
    {
      id: "s7",
      name: "Desert Brown Sandstone",
      category: "sandstone",
      description: "Also known as Woodland Sandstone, this stone features a warm blend of brown and earthy tones with natural banding. It creates a rustic, natural aesthetic perfect for outdoor spaces.",
      usage: "Patio Paving, Garden Paths, Feature Walls, Driveways",
      image: sandstoneDesertBrownImg,
      properties: ["Earthy", "Rustic", "Natural"],
    },
    {
      id: "s8",
      name: "Dholpur Beige Sandstone",
      category: "sandstone",
      description: "A sophisticated beige sandstone from Dholpur with a smooth, uniform surface and warm sandy tones. Its neutral elegance makes it suitable for both traditional and modern designs.",
      usage: "Interior Flooring, Exterior Cladding, Facades, Pillars",
      image: sandstoneDholpurBeigeImg,
      properties: ["Beige", "Smooth", "Elegant"],
    },
    {
      id: "s9",
      name: "Dholpur Pink Sandstone",
      category: "sandstone",
      description: "A beautiful pink sandstone from the Dholpur region with soft rose tones and fine grain. Widely used in heritage architecture, it brings a warm, inviting character to any space.",
      usage: "Facades, Wall Cladding, Flooring, Landscaping",
      image: sandstoneDholpurPinkImg,
      properties: ["Pink", "Heritage", "Warm"],
    },
    {
      id: "s10",
      name: "Gwalior Mint Sandstone",
      category: "sandstone",
      description: "A striking green-toned sandstone from Gwalior with a fresh, minty appearance. Its unique color and natural texture make it a standout choice for contemporary landscapes.",
      usage: "Garden Paving, Pool Surrounds, Feature Walls, Patios",
      image: sandstoneGwaliorMintImg,
      properties: ["Green", "Fresh", "Unique"],
    },
    {
      id: "s11",
      name: "Heritage Pink Sandstone",
      category: "sandstone",
      description: "Also known as Jodhpur Pink, this sandstone features soft pink hues with subtle natural variations. A heritage stone that has graced palaces and forts across Rajasthan.",
      usage: "Exterior Facades, Flooring, Wall Cladding, Heritage Restoration",
      image: sandstoneHeritagePinkImg,
      properties: ["Pink", "Heritage", "Classic"],
    },
    {
      id: "s12",
      name: "Monsoon Black Sandstone",
      category: "sandstone",
      description: "A dramatic dark sandstone with deep black and charcoal tones. Monsoon Black creates bold, contemporary surfaces with excellent durability and slip resistance.",
      usage: "Modern Patios, Driveways, Interior Flooring, Pool Surrounds",
      image: sandstoneMonsoonBlack1Img,
      images: [sandstoneMonsoonBlack2Img],
      properties: ["Black", "Bold", "Contemporary"],
    },

    {
      id: "s14",
      name: "Raj Green Sandstone",
      category: "sandstone",
      description: "A popular green-toned sandstone with subtle grey and brown veining. Raj Green is one of the most sought-after Indian sandstones for UK gardens and landscapes.",
      usage: "Garden Paving, Patios, Driveways, Landscaping",
      image: sandstoneRajGreenImg,
      properties: ["Green", "Popular", "Durable"],
    },
    {
      id: "s15",
      name: "Fossil Sandstone",
      category: "sandstone",
      description: "A captivating sandstone featuring natural fossil imprints and ancient textures. Each slab tells a geological story, adding unique character and intrigue to any surface.",
      usage: "Feature Walls, Paving, Garden Features, Cladding",
      image: sandstoneFossilImg,
      properties: ["Fossil", "Unique", "Ancient"],
    },
    {
      id: "s16",
      name: "Lalitpur Yellow Sandstone",
      category: "sandstone",
      description: "A vibrant yellow sandstone from Lalitpur with warm golden tones and fine texture. Its sunny hue brightens any space and pairs beautifully with lush green landscapes.",
      usage: "Patio Paving, Wall Cladding, Garden Paths, Facades",
      image: sandstoneLalitpurYellowImg,
      properties: ["Yellow", "Vibrant", "Warm"],
    },
    {
      id: "s17",
      name: "Raveena Sandstone",
      category: "sandstone",
      description: "A beautiful multi-toned sandstone with a blend of purple, brown, and grey hues. Raveena creates a rich, layered look that adds depth and warmth to outdoor spaces.",
      usage: "Patio Paving, Garden Paths, Driveways, Landscaping",
      image: sandstoneRaveenaImg,
      properties: ["Multi-toned", "Rich", "Layered"],
    },
    {
      id: "s18",
      name: "Autumn Brown Sandstone",
      category: "sandstone",
      description: "Reminiscent of falling leaves, Autumn Brown features a warm palette of reddish-browns and tans. This sandstone creates a rustic and inviting atmosphere for outdoor living.",
      usage: "Patio Paving, Garden Paths, Retaining Walls, Driveways",
      image: sandstoneAutumnBrownImg,
      properties: ["Warm", "Rustic", "Inviting"],
    },

    // ===== LIMESTONE =====
    {
      id: "l1",
      name: "Kota Brown Limestone",
      category: "limestone",
      description: "A dense, fine-grained limestone with subtle brown tones. Kota Brown is renowned for its non-slip properties and durability, making it an excellent practical choice.",
      usage: "Commercial Flooring, Paving, Pathways, Heavy Traffic Zones",
      image: kotaBrownImg,
      properties: ["Smooth", "Durable", "Flooring"],
    },
    {
      id: "l2",
      name: "Kota Blue Limestone",
      category: "limestone",
      description: "Presenting a cool blue-grey palette, Kota Blue is a classic limestone with a smooth, matte finish. Its refined appearance and hard-wearing nature make it a staple.",
      usage: "Interior Flooring, Hallways, Exterior Paving, Wall Cladding",
      image: limestoneKotaBlueNewImg,
      images: [kotaBlueImg],
      properties: ["Cool Tone", "Classic", "Hard"],
    },
    {
      id: "l3",
      name: "Ita Gold Limestone",
      category: "limestone",
      description: "A luxurious golden limestone with warm amber tones and subtle natural veining. Ita Gold brings a sun-kissed elegance to both interior and exterior applications.",
      usage: "Interior Flooring, Feature Walls, Countertops, Facades",
      image: limestoneItaGoldImg,
      properties: ["Golden", "Warm", "Luxurious"],
    },
    {
      id: "l4",
      name: "Jaisalmer Yellow Limestone",
      category: "limestone",
      description: "A vibrant yellow limestone from the historic city of Jaisalmer. Known for its warm golden hue and fine grain, this stone has graced palaces and forts for centuries.",
      usage: "Exterior Facades, Wall Cladding, Flooring, Landscaping",
      image: limestoneJaisalmerYellowImg,
      properties: ["Yellow", "Heritage", "Fine Grain"],
    },
    {
      id: "l5",
      name: "Kadappa Black Limestone",
      category: "limestone",
      description: "A striking deep black limestone from the Kadappa region. Known for its uniform dark color and smooth texture, it creates a dramatic and sophisticated statement.",
      usage: "Interior Flooring, Wall Cladding, Countertops, Exterior Paving",
      image: limestoneKadappaBlackImg,
      properties: ["Black", "Smooth", "Sophisticated"],
    },
    {
      id: "l6",
      name: "Kota Mix Limestone",
      category: "limestone",
      description: "A beautifully variegated limestone blending brown, blue, and grey tones from the Kota region. Each piece offers unique natural color variation for distinctive surfaces.",
      usage: "Flooring, Paving, Patios, Garden Paths",
      image: limestoneKotaMixImg,
      properties: ["Multi-toned", "Natural", "Versatile"],
    },
    {
      id: "l7",
      name: "Pearl Gold Limestone",
      category: "limestone",
      description: "An exquisite limestone with pearlescent golden tones and a smooth, refined surface. Pearl Gold adds opulent warmth and timeless sophistication to premium spaces.",
      usage: "Interior Flooring, Feature Walls, Countertops, Lobbies",
      image: limestonePearlGoldImg,
      properties: ["Pearl", "Golden", "Premium"],
    },
    {
      id: "l8",
      name: "Shabad Yellow Limestone",
      category: "limestone",
      description: "A natural yellow limestone from Shabad with warm, sunny tones and a fine-grained texture. Its cheerful color and durability make it ideal for both traditional and modern designs.",
      usage: "Flooring, Wall Cladding, Exterior Paving, Garden Features",
      image: limestoneShabadYellowImg,
      properties: ["Yellow", "Natural", "Durable"],
    },

    // ===== SLATE =====
    {
      id: "sl0",
      name: "Terra Red Slate",
      category: "slate",
      description: "Terra Red is a premium slate characterized by its deep red hues and natural cleft texture. This durable natural stone cladding brings warmth and earthy charm to any space, making it a standout choice for traditional and contemporary designs alike.",
      usage: "Wall Cladding, Roofing, Flooring, Outdoor Paving",
      image: terraRedImg,
      properties: ["Natural Cleft", "Durable", "Slate"],
    },
    {
      id: "sl1",
      name: "Jak Multi Color Slate",
      category: "slate",
      description: "A vibrant multi-colored slate featuring a dynamic mix of warm and cool tones. Each piece offers unique color variations, creating visually striking surfaces.",
      usage: "Roofing, Wall Cladding, Flooring, Garden Paths",
      image: "",
      properties: ["Multi-Color", "Vibrant", "Unique"],
    },
    {
      id: "sl2",
      name: "Kund Multi Color Slate",
      category: "slate",
      description: "A vibrant multi-colored slate exhibiting a spectrum of reds, purples, yellows, and greys. Each tile is unique, creating a rich tapestry of color.",
      usage: "Flooring, Wall Cladding, Roofing, Paviors",
      image: quartziteImg,
      properties: ["Colorful", "Varied", "Eye-catching"],
    },
    {
      id: "sl3",
      name: "Himachal Green Slate",
      category: "slate",
      description: "A premium green slate from the Himachal region featuring rich, deep green tones. Its natural cleft finish provides excellent texture and slip resistance.",
      usage: "Roofing, Wall Cladding, Flooring, Exterior Paving",
      image: "",
      properties: ["Green", "Natural Cleft", "Premium"],
    },
    {
      id: "sl4",
      name: "Himachal Black Slate",
      category: "slate",
      description: "A classic black slate from Himachal with a deep, uniform dark surface. Its sleek appearance and durability make it ideal for both traditional and modern designs.",
      usage: "Flooring, Roofing, Wall Cladding, Countertops",
      image: "",
      properties: ["Black", "Classic", "Durable"],
    },
    {
      id: "sl5",
      name: "Bazad Multi Color Slate",
      category: "slate",
      description: "An exotic multi-colored slate with unique patterns and color combinations. Bazad Multi Color brings a distinctive character and warmth to any installation.",
      usage: "Feature Walls, Flooring, Exterior Cladding, Landscaping",
      image: "",
      properties: ["Multi-Color", "Exotic", "Textured"],
    },
    {
      id: "sl6",
      name: "Indian Autumn Slate",
      category: "slate",
      description: "Capturing the warm hues of autumn, this slate showcases a blend of rust, gold, and brown tones. Its earthy palette creates a cozy, inviting atmosphere.",
      usage: "Flooring, Wall Cladding, Roofing, Garden Paths",
      image: "",
      properties: ["Autumn Tones", "Earthy", "Warm"],
    },
    {
      id: "sl7",
      name: "Kashmir Pink Slate",
      category: "slate",
      description: "A delicate pink slate with subtle natural variations. Kashmir Pink adds a soft, elegant touch while maintaining the rugged durability that slate is known for.",
      usage: "Interior Flooring, Wall Cladding, Roofing, Decorative Features",
      image: "",
      properties: ["Pink", "Elegant", "Durable"],
    },

    // ===== MARBLE — EXOTIC =====
    {
      id: "me1",
      name: "Michaelangelo Marble",
      category: "marble",
      subcategory: "exotic",
      description: "A breathtaking exotic marble with dramatic veining and rich color contrasts. Michaelangelo marble transforms any space into a work of art with its sculptural beauty.",
      usage: "Feature Walls, Countertops, Flooring, Luxury Interiors",
      image: "",
      properties: ["Exotic", "Dramatic", "Luxury"],
    },
    {
      id: "me2",
      name: "Dover White Marble",
      category: "marble",
      subcategory: "exotic",
      description: "An exquisite white marble with subtle veining and a pristine, luminous surface. Dover White embodies timeless elegance for the most refined spaces.",
      usage: "Flooring, Wall Cladding, Bathrooms, Countertops",
      image: "",
      properties: ["White", "Luminous", "Timeless"],
    },
    {
      id: "me3",
      name: "Camouflage Dark Marble",
      category: "marble",
      subcategory: "exotic",
      description: "A unique exotic marble with dark, camouflage-like patterns that create an intriguing and contemporary look. Perfect for bold, statement-making interiors.",
      usage: "Feature Walls, Luxury Flooring, Countertops, Bar Tops",
      image: "",
      properties: ["Dark", "Patterned", "Contemporary"],
    },
    {
      id: "me4",
      name: "Camouflage Light Marble",
      category: "marble",
      subcategory: "exotic",
      description: "The lighter counterpart of Camouflage Dark, featuring soft, muted patterns on a lighter base. Offers a sophisticated yet understated exotic aesthetic.",
      usage: "Interior Flooring, Wall Cladding, Vanity Tops, Lobbies",
      image: "",
      properties: ["Light", "Subtle", "Exotic"],
    },
    {
      id: "me5",
      name: "Silver River Marble",
      category: "marble",
      subcategory: "exotic",
      description: "Flowing silver veins across a light base create a river-like effect in this stunning exotic marble. Its fluid patterns bring movement and grace to interiors.",
      usage: "Feature Walls, Countertops, Bathrooms, Luxury Flooring",
      image: "",
      properties: ["Silver", "Flowing", "Graceful"],
    },
    {
      id: "me6",
      name: "Golden Flemingo Marble",
      category: "marble",
      subcategory: "exotic",
      description: "A warm exotic marble with golden and flamingo pink tones. Its unique coloring creates a luxurious, vibrant atmosphere in premium interiors.",
      usage: "Feature Walls, Flooring, Countertops, Decorative Accents",
      image: "",
      properties: ["Golden", "Warm", "Vibrant"],
    },
    {
      id: "me7",
      name: "Blue Breccia Marble",
      category: "marble",
      subcategory: "exotic",
      description: "A stunning breccia marble with rich blue fragments set in a contrasting matrix. This rare stone makes a bold statement in high-end applications.",
      usage: "Feature Walls, Countertops, Decorative Panels, Luxury Bathrooms",
      image: "",
      properties: ["Blue", "Bold", "Rare"],
    },
    {
      id: "me8",
      name: "Pink Breccia Marble",
      category: "marble",
      subcategory: "exotic",
      description: "Delicate pink fragments create a romantic and elegant pattern in this breccia marble. Its soft warmth adds a touch of luxury to refined interiors.",
      usage: "Bathrooms, Feature Walls, Vanity Tops, Flooring",
      image: "",
      properties: ["Pink", "Romantic", "Elegant"],
    },
    {
      id: "me9",
      name: "Beige Breccia Marble",
      category: "marble",
      subcategory: "exotic",
      description: "A warm beige breccia marble with fragments of varying sand and cream tones. Its neutral elegance makes it versatile for both classic and contemporary designs.",
      usage: "Flooring, Wall Cladding, Countertops, Lobbies",
      image: "",
      properties: ["Beige", "Versatile", "Elegant"],
    },
    {
      id: "me10",
      name: "Breccia Oniciata Marble",
      category: "marble",
      subcategory: "exotic",
      description: "An Italian-origin breccia marble with warm amber and cream tones. Breccia Oniciata is prized for its rich, honeyed appearance and dramatic veining.",
      usage: "Feature Walls, Flooring, Countertops, Luxury Interiors",
      image: "",
      properties: ["Amber", "Italian", "Premium"],
    },

    // ===== MARBLE — BEIGE =====
    {
      id: "mb1",
      name: "Dyna Classico Marble",
      category: "marble",
      subcategory: "beige",
      description: "A premium beige marble with warm golden undertones and subtle veining. Dyna Classico brings refined elegance to any interior space.",
      usage: "Flooring, Wall Cladding, Countertops, Lobbies",
      image: "",
      properties: ["Beige", "Golden", "Classic"],
    },
    {
      id: "mb2",
      name: "Bottochino Classico Marble",
      category: "marble",
      subcategory: "beige",
      description: "An Italian inspired beige marble with distinctive brown veining on a warm cream base. A timeless choice for luxury interiors.",
      usage: "Flooring, Wall Cladding, Bathrooms, Stairways",
      image: "",
      properties: ["Italian", "Veined", "Timeless"],
    },
    {
      id: "mb3",
      name: "Bulgaria Beige Marble",
      category: "marble",
      subcategory: "beige",
      description: "A fine quality beige marble from Bulgaria with a uniform, warm tone and minimal veining. Perfect for creating clean, sophisticated interiors.",
      usage: "Interior Flooring, Wall Cladding, Countertops, Bathrooms",
      image: "",
      properties: ["Uniform", "Clean", "Sophisticated"],
    },
    {
      id: "mb4",
      name: "Sofita Gold Marble",
      category: "marble",
      subcategory: "beige",
      description: "A luxurious golden-beige marble with warm honey tones. Sofita Gold creates an opulent atmosphere with its rich, sun-kissed coloring.",
      usage: "Flooring, Feature Walls, Countertops, Luxury Bathrooms",
      image: "",
      properties: ["Gold", "Opulent", "Warm"],
    },
    {
      id: "mb5",
      name: "Burberry Marble",
      category: "marble",
      subcategory: "beige",
      description: "A chic beige marble with subtle patterning reminiscent of luxury fashion. Burberry marble adds a touch of high-end sophistication to modern interiors.",
      usage: "Flooring, Wall Cladding, Vanity Tops, Accent Walls",
      image: "",
      properties: ["Chic", "Patterned", "Modern"],
    },
    {
      id: "mb6",
      name: "Royal Crema Marble",
      category: "marble",
      subcategory: "beige",
      description: "A regal cream marble with gentle veining and a smooth, polished surface. Royal Crema exudes quiet luxury and timeless grace.",
      usage: "Interior Flooring, Wall Cladding, Countertops, Lobbies",
      image: "",
      properties: ["Cream", "Regal", "Polished"],
    },
    {
      id: "mb7",
      name: "Perlato Royal Marble",
      category: "marble",
      subcategory: "beige",
      description: "A distinguished pearl-toned marble with warm beige undertones and subtle fossil prints. Perlato Royal offers a unique, refined aesthetic.",
      usage: "Flooring, Wall Cladding, Stairways, Lobbies",
      image: "",
      properties: ["Pearl", "Unique", "Refined"],
    },
    {
      id: "mb8",
      name: "Oman Beige Marble",
      category: "marble",
      subcategory: "beige",
      description: "A premium beige marble from Oman with a warm, creamy surface and fine, delicate veining. Known for its consistent quality and elegant appearance.",
      usage: "Interior Flooring, Wall Cladding, Countertops, Exteriors",
      image: "",
      properties: ["Creamy", "Consistent", "Elegant"],
    },
    {
      id: "mb9",
      name: "Monalisa Marble",
      category: "marble",
      subcategory: "beige",
      description: "A captivating beige marble with artistic veining patterns. Monalisa marble brings a sense of artistry and refinement to luxury interiors.",
      usage: "Feature Walls, Flooring, Countertops, Bathrooms",
      image: "",
      properties: ["Artistic", "Beige", "Refined"],
    },
    {
      id: "mb10",
      name: "Vegas Gold Marble",
      category: "marble",
      subcategory: "beige",
      description: "A glamorous golden-beige marble that captures the opulence of its namesake. Vegas Gold adds warmth and luxury to any premium setting.",
      usage: "Flooring, Feature Walls, Bar Tops, Luxury Bathrooms",
      image: "",
      properties: ["Glamorous", "Golden", "Luxury"],
    },
    {
      id: "mb11",
      name: "Sofia Beige Marble",
      category: "marble",
      subcategory: "beige",
      description: "A soft, elegant beige marble with gentle tonal variations. Sofia Beige offers a serene and harmonious base for refined interior spaces.",
      usage: "Interior Flooring, Wall Cladding, Bathrooms, Countertops",
      image: "",
      properties: ["Soft", "Harmonious", "Serene"],
    },
    {
      id: "mb12",
      name: "Spanish Beige Marble",
      category: "marble",
      subcategory: "beige",
      description: "An imported beige marble from Spain with warm tones and classic European character. Its polished finish adds timeless elegance to any space.",
      usage: "Flooring, Wall Cladding, Countertops, Stairways",
      image: "",
      properties: ["Spanish", "Classic", "Polished"],
    },

    // ===== MARBLE — GREY =====
    {
      id: "mg1",
      name: "Armani Grey Marble",
      category: "marble",
      subcategory: "grey",
      description: "A sophisticated grey marble with subtle veining, inspired by high-fashion aesthetics. Armani Grey brings understated luxury to modern interiors.",
      usage: "Flooring, Wall Cladding, Countertops, Bathrooms",
      image: "",
      properties: ["Sophisticated", "Modern", "Luxury"],
    },
    {
      id: "mg2",
      name: "Bulgaria Grey Marble",
      category: "marble",
      subcategory: "grey",
      description: "A premium grey marble from Bulgaria with a cool, uniform tone and subtle natural patterns. Perfect for contemporary and minimalist designs.",
      usage: "Interior Flooring, Wall Cladding, Countertops, Commercial Spaces",
      image: "",
      properties: ["Cool", "Uniform", "Contemporary"],
    },
    {
      id: "mg3",
      name: "Sonata Grey Marble",
      category: "marble",
      subcategory: "grey",
      description: "A harmonious grey marble with flowing veins that create a musical, rhythmic pattern. Sonata Grey adds depth and movement to interior surfaces.",
      usage: "Feature Walls, Flooring, Countertops, Bathrooms",
      image: "",
      properties: ["Flowing", "Rhythmic", "Deep"],
    },
    {
      id: "mg4",
      name: "Glancer Grey Marble",
      category: "marble",
      subcategory: "grey",
      description: "A sleek grey marble with a polished surface that catches and reflects light beautifully. Glancer Grey creates bright, open-feeling spaces.",
      usage: "Interior Flooring, Wall Cladding, Lobbies, Countertops",
      image: "",
      properties: ["Sleek", "Reflective", "Bright"],
    },
    {
      id: "mg5",
      name: "Alaska Grey Marble",
      category: "marble",
      subcategory: "grey",
      description: "Inspired by Arctic landscapes, Alaska Grey features cool grey tones with striking white veining that creates a dramatic, icy aesthetic.",
      usage: "Feature Walls, Flooring, Bathrooms, Countertops",
      image: "",
      properties: ["Arctic", "Dramatic", "Icy"],
    },
    {
      id: "mg6",
      name: "Golden Grey Marble",
      category: "marble",
      subcategory: "grey",
      description: "A unique marble combining grey base tones with golden veining. This blend of cool and warm creates a balanced, versatile stone for varied designs.",
      usage: "Flooring, Wall Cladding, Countertops, Reception Areas",
      image: "",
      properties: ["Golden", "Balanced", "Versatile"],
    },
    {
      id: "mg7",
      name: "French Chiffon Marble",
      category: "marble",
      subcategory: "grey",
      description: "A delicate grey marble with soft, fabric-like veining patterns. French Chiffon brings a touch of Parisian elegance and lightness to interiors.",
      usage: "Bathrooms, Feature Walls, Vanity Tops, Flooring",
      image: "",
      properties: ["Delicate", "Parisian", "Light"],
    },
    {
      id: "mg8",
      name: "Fior De Pesco Marble",
      category: "marble",
      subcategory: "grey",
      description: "An Italian-style marble with a blend of grey, purple, and peach tones creating a floral, artistic pattern. A true statement piece for luxury interiors.",
      usage: "Feature Walls, Flooring, Countertops, Luxury Bathrooms",
      image: "",
      properties: ["Italian", "Floral", "Artistic"],
    },
    {
      id: "mg9",
      name: "Golden Dream Marble",
      category: "marble",
      subcategory: "grey",
      description: "A dreamy marble where golden veins dance across a soft grey canvas. Golden Dream creates an ethereal, aspirational atmosphere in premium spaces.",
      usage: "Feature Walls, Flooring, Countertops, Lobbies",
      image: "",
      properties: ["Dreamy", "Golden", "Ethereal"],
    },
    {
      id: "mg10",
      name: "Greek Grey Marble",
      category: "marble",
      subcategory: "grey",
      description: "A classic grey marble evoking the grandeur of ancient Greek architecture. Its cool tones and subtle veining bring timeless sophistication.",
      usage: "Flooring, Wall Cladding, Columns, Countertops",
      image: "",
      properties: ["Classic", "Greek", "Timeless"],
    },
    {
      id: "mg11",
      name: "Grey Flurry Marble",
      category: "marble",
      subcategory: "grey",
      description: "A dynamic grey marble with swirling patterns that resemble a winter flurry. Its energetic veining adds life and movement to any surface.",
      usage: "Feature Walls, Flooring, Bathrooms, Countertops",
      image: "",
      properties: ["Dynamic", "Swirling", "Energetic"],
    },
    {
      id: "mg12",
      name: "William Grey Marble",
      category: "marble",
      subcategory: "grey",
      description: "A distinguished grey marble with refined veining and a polished finish. William Grey brings an air of established elegance to interiors.",
      usage: "Flooring, Wall Cladding, Countertops, Commercial Spaces",
      image: "",
      properties: ["Distinguished", "Refined", "Elegant"],
    },

    // ===== MARBLE — IMPORTED WHITE =====
    {
      id: "mw1",
      name: "Statuario Marble",
      category: "marble",
      subcategory: "imported-white",
      description: "The most coveted white marble, Statuario features bold grey veining on a brilliant white backdrop. A symbol of ultimate luxury in architecture and design.",
      usage: "Feature Walls, Countertops, Flooring, Luxury Bathrooms",
      image: "",
      properties: ["Premium", "Bold Veining", "Iconic"],
    },
    {
      id: "mw2",
      name: "Michel Angelo Marble",
      category: "marble",
      subcategory: "imported-white",
      description: "Named after the legendary artist, this white marble features dramatic veining that makes each slab a unique masterpiece of natural art.",
      usage: "Feature Walls, Flooring, Countertops, Sculptures",
      image: "",
      properties: ["Artistic", "Dramatic", "Masterpiece"],
    },
    {
      id: "mw3",
      name: "Volakas Marble",
      category: "marble",
      subcategory: "imported-white",
      description: "A popular Greek white marble with distinctive grey and gold veining. Volakas offers an excellent balance of beauty and affordability.",
      usage: "Flooring, Wall Cladding, Countertops, Bathrooms",
      image: "",
      properties: ["Greek", "Veined", "Popular"],
    },
    {
      id: "mw4",
      name: "Venatino Marble",
      category: "marble",
      subcategory: "imported-white",
      description: "An elegant white marble with fine, linear grey veining. Venatino's clean pattern creates a refined, contemporary aesthetic.",
      usage: "Flooring, Wall Cladding, Vanity Tops, Countertops",
      image: "",
      properties: ["Fine Veining", "Clean", "Contemporary"],
    },
    {
      id: "mw5",
      name: "Lilac White Marble",
      category: "marble",
      subcategory: "imported-white",
      description: "A delicate white marble with subtle lilac undertones. Its soft, romantic coloring makes it a unique choice for elegant interior applications.",
      usage: "Bathrooms, Feature Walls, Flooring, Vanity Tops",
      image: "",
      properties: ["Lilac", "Delicate", "Romantic"],
    },
    {
      id: "mw6",
      name: "Panda White Marble",
      category: "marble",
      subcategory: "imported-white",
      description: "A striking marble with bold black veins on a crisp white background. Panda White creates a dramatic, high-contrast look for modern interiors.",
      usage: "Feature Walls, Countertops, Flooring, Bathrooms",
      image: "",
      properties: ["Contrast", "Bold", "Modern"],
    },
    {
      id: "mw7",
      name: "Vietnam White Marble",
      category: "marble",
      subcategory: "imported-white",
      description: "A premium white marble from Vietnam with a clean, bright surface and minimal veining. Excellent value for large-scale luxury projects.",
      usage: "Flooring, Wall Cladding, Countertops, Commercial Spaces",
      image: "",
      properties: ["Bright", "Clean", "Value"],
    },
    {
      id: "mw8",
      name: "Lasa White Marble",
      category: "marble",
      subcategory: "imported-white",
      description: "A pure white marble with exceptional translucency and fine crystalline structure. Lasa White has been used in iconic buildings throughout history.",
      usage: "Sculptures, Feature Walls, Flooring, Luxury Interiors",
      image: "",
      properties: ["Pure", "Translucent", "Historic"],
    },
    {
      id: "mw9",
      name: "Golden Spider Marble",
      category: "marble",
      subcategory: "imported-white",
      description: "A dramatic white marble with golden-brown spider web-like veining. Golden Spider creates a captivating focal point in any premium interior.",
      usage: "Feature Walls, Flooring, Countertops, Decorative Panels",
      image: "",
      properties: ["Web-like", "Golden", "Captivating"],
    },
    {
      id: "mw10",
      name: "Bianco White Marble",
      category: "marble",
      subcategory: "imported-white",
      description: "A classic bright white marble with subtle grey undertones. Bianco White provides a clean, luminous foundation for sophisticated interior designs.",
      usage: "Flooring, Wall Cladding, Bathrooms, Countertops",
      image: "",
      properties: ["Bright", "Classic", "Luminous"],
    },

    // ===== MARBLE — BLACK =====
    {
      id: "mk1",
      name: "Black Saint Laurent Marble",
      category: "marble",
      subcategory: "black",
      description: "A prestigious black marble with striking gold and white veining. Black Saint Laurent is the epitome of luxury for bold, statement-making interiors.",
      usage: "Feature Walls, Countertops, Flooring, Bar Tops",
      image: "",
      properties: ["Prestigious", "Gold Veined", "Statement"],
    },
    {
      id: "mk2",
      name: "Black Marquina Marble",
      category: "marble",
      subcategory: "black",
      description: "A Spanish black marble with dramatic white veining. Black Marquina offers a high-contrast, elegant look that has been a designer favorite for decades.",
      usage: "Flooring, Countertops, Feature Walls, Bathrooms",
      image: "",
      properties: ["Spanish", "High Contrast", "Designer"],
    },
    {
      id: "mk3",
      name: "Black Magic Marble",
      category: "marble",
      subcategory: "black",
      description: "A deep, enigmatic black marble with subtle shimmering undertones. Black Magic creates a mysterious, opulent atmosph for premium interiors.",
      usage: "Feature Walls, Bar Tops, Luxury Bathrooms, Countertops",
      image: "",
      properties: ["Enigmatic", "Shimmering", "Opulent"],
    },
    {
      id: "mk4",
      name: "Black Portoro Marble",
      category: "marble",
      subcategory: "black",
      description: "One of the rarest black marbles, featuring bold gold veining on a deep black canvas. Black Portoro is a symbol of ultimate opulence.",
      usage: "Feature Walls, Countertops, Luxury Flooring, Decorative Panels",
      image: "",
      properties: ["Rare", "Gold Veined", "Opulent"],
    },

    // ===== MARBLE — BROWN =====
    {
      id: "mbr1",
      name: "Bronze Marble",
      category: "marble",
      subcategory: "brown",
      description: "A warm brown marble with rich bronze undertones and natural veining. Bronze marble adds depth and warmth to elegant interior spaces.",
      usage: "Flooring, Wall Cladding, Countertops, Feature Walls",
      image: "",
      properties: ["Bronze", "Warm", "Rich"],
    },
    {
      id: "mbr2",
      name: "New Bronze Marble",
      category: "marble",
      subcategory: "brown",
      description: "An updated variant of Bronze marble with refined patterns and enhanced color consistency. Offers a polished, modern take on the classic bronze aesthetic.",
      usage: "Flooring, Countertops, Wall Cladding, Lobbies",
      image: "",
      properties: ["Modern", "Polished", "Consistent"],
    },
    {
      id: "mbr3",
      name: "Armani Brown Marble",
      category: "marble",
      subcategory: "brown",
      description: "A luxurious brown marble with fashion-forward aesthetics. Armani Brown combines deep chocolate tones with subtle veining for a sophisticated look.",
      usage: "Flooring, Feature Walls, Countertops, Bathrooms",
      image: "",
      properties: ["Luxury", "Chocolate", "Sophisticated"],
    },
    {
      id: "mbr4",
      name: "Smoky Brown Marble",
      category: "marble",
      subcategory: "brown",
      description: "A distinctive marble with smoky brown tones and misty veining patterns. Smoky Brown creates an atmospheric, moody elegance in interior spaces.",
      usage: "Feature Walls, Flooring, Countertops, Bar Tops",
      image: "",
      properties: ["Smoky", "Atmospheric", "Moody"],
    },

    // ===== MARBLE — ONYX =====
    {
      id: "mo1",
      name: "Mango Onyx",
      category: "marble",
      subcategory: "onyx",
      description: "A translucent onyx with warm mango and honey tones. When backlit, Mango Onyx creates a breathtaking, glowing effect that transforms any space.",
      usage: "Backlit Panels, Feature Walls, Bar Tops, Decorative Panels",
      image: "",
      properties: ["Translucent", "Warm", "Backlit"],
    },
    {
      id: "mo2",
      name: "Tiger Onyx",
      category: "marble",
      subcategory: "onyx",
      description: "A dramatic onyx with bold striped patterns in amber and brown tones. Tiger Onyx makes a fierce, eye-catching statement in luxury interiors.",
      usage: "Feature Walls, Countertops, Backlit Panels, Decorative Art",
      image: "",
      properties: ["Striped", "Bold", "Fierce"],
    },
    {
      id: "mo3",
      name: "White Onyx",
      category: "marble",
      subcategory: "onyx",
      description: "A rare, translucent white onyx with ethereal beauty. When illuminated, White Onyx glows with an otherworldly luminescence perfect for high-end designs.",
      usage: "Backlit Feature Walls, Bathroom Panels, Decorative Art, Countertops",
      image: "",
      properties: ["Rare", "Translucent", "Ethereal"],
    },
    {
      id: "mo4",
      name: "Blue Onyx",
      category: "marble",
      subcategory: "onyx",
      description: "An exceptionally rare onyx with mesmerizing blue tones and natural translucency. Blue Onyx is among the most prized decorative stones available.",
      usage: "Backlit Panels, Feature Walls, Luxury Countertops, Art Installations",
      image: "",
      properties: ["Blue", "Mesmerizing", "Prized"],
    },
    {
      id: "mo5",
      name: "Pink Onyx",
      category: "marble",
      subcategory: "onyx",
      description: "A delicate onyx with soft pink and rose tones. When backlit, Pink Onyx creates a romantic, warm glow that elevates luxury bathrooms and spas.",
      usage: "Bathrooms, Spa Walls, Backlit Panels, Decorative Features",
      image: "",
      properties: ["Pink", "Romantic", "Glowing"],
    },
    {
      id: "mo6",
      name: "Green Onyx",
      category: "marble",
      subcategory: "onyx",
      description: "A striking green onyx with vivid emerald tones and mesmerizing translucency. Green Onyx brings the richness of nature into luxury interiors.",
      usage: "Feature Walls, Backlit Panels, Countertops, Vanity Tops",
      image: "",
      properties: ["Emerald", "Vivid", "Natural"],
    },

    // ===== MARBLE — CLADDING =====
    {
      id: "cs1",
      name: "Mocha Cream Cladding",
      category: "marble",
      subcategory: "cladding",
      description: "A warm mocha cream stone perfect for exterior and interior wall cladding. Its subtle tones create a welcoming, sophisticated facade.",
      usage: "Exterior Facades, Interior Feature Walls, Fireplaces, Pillars",
      image: "",
      properties: ["Mocha", "Warm", "Sophisticated"],
    },
    {
      id: "cs2",
      name: "Titanium Travertine",
      category: "marble",
      subcategory: "cladding",
      description: "A premium travertine with metallic grey undertones and characteristic pin-hole texture. Titanium Travertine adds industrial elegance to cladding applications.",
      usage: "Wall Cladding, Exterior Facades, Feature Walls, Pool Surrounds",
      image: "",
      properties: ["Metallic", "Industrial", "Premium"],
    },
    {
      id: "cs3",
      name: "Brazil Matrix Cladding",
      category: "marble",
      subcategory: "cladding",
      description: "An exotic cladding stone with intricate, web-like patterns from Brazil. Brazil Matrix creates a dramatic, tropical aesthetic on any wall surface.",
      usage: "Exterior Cladding, Feature Walls, Commercial Facades, Garden Walls",
      image: "",
      properties: ["Exotic", "Web-like", "Tropical"],
    },
    {
      id: "cs4",
      name: "River Matrix Cladding",
      category: "marble",
      subcategory: "cladding",
      description: "A cladding stone with flowing, river-like patterns that bring organic movement to wall surfaces. Its natural patterns create a serene, grounding effect.",
      usage: "Feature Walls, Exterior Facades, Water Features, Garden Walls",
      image: "",
      properties: ["Flowing", "Organic", "Serene"],
    },
    {
      id: "cs5",
      name: "Grey Travertine",
      category: "marble",
      subcategory: "cladding",
      description: "A contemporary grey travertine with characteristic natural textures and a modern, cool palette. Perfect for creating sleek, modern cladding surfaces.",
      usage: "Wall Cladding, Exterior Facades, Bathrooms, Commercial Spaces",
      image: "",
      properties: ["Grey", "Modern", "Textured"],
    },

    // ===== MARBLE — MAKRANA =====
    {
      id: "mm1",
      name: "Makrana Pure White Marble",
      category: "marble",
      subcategory: "makrana",
      description: "The legendary Makrana Pure White marble, the same stone used to build the Taj Mahal. Renowned for its exceptional purity and timeless, luminous beauty.",
      usage: "Flooring, Wall Cladding, Sculptures, Feature Walls",
      image: "",
      properties: ["Legendary", "Pure", "Taj Mahal"],
    },
    {
      id: "mm2",
      name: "Makrana Dungri Marble",
      category: "marble",
      subcategory: "makrana",
      description: "A Makrana marble with distinctive grey and white streaks creating a natural 'dungri' (patterned) effect. A premium Indian marble with heritage value.",
      usage: "Flooring, Wall Cladding, Countertops, Temple Architecture",
      image: "",
      properties: ["Heritage", "Patterned", "Premium"],
    },
    {
      id: "mm3",
      name: "Makrana Albeta Marble",
      category: "marble",
      subcategory: "makrana",
      description: "A premium Makrana marble with alternating light and dark streaks. Albeta's distinctive striped pattern has been a favorite in Indian architecture for centuries.",
      usage: "Flooring, Wall Cladding, Stairways, Temple Architecture",
      image: "",
      properties: ["Striped", "Historic", "Distinguished"],
    },
    {
      id: "mm4",
      name: "Makrana Kumari Marble",
      category: "marble",
      subcategory: "makrana",
      description: "A graceful Makrana marble with soft pink and white tones. Kumari marble brings delicate warmth and feminine elegance to premium interior spaces.",
      usage: "Flooring, Wall Cladding, Bathrooms, Decorative Features",
      image: "",
      properties: ["Pink", "Graceful", "Feminine"],
    },

    // Add Mosaic products
    ...mosaicProducts
];
