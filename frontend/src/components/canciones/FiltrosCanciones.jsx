import PropTypes from "prop-types"
import { TEXTS } from "../../config/texts"

const T = TEXTS.CANCIONES

export default function FiltrosCanciones({ fTitulo, fArtista, fMood, onTitulo, onArtista, onMood, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="row filters">
      <input className="input" placeholder={T.FILTER_TITULO} value={fTitulo} onChange={e => onTitulo(e.target.value)} />
      <input className="input" placeholder={T.FILTER_ARTISTA} value={fArtista} onChange={e => onArtista(e.target.value)} />
      <input className="input" placeholder={T.FILTER_MOOD} value={fMood} onChange={e => onMood(e.target.value)} />
      <button className="btn" type="submit">{T.FILTER_SUBMIT}</button>
    </form>
  )
}

FiltrosCanciones.propTypes = {
  fTitulo: PropTypes.string.isRequired,
  fArtista: PropTypes.string.isRequired,
  fMood: PropTypes.string.isRequired,
  onTitulo: PropTypes.func.isRequired,
  onArtista: PropTypes.func.isRequired,
  onMood: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}
