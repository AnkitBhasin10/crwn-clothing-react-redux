import "./category.styles.scss";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../../contexts/products-context";
import ProductCard from "../../components/shop-card/product-card.component";

const Category = () => {
  const { category } = useParams();
  const categoriesMap = useContext(ProductsContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(categoriesMap.products[category]);
  }, [category, categoriesMap]);

  return (
    <>
      <h2 className="category-title">{category.toUpperCase()}</h2>
      <div className="child-category-container">
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </>
  );
};

export default Category;
