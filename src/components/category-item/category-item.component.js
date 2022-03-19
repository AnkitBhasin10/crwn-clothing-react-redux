import './category-item.styles.scss'

const CategoryItem = ({ imageUrl, title, size }) => {
  return (
    <div className={`${size ? size : ''} category-container `}>
      <div
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className="category-body-container">
        <h2>{title.toUpperCase()}</h2>
        <span>Shop Now</span>
      </div>
    </div>
  )
}

export default CategoryItem
