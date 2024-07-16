import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { Header } from '../components/header';
import { useAuth0 } from '@auth0/auth0-react';
import { ToastContainer } from 'react-toastify';

export type RouterContext = {
  isAuthenticated: boolean;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: Root,
})

function Root() {
  const {isAuthenticated} = useAuth0();

  return (
    <>
    <div className='h-screen flex flex-col'>
      {isAuthenticated && (
        <Header />
      )}

      <Outlet />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
      />
    </div>
    </>
  )  
}
