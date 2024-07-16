import ReactDOM from 'react-dom/client'
import './main.css'
import 'react-toastify/dist/ReactToastify.css'
import { Auth0Provider } from '@auth0/auth0-react'
import App from './components/app'

const domain = 'dev-zekz6wkpeh6elzly.us.auth0.com';
const clientId = 'JlvgnX2jnzLqM5UjSNiqtwUu3tOVQJvr';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
    useRefreshTokens={true}
    cacheLocation='localstorage'
  >
    <App />
  </Auth0Provider>
)
