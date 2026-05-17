/**
 * Image helper to provide robust, beautiful stock image fallbacks
 * when product images are missing, blank, or fail to load.
 */

const CATEGORY_FALLBACKS: Record<string, string> = {
  vegetables: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=600&auto=format&fit=crop&q=80",
  fruits: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=600&auto=format&fit=crop&q=80",
  fish: "https://images.unsplash.com/photo-1534482421-64566f976cfa?w=600&auto=format&fit=crop&q=80",
  meat: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=600&auto=format&fit=crop&q=80",
  dairy: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop&q=80",
  bakery: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80",
  snacks: "https://images.unsplash.com/photo-1599490659213-e2b9527b0876?w=600&auto=format&fit=crop&q=80",
  "drinking water": "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600&auto=format&fit=crop&q=80",
  "bengali special": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80",
  default: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80",
};

/**
 * Returns a high-quality product image fallback URL based on the product category.
 * If the image path is empty, invalid, or missing, this fallback will be used.
 */
export function getProductImage(
  imagePath?: string | string[],
  category: string = "default"
): string {
  // Extract path if it is an array
  let path = "";
  if (Array.isArray(imagePath)) {
    path = imagePath[0] || "";
  } else if (typeof imagePath === "string") {
    path = imagePath;
  }

  // Clean the path
  path = path.trim();

  // If path is valid (starts with http, data:image, or absolute slash) return it
  if (
    path &&
    (path.startsWith("http") ||
      path.startsWith("data:") ||
      path.startsWith("/") ||
      path.startsWith("blob:"))
  ) {
    return path;
  }

  // Otherwise, use category-specific fallback
  const normalizedCategory = category.toLowerCase().trim();
  return (
    CATEGORY_FALLBACKS[normalizedCategory] || CATEGORY_FALLBACKS["default"]
  );
}
