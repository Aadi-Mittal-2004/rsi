
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { ArrowLeft, Check } from "lucide-react";
import PageTransition from "@/components/PageTransition";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
        <p className="text-lg text-muted-foreground mb-8">
          The product you are looking for does not exist.
        </p>
        <Button asChild>
          <Link to="/products">Back to Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <PageTransition>
    <div className="min-h-screen pt-24 pb-12" data-section-theme="dark">
      <div className="container mx-auto px-4">
        <Link
          to="/products"
          className="inline-flex items-center text-muted-foreground hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Link>
        
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Image Section */}
          <div className="rounded-lg overflow-hidden shadow-lg border-2 border-transparent bg-gray-50">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-cover max-h-[600px]"
            />
          </div>
          
          {/* Details Section */}
          <div>
            <span className="text-sm font-medium text-accent uppercase tracking-wider mb-2 block">
              {product.category.replace("-", " & ")}
            </span>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {product.description}
            </p>
            
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3">Recommended Usage:</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.usage}
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3">Key Features:</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.properties.map((prop) => (
                  <li key={prop} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                    <Check className="h-4 w-4 text-accent mr-2" />
                    {prop}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" variant="default">
                <Link to="/contact">Request a Quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/contact">Ask a Question</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </PageTransition>
  );
};

export default ProductDetails;
