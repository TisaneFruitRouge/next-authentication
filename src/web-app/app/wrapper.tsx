"use client";

import Link from "next/link";
import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/ui/button";


export function ThemeToggle() {
	const { setTheme, theme } = useTheme();

	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={() => setTheme(theme === "light" ? "dark" : "light")}
		>
			<Sun className="h-[1.5rem] w-[1.3rem] dark:hidden" color="#000" />
			<Moon className="hidden h-5 w-5 dark:block" />
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
}

export function Wrapper(props: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen w-full dark:bg-black bg-white  dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative flex justify-center">
			<div className="absolute pointer-events-none inset-0 md:flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] hidden"></div>
			<div className="bg-white dark:bg-black border-b py-2 flex justify-between items-center border-border absolute z-50 w-full lg:w-8/12 px-4 md:px-1">
				<Link href="/">
					<div className="flex gap-2 cursor-pointer">
						<p className="dark:text-white text-black">BETTER-AUTH.</p>
					</div>
				</Link>
				<div className="z-50 flex items-center">
					<ThemeToggle />
				</div>
			</div>
			<div className="mt-20 lg:w-7/12 w-full">{props.children}</div>
		</div>
	);
}