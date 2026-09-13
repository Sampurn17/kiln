"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { ArrowRight } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-white/6 bg-white/7 backdrop-blur-md">
      <nav className="flex h-16 max-w-7xl mx-auto items-center justify-between px-4 sm:px-6">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Kiln logo"
            width={120}
            height={40}
            priority
          />
        </Link>
        <div className="flex items-center gap-3">
          <Show when="signed-out">
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm" className="text-white/40">
                Sign in
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button size="sm" className="h-8 rounded-full font-semibold active:scale-95">
                Get Started
                <ArrowRight className="h-3 w-3 opacity-60" />
              </Button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <Link
              href="/projects"
              className="text-[13px] font-medium text-white/40 transition-colors hover:text-white/80">
              Projects
            </Link>
            <Link
              href="/pricing"
              className="text-[13px] font-medium text-white/40 transition-colors hover:text-white/80">
              Pricing
            </Link>
            <UserButton />
          </Show>
        </div>
      </nav>
    </header>
  );
};

export default Header;

