import { useAuth0 } from '@auth0/auth0-react';
import {
  Navbar,
  Button,
} from "@material-tailwind/react";
import { Link } from '@tanstack/react-router';

export const Header = () => {
  const { logout } = useAuth0();

  return (
    <Navbar
      className="top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4"
      placeholder=""
      onPointerEnterCapture={() => { }}
      onPointerLeaveCapture={() => { }}
    >
      <div className="flex items-center justify-between w-full text-black">
        <div className="flex items-center gap-10">
          <Link to="/" className="font-medium">
            Profile
          </Link>

          <Link to="/users" className="font-medium">
            Users
          </Link>
        </div>


        <div className="flex items-center">
          <Button
            size="sm"
            onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
            placeholder="log out"
            onPointerEnterCapture={() => { }}
            onPointerLeaveCapture={() => { }}
          >
            Log out
          </Button>
        </div>
      </div>
    </Navbar>
  );
}