import {Component} from 'react'
import CastMembers from '../CastMembers'
import './index.css'

class MoviePage extends Component {
  state = {data: [], cast: []}

  componentDidMount() {
    this.getMovieData()
    this.getMovieCast()
  }

  getMovieCast = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=b9eacb52c8666ad78aa34501c81fbe03&language=en-US`
    const response = await fetch(url)
    const data = await response.json()
    const updatedData = data.cast.map(items => ({
      oname: items.name,
      character: items.character,
      oposter: `https://image.tmdb.org/t/p/w500${items.profile_path}`,
    }))
    this.setState({cast: updatedData})
    console.log(updatedData)
  }

  getMovieData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=b9eacb52c8666ad78aa34501c81fbe03&language=en-US`
    const response = await fetch(url)
    const data = await response.json()
    const space = ', '
    const updateData = {
      name: data.original_title,
      rating: data.vote_average,
      date: data.release_date,
      poster: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
      duration: data.runtime,
      genre: data.genres.map(l => l.name + space),
      overview: data.overview,
      tagline: data.tagline,
      homepage: data.homepage,
    }
    // console.log(updateData.genre)
    this.setState({data: updateData})
  }

  render() {
    const {data, cast} = this.state
    const {date, duration, genre, name, overview} = data
    const {poster, rating, tagline} = data
    // const {oname, character, oposter} = cast
    return (
      <>
        {data.length !== 0 && cast.length !== 0 && (
          <div className="mainBox">
            <div className="leftbox">
              <img className="imgPoster" src={poster} alt={name} />
            </div>
            <div className="rightbox">
              <h1>
                {name}
                <span className="spantitle">({date.slice(0, 4)})</span>
              </h1>
              <p>Genre: {genre}</p>
              <p className="tagline">{tagline}</p>
              <p>Duration: {duration} mins</p>
              <p>Rating: {rating.toFixed(1)}</p>
              <p>Released Date : {date}</p>
              <h3>Overview</h3>
              <p className="overview">{overview}</p>
              <h2>Cast</h2>
              <ul className="castmem">
                {cast.map(items => (
                  <CastMembers items={items} key={items.oname} />
                ))}
              </ul>
            </div>
          </div>
        )}
      </>
    )
  }
}

export default MoviePage
