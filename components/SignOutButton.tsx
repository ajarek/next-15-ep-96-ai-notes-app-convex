"use client";

import { Button } from "@/components/ui/button";
import { useAuthActions } from "@convex-dev/auth/react";
import { LogOut } from "lucide-react";

const SignOutButton = () => {
  const { signOut } = useAuthActions();

  return (
    <Button variant="outline" onClick={() => signOut()} title="Sign out" className="cursor-pointer">
      <LogOut />
    </Button>
  );
}

export default SignOutButton;