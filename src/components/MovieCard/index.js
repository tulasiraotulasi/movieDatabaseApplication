import {Link} from 'react-router-dom'
// import {LiaStarSolid} from 'react-icons/lia'<LiaStarSolid />
import './index.css'

const MovieCard = props => {
  const {items} = props
  const {name, rating, id, poster} = items

  return (
    <li>
      <div className="card">
        <img className="imgClass" src={poster} alt={name} />
        <div className="cardInner">
          <h1 className="heading">{name}</h1>
          <p className="para">Rating : {rating.toFixed(1)}</p>
          <Link className="linkClass" to={`/movie/${id}`}>
            <button type="button" className="buttonCard">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </li>
  )
}

export default MovieCard
