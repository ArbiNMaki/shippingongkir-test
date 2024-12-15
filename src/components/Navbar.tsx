"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { Truck } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  const { user, isLoaded } = useUser();

  return (
    <div className="border-b px-4">
      <div className="flex items-center justify-between mx-auto max-w-4xl h-16">
        <Link href={"/"} className="flex items-center gap-2">
          <Truck className="h-6 w-6" />
          <span className="font-bold">shippingking.</span>
        </Link>
        <div>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
}
