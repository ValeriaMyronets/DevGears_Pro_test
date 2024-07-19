import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@material-tailwind/react';
import { createFileRoute, redirect } from '@tanstack/react-router'
import { Routes } from '../utils/routes.enum';

export const Route = createFileRoute('/login')({
  component: Login,
  beforeLoad: ({ context }) => {
    if (context.isAuthenticated) {
      throw redirect({to: Routes.ROOT});
    }
  }
})

function Login() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className='flex items-center justify-center h-screen'>
      <Button
        color="blue"
        size="lg"
        onClick={() => loginWithRedirect()}
        placeholder=""
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
      >
        Log in
      </Button>
    </div>
  );
}