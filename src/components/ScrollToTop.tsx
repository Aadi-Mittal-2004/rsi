import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    // Don't scroll to top when returning to products with a category filter
    if (location.pathname === "/products" && params.has("category")) {
      return;
    }
    window.scrollTo(0, 0);
  }, [location.pathname, location.search]);

  return null;
};

export default ScrollToTop;
