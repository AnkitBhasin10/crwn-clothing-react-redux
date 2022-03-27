import { useContext } from "react";
import { ProductsContext } from "../../contexts/products-context";

import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview = () => {
  const { products } = useContext(ProductsContext);

  return (
    <div>
      {Object.keys(products).map((title) => {
        const product = products[title];
        return <CategoryPreview key={title} title={title} products={product} />;
      })}
    </div>
  );
};

export default CategoriesPreview;
