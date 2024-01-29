import {Component} from 'react'
import MovieCard from '../MovieCard'
import './index.css'

class Upcoming extends Component {
  state = {
    UpomingArray: [],
    movies: [],
    currentPage: 1,
    totalPages: 0,
    currentPageMovie: 1,
    totalPagesMovie: 0,
    userInput: '',
  }

  componentDidMount() {
    this.getApiCall()
  }

  getApiCall = async () => {
    const {currentPage} = this.state
    const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=b9eacb52c8666ad78aa34501c81fbe03&language=en-US&page=${currentPage}`

    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    const updatedData = data.results.map(items => ({
      id: items.id,
      name: items.title,
      poster: `https://image.tmdb.org/t/p/w500${items.poster_path}`,
      rating: items.vote_average,
    }))

    this.setState({UpomingArray: updatedData, totalPages: data.total_pages})
  }

  getUserData = () => {
    this.getApiMovieCall()
  }

  getApiMovieCall = async () => {
    const {currentPageMovie, userInput} = this.state
    const url = `https://api.themoviedb.org/3/search/movie?api_key=b9eacb52c8666ad78aa34501c81fbe03&language=en-US&query=${userInput}&page=${currentPageMovie}`
    const response = await fetch(url)
    const data = await response.json()
    console.log(data.results)
    const updatedData = data.results.map(items => ({
      id: items.id,
      name: items.title,
      poster: `https://image.tmdb.org/t/p/w500${items.poster_path}`,
      rating: items.vote_average,
    }))
    console.log(updatedData)
    this.setState({movies: updatedData, totalPagesMovie: data.total_pages})
  }

  backPage = () => {
    const {currentPage} = this.state
    if (currentPage > 1) {
      this.setState(
        prev => ({currentPage: prev.currentPage - 1}),
        this.getApiCall,
      )
    }
  }

  nextPage = () => {
    const {currentPage, totalPages} = this.state
    if (currentPage < totalPages) {
      this.setState(
        prev => ({currentPage: prev.currentPage + 1}),
        this.getApiCall,
      )
    }
  }

  backPageM = () => {
    const {currentPageMovie} = this.state
    if (currentPageMovie > 1) {
      this.setState(
        prev => ({currentPageMovie: prev.currentPageMovie - 1}),
        this.getApiMovieCall,
      )
    }
  }

  nextPageM = () => {
    const {currentPageMovie, totalPagesMovie} = this.state
    if (currentPageMovie < totalPagesMovie) {
      this.setState(
        prev => ({currentPageMovie: prev.currentPageMovie + 1}),
        this.getApiMovieCall,
      )
    }
  }

  updateUser = event => {
    this.setState({userInput: event.target.value})
  }

  render() {
    const {UpomingArray, movies, currentPage, currentPageMovie} = this.state
    const {userInput} = this.state
    return (
      <>
        <div className="header">
          <h1 className="titleName">Upcoming</h1>
          <div className="headright">
            <input
              id="searchBar"
              className="searchBar"
              type="text"
              placeholder="search..."
              value={userInput}
              onChange={this.updateUser}
            />
            <button type="button" className="btn" onClick={this.getUserData}>
              Search
            </button>
          </div>
        </div>
        {movies.length === 0 ? (
          <>
            <ul className="home-container">
              {UpomingArray.map(items => (
                <MovieCard key={items.id} items={items} />
              ))}
            </ul>
            <div className="paginationDiv">
              <button type="button" className="btn" onClick={this.backPage}>
                Back
              </button>
              <p>Page : {currentPage}</p>
              <button type="button" className="btn" onClick={this.nextPage}>
                Next
              </button>
            </div>
          </>
        ) : (
          <>
            <ul className="home-container">
              {movies.map(items => (
                <MovieCard key={items.id} items={items} />
              ))}
            </ul>
            <div className="paginationDiv">
              <button type="button" className="btn" onClick={this.backPageM}>
                Back
              </button>
              <p>Page : {currentPageMovie}</p>
              <button type="button" className="btn" onClick={this.nextPageM}>
                Next
              </button>
            </div>
          </>
        )}
      </>
    )
  }
}

export default Upcoming
