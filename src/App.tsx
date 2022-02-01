import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { NavBar } from './components/NavBar';
import store from './store';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <NavBar/>
    </BrowserRouter>
  </Provider>
);

export default App;
