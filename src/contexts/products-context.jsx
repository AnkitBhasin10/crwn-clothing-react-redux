import { createContext, useEffect, useState } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase.utils";

export const ProductsContext = createContext({
  products: [],
});

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getCategoriesData = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      setProducts(categoryMap);
    };

    getCategoriesData();
  }, []);

  const value = { products };
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
