import { Route } from 'react-router-dom'

import { Header } from './components'
import { Home, Cart } from './pages'

const App: React.FC = () => {
  return (
    <div className='wrapper'>
      <Header />

      <div className='content'>
        <Route exact path='/' component={Home} />
        <Route exact path='/cart' component={Cart} />
      </div>
    </div>
  )
}

export default App
