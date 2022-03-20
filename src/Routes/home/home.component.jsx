import Directory from '../../components/directory/directory.component'
import CategoryData from '../../static_data/category-data'

const Home = () => {
  const categories = CategoryData

  return <Directory categories={categories} />
}

export default Home
