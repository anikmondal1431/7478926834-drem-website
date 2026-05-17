"use client";

import { Provider, useDispatch, useSelector } from "react-redux";
import { store, RootState } from "./store";
import { useEffect, useState, useRef } from "react";
import { hydrateCart } from "./cartSlice";
import { hydrateWishlist } from "./wishlistSlice";

function DataHydrator({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const wishlist = useSelector((state: RootState) => state.wishlist);
  const [isHydrated, setIsHydrated] = useState(false);
  const initialLoadDone = useRef(false);

  // Load from localstorage on mount
  useEffect(() => {
    if (initialLoadDone.current) return;
    
    const savedCart = localStorage.getItem("chakdaha_cart");
    const savedWishlist = localStorage.getItem("chakdaha_wishlist");
    
    // Seed default premium products if none exist
    const savedProducts = localStorage.getItem("chakdaha_products");
    if (!savedProducts || JSON.parse(savedProducts).length === 0) {
      const defaultProducts = [
        {
          id: "PRD-1",
          name: "Fresh Mint Leaves (Pudina)",
          category: "Vegetables",
          stock: 50,
          status: "In Stock",
          variations: [
            { weight: "50g", price: 20 },
            { weight: "100g", price: 35 }
          ],
          images: ["https://images.unsplash.com/photo-1596797882943-1911744b4104?w=500&auto=format&fit=crop&q=60"],
          tag: "Fresh"
        },
        {
          id: "PRD-2",
          name: "Fresh Organic Potato (Aloo)",
          category: "Vegetables",
          stock: 100,
          status: "In Stock",
          variations: [
            { weight: "1kg", price: 25 },
            { weight: "2kg", price: 45 }
          ],
          images: ["https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&auto=format&fit=crop&q=60"],
          tag: "Bestseller"
        },
        {
          id: "PRD-3",
          name: "Fresh Alphonso Mangoes",
          category: "Fruits",
          stock: 30,
          status: "In Stock",
          variations: [
            { weight: "1kg", price: 150 },
            { weight: "2kg", price: 280 }
          ],
          images: ["https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&auto=format&fit=crop&q=60"],
          tag: "Seasonal"
        },
        {
          id: "PRD-4",
          name: "Local Nadia Rohu Fish (Fresh Cut)",
          category: "Fish",
          stock: 15,
          status: "In Stock",
          variations: [
            { weight: "500g", price: 160 },
            { weight: "1kg", price: 300 }
          ],
          images: ["https://images.unsplash.com/photo-1534482421-64566f976cfa?w=500&auto=format&fit=crop&q=60"],
          tag: "Local Special"
        },
        {
          id: "PRD-5",
          name: "Premium Farm Chicken (Skinless)",
          category: "Meat",
          stock: 25,
          status: "In Stock",
          variations: [
            { weight: "500g", price: 120 },
            { weight: "1kg", price: 230 }
          ],
          images: ["https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=500&auto=format&fit=crop&q=60"],
          tag: "Daily Essential"
        },
        {
          id: "PRD-6",
          name: "Amul Premium Taaza Toned Milk",
          category: "Dairy",
          stock: 40,
          status: "In Stock",
          variations: [
            { weight: "500ml", price: 28 },
            { weight: "1L", price: 54 }
          ],
          images: ["https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&auto=format&fit=crop&q=60"],
          tag: "Breakfast"
        },
        {
          id: "PRD-7",
          name: "Bisleri Mineral Drinking Water",
          category: "Drinking Water",
          stock: 80,
          status: "In Stock",
          variations: [
            { weight: "1L", price: 20 },
            { weight: "2L", price: 35 },
            { weight: "5L", price: 70 }
          ],
          images: ["https://images.unsplash.com/photo-1616119329788-df3d7580d199?w=500&auto=format&fit=crop&q=60"],
          tag: "Must Have"
        }
      ];
      localStorage.setItem("chakdaha_products", JSON.stringify(defaultProducts));
    }

    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        if (parsedCart && parsedCart.items && parsedCart.items.length > 0) {
          dispatch(hydrateCart(parsedCart));
        }
      } catch (e) {
        console.error("Failed to load cart", e);
      }
    }

    if (savedWishlist) {
      try {
        const parsedWishlist = JSON.parse(savedWishlist);
        const items = Array.isArray(parsedWishlist) ? parsedWishlist : parsedWishlist.items;
        if (items && items.length > 0) {
          dispatch(hydrateWishlist(items));
        }
      } catch (e) {
        console.error("Failed to load wishlist", e);
      }
    }
    
    initialLoadDone.current = true;
    setIsHydrated(true);
  }, [dispatch]);

  // Save to localstorage on changes, but ONLY after hydration is complete
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("chakdaha_cart", JSON.stringify(cart));
    }
  }, [cart, isHydrated]);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("chakdaha_wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist, isHydrated]);

  return <>{children}</>;
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <DataHydrator>{children}</DataHydrator>
    </Provider>
  );
}
