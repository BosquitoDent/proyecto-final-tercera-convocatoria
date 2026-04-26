import { Outlet } from "react-router-dom"
import Navbar from "../components/layout/Navbar"
import useAuth from "../hooks/useAuth"

// Layout con Navbar y subrutas
export default function AppLayout() {
  const { cerrarSesion } = useAuth()

  return (
    <>
      <Navbar onSalir={cerrarSesion} />
      <main className="container">
        <Outlet />
      </main>
    </>
  )
}
