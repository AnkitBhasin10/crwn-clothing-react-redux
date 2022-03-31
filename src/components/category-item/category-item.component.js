import "./category-item.styles.scss";
import { useNavigate } from "react-router-dom";

const CategoryItem = ({ imageUrl, title, size, route }) => {
  const navigate = useNavigate();

  const onNavigateHandler = () => {
    navigate(route);
  };

  return (
    <div
      className={`${size ? size : ""} category-container `}
      onClick={onNavigateHandler}
    >
      <div
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className="category-body-container">
        <h2>{title.toUpperCase()}</h2>
        <span>Shop Now</span>
      </div>
    </div>
  );
};

export default CategoryItem;
