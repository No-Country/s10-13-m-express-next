import { PrimaryButton } from "@/components"

function LoginForm() {
  return (
    <form className='flex flex-col gap-4 items-center'>
      <input
        type="text"
        id="username"
        className="border border-[#79747E] rounded text-gray-900 text-sm block w-full px-3 py-4 bg-transparent placeholder:text-black"
        placeholder="Usuario"
        required
      />
      <input
        type="text"
        id="first_name"
        className="border border-[#79747E] rounded text-gray-900 text-sm block w-full px-3 py-4 bg-transparent placeholder:text-black"
        placeholder="Contraseña" required
      />
      <PrimaryButton>Iniciar sesión</PrimaryButton>
    </form>
  )
}

export default LoginForm