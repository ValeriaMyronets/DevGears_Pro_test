import { useAuth0 } from "@auth0/auth0-react";
import { Card, CardHeader, CardBody, Typography, Avatar } from "@material-tailwind/react";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
  beforeLoad: ({ context }) => {
    if (!context.isAuthenticated) {
      throw redirect({to: '/login'});
    }
  }
});

function Home() {
  const { user } = useAuth0();

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="w-96" placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
        <CardHeader
          color="gray"
          className="relative h-56"
          placeholder=""
          onPointerEnterCapture={() => { }}
          onPointerLeaveCapture={() => { }}
          style={{ filter: 'blur(1px)' }}
        >
          <img
            src={user?.picture}
            alt="Profile Avatar"
            className="w-full h-full object-cover"
          />
        </CardHeader>

        <CardBody
          className="text-center"
          placeholder=""
          onPointerEnterCapture={() => { }}
          onPointerLeaveCapture={() => { }}
        >
          <Avatar
            src={user?.picture}
            alt="Profile Picture"
            size="xxl"
            className="-mt-16 border-2 border-white"
            placeholder=""
            onPointerEnterCapture={() => { }}
            onPointerLeaveCapture={() => { }}
          />

          <Typography variant="h5" className="mt-4" placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
            {user?.name}
          </Typography>

          <Typography
            color="gray"
            className="font-medium"
            textGradient
            placeholder=""
            onPointerEnterCapture={() => { }}
            onPointerLeaveCapture={() => { }}
          >
            {user?.email}
          </Typography>


          <Typography
            color="gray"
            className="font-medium"
            textGradient
            placeholder=""
            onPointerEnterCapture={() => { }}
            onPointerLeaveCapture={() => { }}
          >
            {user?.birthdate}
          </Typography>

          <Typography
            color="gray"
            className="font-medium"
            textGradient
            placeholder=""
            onPointerEnterCapture={() => { }}
            onPointerLeaveCapture={() => { }}
          >
            {user?.phone_number}
          </Typography>
        </CardBody>
      </Card>
    </div>
  );
}
