import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthContext from './services/authContext'

import 'fontsource-roboto';
import Routers from './routes/routes'
import ItemsProvider from './services/itemsContext'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthContext>
        <ItemsProvider>
          <Routers />
        </ItemsProvider>
      </AuthContext>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);