import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface AppContextType {
  products: Product[];
  cart: CartItem[];
  addToCart: (product: Product) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  updateProduct: (product: Product) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Initial Products Data with better images for cookies and date biscuits
const initialProducts: Product[] = [
  {
    id: '1',
    name: 'كوكيز',
    price: 8.00,
    image: 'https://i.postimg.cc/KvFrhYY5/image.webp',
    description: 'كوكيز طازج ولذيذ مخبوز يومياً بأجود المكونات الطبيعية والطعم الرائع الذي يذوب في الفم'
  },
  {
    id: '2',
    name: 'بسكويت تمر',
    price: 7.50,
    image: 'https://i.postimg.cc/W1GnJJfC/2025-06-23-221857.png',
    description: 'بسكويت التمر اللذيذ محضر بتمر طبيعي عالي الجودة وطعم أصيل ومميز يجمع بين الحلاوة والفائدة'
  }
];

// App Provider Component
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const savedProducts = localStorage.getItem('chocoKrumbProducts');
      if (savedProducts) {
        const parsedProducts = JSON.parse(savedProducts);
        // Validate products structure
        if (Array.isArray(parsedProducts) && parsedProducts.length > 0) {
          setProducts(parsedProducts);
        }
      }

      const savedCart = localStorage.getItem('chocoKrumbCart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          setCart(parsedCart);
        }
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
      // Reset to initial state if there's an error
      localStorage.removeItem('chocoKrumbProducts');
      localStorage.removeItem('chocoKrumbCart');
    }
  }, []);

  // Save products to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('chocoKrumbProducts', JSON.stringify(products));
    } catch (error) {
      console.error('Error saving products to localStorage:', error);
    }
  }, [products]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('chocoKrumbCart', JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cart]);

  // Add product to cart
  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Update cart item quantity
  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  // Remove item from cart
  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  // Clear entire cart
  const clearCart = () => {
    setCart([]);
    try {
      localStorage.removeItem('chocoKrumbCart');
    } catch (error) {
      console.error('Error clearing cart from localStorage:', error);
    }
  };

  // Update product (admin function)
  const updateProduct = (updatedProduct: Product) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    
    // Update cart items if the product is in cart
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === updatedProduct.id
          ? { ...updatedProduct, quantity: item.quantity }
          : item
      )
    );
  };

  const value: AppContextType = {
    products,
    cart,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    updateProduct
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the app context
export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};