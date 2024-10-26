import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/ui/table";
import {
	Loader2,
	Trash,
	RefreshCw,
} from "lucide-react";
import { Button } from "@/ui/button";
import { UserWithRole } from "better-auth/plugins";

interface UserTableProps {
    users: UserWithRole[];
    handleDeleteUser: (userId: string) => void;
    handleRevokeSessions: (userId: string) => void;
    isLoading?: string;
}

export default function UserTable({users, handleDeleteUser, handleRevokeSessions, isLoading}: UserTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users?.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.role || "user"}</TableCell>
                        <TableCell>
                            <div className="flex space-x-2">
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleDeleteUser(user.id)}
                                    disabled={isLoading?.startsWith("delete")}
                                >
                                    {isLoading === `delete-${user.id}` ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Trash className="h-4 w-4" />
                                    )}
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleRevokeSessions(user.id)}
                                    disabled={isLoading?.startsWith("revoke")}
                                >
                                    {isLoading === `revoke-${user.id}` ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <RefreshCw className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}