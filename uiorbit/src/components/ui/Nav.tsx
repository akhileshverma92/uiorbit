"use client"
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, Sun, Github,  Sparkles } from 'lucide-react';
import { useTheme } from "next-themes";
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

const Navbar = () => {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="scroll top-5 left-1/2 mt-5  w-full max-w-7xl mx-auto px-4 z-50 ">
      <div className="w-full md:w-7/12 mx-auto h-12 rounded-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-xl bg-background/60 dark:bg-zinc-900/60">
        <div className="flex items-center justify-between h-full px-4">
          {/* Logo section */}
          <div className="flex items-center gap-2">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
              <Button
                variant="ghost"
                size="icon"
                className="relative bg-background/80 dark:bg-zinc-900/80 hover:bg-background/50 dark:hover:bg-zinc-900/50"
              >
                <Sparkles className="h-5 w-5 text-primary" />
              </Button>
            </div>
            <Link href="/">  <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600">
              UIOrbit
            </span>  </Link>
          </div>

          {/* Search section */}


          {/* Actions section */}
          <div className="flex items-center gap-3">
            {mounted && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-background/50 dark:bg-zinc-800/50 hover:bg-background/80 dark:hover:bg-zinc-800/80"
                  >
                    {theme === "dark" ? (
                      <Moon className="h-5 w-5 text-primary" />
                    ) : (
                      <Sun className="h-5 w-5 text-primary" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-32">
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    <Sun className="h-4 w-4 mr-2" /> Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    <Moon className="h-4 w-4 mr-2" /> Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    <Sparkles className="h-4 w-4 mr-2" /> System
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* <Button
              variant="ghost"
              size="icon"
              className="bg-background/50 dark:bg-zinc-800/50 hover:bg-background/80 dark:hover:bg-zinc-800/80"
            >
             <a href="https://github.com/akhileshverma92/uiorbit"> <Github className="h-5 w-auto" />Github</a>
            </Button> */}
            <a className="mt-1" href="https://github.com/akhileshverma92/uiorbit" target="_blank"><Badge><Github className="h-5 w-5 pr-1" />Github</Badge></a>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
