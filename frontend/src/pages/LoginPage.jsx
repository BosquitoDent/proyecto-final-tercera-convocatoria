import { useState } from "react"
import { TEXTS } from "../config/texts"
import useAuth from "../hooks/useAuth"
import "./LoginPage.css"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const { cargando, error, iniciarSesion } = useAuth()

  function submit(e) {
    e.preventDefault()
    iniciarSesion(email, pass)
  }

  return (
    <div className="auth">
      <div className="auth-card card">
        <div className="brand">{TEXTS.APP_NAME}</div>
        <div className="subtitle">{TEXTS.LOGIN.SUBTITLE}</div>
        <form onSubmit={submit} className="auth-form">
          <input className="input" placeholder={TEXTS.LOGIN.EMAIL_PLACEHOLDER} type="email" value={email} onChange={e => setEmail(e.target.value)} />
          <input className="input" placeholder={TEXTS.LOGIN.PASS_PLACEHOLDER} type="password" value={pass} onChange={e => setPass(e.target.value)} />
          <button className="btn btn-primary" type="submit" disabled={cargando}>
            {cargando ? TEXTS.LOGIN.SUBMIT_LOADING : TEXTS.LOGIN.SUBMIT}
          </button>
        </form>
        {error && <div className="auth-error">{error}</div>}
        <div className="auth-foot">
          <span className="muted">{TEXTS.LOGIN.DEMO_LABEL}</span> admin@music.com · 1234
        </div>
      </div>
    </div>
  )
}
