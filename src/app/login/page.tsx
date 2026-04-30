import LoginForm from "@/features/auth/components/LoginForm"

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-xl mb-4">Login</h1>
      <LoginForm />
    </div>
  )
}