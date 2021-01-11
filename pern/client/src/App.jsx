import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { RestaurantsContextProvider } from './context/RestaurantsContext';
import Home from './routes/Home';
import RestaurantDetailPage from './routes/RestaurantDetailPage';
import UpdatePage from './routes/UpdatePage';


const App = () => {
  return (
    <RestaurantsContextProvider>
      <div className='container'>
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/restaurant/:id' component={RestaurantDetailPage} />
            <Route exact path='/restaurant/:id/update' component={UpdatePage} />
          </Switch>

        </Router>
      </div>
    </RestaurantsContextProvider>

  )
}

export default App;