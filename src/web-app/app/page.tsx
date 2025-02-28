import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import UserCard from "@/features/user/user-card";
import { OrganizationCard } from "@/features/organization/organization-card";
import AccountSwitcher from "@/features/account/account-switch";

export default async function DashboardPage() {
	const [session, activeSessions, deviceSessions] = await Promise.all([
		auth.api.getSession({
			headers: await headers(),
		}),
		auth.api.listSessions({
			headers: await headers(),
		}),
		auth.api.listDeviceSessions({
			headers: await headers(),
		}),
	]).catch(() => {
		throw redirect("/sign-in");
	});
	return (
		<div className="w-full">
			<div className="flex gap-4 flex-col">
				<AccountSwitcher
					sessions={JSON.parse(JSON.stringify(deviceSessions))}
				/>
				<UserCard
					session={JSON.parse(JSON.stringify(session))}
					activeSessions={JSON.parse(JSON.stringify(activeSessions))}
				/>
				<OrganizationCard session={JSON.parse(JSON.stringify(session))} />
			</div>
		</div>
	);
}