"use client";

import { useState } from "react";
import { toast, Toaster } from "sonner";
import { client } from "@/lib/auth-client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
	Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";

import UserTable from "@/features/admin/user-table";
import CreateUserDialog from "@/features/admin/create-user-dialog";
import { NewUser } from "@/features/admin/types";

export default function AdminDashboard() {
	const queryClient = useQueryClient();
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [newUser, setNewUser] = useState<NewUser>({
		email: "",
		password: "",
		name: "",
		role: "user" as const,
	});
	const [isLoading, setIsLoading] = useState<string | undefined>();

	const { data: users, isLoading: isUsersLoading } = useQuery({
		queryKey: ["users"],
		queryFn: () =>
			client.admin
				.listUsers({
					query: {
						limit: 10,
						sortBy: "createdAt",
						sortDirection: "desc",
					},
				})
				.then((res) => res.data?.users ?? []),
	});

	const handleCreateUser = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading("create");
		try {
			const res = await client.admin.createUser({
				email: newUser.email,
				password: newUser.password,
				name: newUser.name,
				role: newUser.role,
			});
            console.log(res)
			toast.success("User created successfully");
			setNewUser({ email: "", password: "", name: "", role: "user" });
			setIsDialogOpen(false);
			queryClient.invalidateQueries({
				queryKey: ["users"],
			});
		} catch (error: any) {
			toast.error(error.message || "Failed to create user");
		} finally {
			setIsLoading(undefined);
		}
	};

	const handleDeleteUser = async (id: string) => {
		setIsLoading(`delete-${id}`);
		try {
			await client.admin.removeUser({ userId: id });
			toast.success("User deleted successfully");
			queryClient.invalidateQueries({
				queryKey: ["users"],
			});
		} catch (error: any) {
			toast.error(error.message || "Failed to delete user");
		} finally {
			setIsLoading(undefined);
		}
	};

	const handleRevokeSessions = async (id: string) => {
		setIsLoading(`revoke-${id}`);
		try {
			await client.admin.revokeUserSessions({ userId: id });
			toast.success("Sessions revoked for user");
		} catch (error: any) {
			toast.error(error.message || "Failed to revoke sessions");
		} finally {
			setIsLoading(undefined);
		}
	};

	return (
		<div className="container mx-auto p-4 space-y-8">
			<Toaster richColors />
			<Card>
				<CardHeader className="flex flex-row items-center justify-between">
					<CardTitle className="text-2xl">Admin Dashboard</CardTitle>
					<CreateUserDialog 
                        isDialogOpen={isDialogOpen}
                        setIsDialogOpen={setIsDialogOpen}
                        handleCreateUser={handleCreateUser}
                        newUser={newUser}
                        setNewUser={setNewUser}
                    />
				</CardHeader>
				<CardContent>
					{isUsersLoading ? (
						<div className="flex justify-center items-center h-64">
							<Loader2 className="h-8 w-8 animate-spin" />
						</div>
					) : (
                        users && (
                            <UserTable
                                users={users}
                                handleDeleteUser={handleDeleteUser}
                                handleRevokeSessions={handleRevokeSessions}
                                isLoading={isLoading}
                            />
                        )
					)}
				</CardContent>
			</Card>
		</div>
	);
}