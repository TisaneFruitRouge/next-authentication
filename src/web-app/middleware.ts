import { authMiddleware } from "better-auth/next-js"
 
export default authMiddleware({
    redirectTo: "/sign-in" // redirect to this path if the user is not authenticated
})
 
export const config = {
  matcher: ['/'],
}