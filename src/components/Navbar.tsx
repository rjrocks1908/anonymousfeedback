"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { User } from "next-auth";
import { Button } from "./ui/button";

function Navbar() {
  const { data: session } = useSession();
  const user: User = session?.user as User;

  return (
    <nav className="p-4 md:p-6 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <a className="text-xl font-bold mb-4 md:mb-0" href="#">
          Anonymous Feedback
        </a>
        {session ? (
          <>
            <span className="mr-4">
              Welcome, {user?.username || user?.email}
            </span>
            <Button className="w-full md:w-auto" onClick={() => signOut()}>
              Logout
            </Button>
          </>
        ) : (
          <div>
            <Link href={"/sign-in"} className="mr-4">
              <Button className="w-full md:w-auto">Sign In</Button>
            </Link>
            <Link href={"/sign-up"}>
              <Button className="w-full md:w-auto">Sign Up</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
