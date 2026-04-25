import PropTypes from "prop-types"
import { TEXTS } from "../../config/texts"

const T = TEXTS.CANCIONES

export default function FormCancion({ titulo, artista, estadoDeAnimo, enviando, onTitulo, onArtista, onMood, onSubmit }) {
  return (
    <div className="card">
      <div className="section-title">{T.ADD_TITLE}</div>
      <form onSubmit={onSubmit} className="row add">
        <input className="input" placeholder={T.PLACEHOLDER_TITULO} value={titulo} onChange={e => onTitulo(e.target.value)} />
        <input className="input" placeholder={T.PLACEHOLDER_ARTISTA} value={artista} onChange={e => onArtista(e.target.value)} />
        <input className="input" placeholder={T.PLACEHOLDER_MOOD} value={estadoDeAnimo} onChange={e => onMood(e.target.value)} />
        <button className="btn btn-primary" type="submit" disabled={enviando}>
          {enviando ? T.ADD_SUBMIT_LOADING : T.ADD_SUBMIT}
        </button>
      </form>
      <div className="help">{T.ADD_HELP}</div>
    </div>
  )
}

FormCancion.propTypes = {
  titulo: PropTypes.string.isRequired,
  artista: PropTypes.string.isRequired,
  estadoDeAnimo: PropTypes.string.isRequired,
  enviando: PropTypes.bool.isRequired,
  onTitulo: PropTypes.func.isRequired,
  onArtista: PropTypes.func.isRequired,
  onMood: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}
