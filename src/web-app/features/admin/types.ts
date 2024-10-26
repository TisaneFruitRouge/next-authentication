export type NewUser = {
    email: string;
    password: string;
    name: string;
    role: "user" | "admin";
}