import {Route, Switch} from 'react-router-dom'

import Header from './components/Header'
import Top from './components/Top'
import Popular from './components/Popular'
import Upcoming from './components/Upcoming'
import MoviePage from './components/MoviePage'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <div className="app-container">
    <div className="responsive-container">
      <Header />
      <div className="app-body">
        <Switch>
          <Route exact path="/" component={Popular} />
          <Route exact path="/top-rated" component={Top} />
          <Route exact path="/upcoming" component={Upcoming} />
          <Route exact path="/movie/:id" component={MoviePage} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  </div>
)

export default App
