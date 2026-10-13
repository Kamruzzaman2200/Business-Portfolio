declare module "#auth-utils" {
  interface User { email: string; role: "admin" }
  interface UserSession { loggedInAt: number }
}
export {};
