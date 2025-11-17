import { Button } from "@/components/ui/button";
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">          

      <h1 className="text-5xl font-bold text-center">
        Welcome to Project Management System
      </h1>
      <div className="flex gap-4 mt-8">
        <Button>
          Get Started
        </Button>
        <Button asChild variant={"outline"}>
          <LoginLink>Sign-in</LoginLink>
        </Button>
      </div>
    </div>
  );
}
