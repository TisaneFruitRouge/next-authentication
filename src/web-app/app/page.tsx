"use client";

import { signOut } from "@/lib/auth-client";
import { Button } from "@/ui/button";
import { Loader2, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  
  const router = useRouter();
  
  const [isSignOut, setIsSignOut] = useState(false);
  
  return (
    <div>
      <Button
					className="gap-2 z-10"
					variant="secondary"
					onClick={async () => {
						setIsSignOut(true);
						await signOut({
							fetchOptions: {
								onSuccess() {
									router.push("/");
								},
							},
						});
						setIsSignOut(false);
					}}
					disabled={isSignOut}
				>
					<span className="text-sm">
						{isSignOut ? (
							<Loader2 size={16} className="animate-spin" />
						) : (
							<div className="flex items-center gap-2">
								<LogOut size={16} />
								Sign Out
							</div>
						)}
					</span>
			</Button>
    </div>
  );
}
