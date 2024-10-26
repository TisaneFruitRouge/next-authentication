import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/ui/card";
import { Button } from "@/ui/button";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export function InvitationError() {
	return (
		<Card className="w-full max-w-md mx-auto">
			<CardHeader>
				<div className="flex items-center space-x-2">
					<AlertCircle className="w-6 h-6 text-destructive" />
					<CardTitle className="text-xl text-destructive">
						Invitation Error
					</CardTitle>
				</div>
				<CardDescription>
					There was an issue with your invitation.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<p className="mb-4 text-sm text-muted-foreground">
					The invitation you&apos;re trying to access is either invalid or you don&pos;t
					have the correct permissions. Please check your email for a valid
					invitation or contact the person who sent it.
				</p>
			</CardContent>
			<CardFooter>
				<Link href="/" className="w-full">
					<Button variant="outline" className="w-full">
						Go back to home
					</Button>
				</Link>
			</CardFooter>
		</Card>
	);
}