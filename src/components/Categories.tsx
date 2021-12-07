import { useState } from 'react'
import Category, { ICategory } from './Category'

interface CategoriesProps {
  items: Array<ICategory>
}

const Categories: React.FC<CategoriesProps> = (props): JSX.Element => {
  const { items } = props
  const [activeCategory, setActiveCategory] = useState<string>('all')

  return (
    <div className='categories'>
      <ul>
        {(items.length &&
          items.map((item) => (
            <Category
              key={item.name}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              item={item}
            />
          ))) ||
          'No categories here'}
      </ul>
    </div>
  )
}

export default Categories
