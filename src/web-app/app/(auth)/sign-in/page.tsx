"use client";

import SignIn from "@/features/auth/sign-in";
import { SignUp } from "@/features/auth/sign-up";
import { Tabs } from "@/ui/tabs";
import { TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";

export default function Page() {
	return (
		<div className="w-full">
			<div className="flex items-center flex-col justify-center w-full md:py-10">
				<div className="md:w-[400px]">
					<Tabs defaultValue="sign-in">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="sign-in">Sign-in</TabsTrigger>
                            <TabsTrigger value="sign-up">Sign-up</TabsTrigger>
                        </TabsList>
                        <TabsContent value="sign-in">
                            <SignIn />
                        </TabsContent>
                        <TabsContent value="sign-up">
                            <SignUp />
                        </TabsContent>
                    </Tabs>
				</div>
			</div>
		</div>
	);
}