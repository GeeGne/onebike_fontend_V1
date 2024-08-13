// HOOKS
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

// SCSS
import './styles/App.scss';

// COMPONENTS
const App = React.lazy(() => import('./App'));
import PageIsLoading from '/src/components/PageIsLoading';
import Test from './Test';
// import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Suspense fallback={<PageIsLoading type="a" darkMode={false} lan='en' />}>
    <App />
    </Suspense>
    {/* <Test /> */}
  </React.StrictMode>,
)

//  The Test Component is for Testing all global
//  functionaliy settings like fonts, themes, base settings etc..
