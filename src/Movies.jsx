import React, { useEffect, useState } from 'react'
import './Movies.css'
import MovieModel from './Components/MovieModel'

function Movies() {
  const[loading,setLoading]=useState(false)
  const[selectedgenere,setSelectedgenere]=useState('All')
  const[movies,SetMovies]=useState([])
  const[search,setSearch]=useState('')
  const[sort,setSort]=useState('title')
  const[genre,setgenre]=useState([])
  const[selectedmovie,setSelectedMovie]=useState(null)
  const API_KEY = import.meta.env.VITE_TMDB_KEY;

  
 useEffect(() => {
  const fetchmovies = async () => {
    try {
      
      const url = search
        ? `https://api.themoviedb.org/3/search/movie?query=${search}&api_key=${API_KEY}`
        : `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

      const res = await fetch(url); 
      const data = await res.json();
      SetMovies(data.results);
      console.log(data.results);
    } catch (err) {
      console.error(err);
    }
  };

  fetchmovies();
}, [search]);


 useEffect(() => {
  const fetchGenres = async () => {
    try {
      const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);
      const data = await res.json();
      setgenre(data.genres);
      console.log(data.genres);
    } catch (err) {
      console.error(err);
    }
  };

  fetchGenres();
}, []);


  const genreMap=Object.fromEntries(genre.map(g=>[g.id,g.name]))

      const getlabel=(rating)=>{
    if(rating >=9) return 'block-buster'
    else if(rating >=8) return 'super-hit'
    else if(rating >=7) return 'hit'
    else return 'Avarage'
  }




  return (
    
   
    <div className='main-content'>
      <h2>Unlimited movies</h2>
          <div className='search-box'>
             <input type="text" placeholder='search' value={search} onChange={(e)=>setSearch(e.target.value)} />
        </div>
        {movies.length===0&&
        <p>No result Result found for search {search}</p>
       
        
        }
       
        
      <div className='movie-grid'>
    
        {
          movies.map(movies=>(
            <div className={`movie-card ${movies.vote_average}`} key={movies.id} onClick={()=>setSelectedMovie(movies)} >
              <img className='movie-image' src={`https://image.tmdb.org/t/p/w500${movies.poster_path}`} alt={`${movies.name} poster`} />
                
              <h3 className='movie-title'>{movies.title}</h3>
              <p>{movies.original_title}</p>
              <p className='movie-year'>{movies.release_date}</p>
              <p className='movie-genre'>{movies.genre_ids.map(g=>genreMap[g]).join(' ,')}</p>
              <div className={`movie-rating rating-${getlabel(movies.vote_average)}`}>
                {movies.vote_average}/10
              </div>
            </div>
          ))
        }
        {
          selectedmovie &&(
            <>
            <MovieModel
             genre={genreMap} 
             movie={selectedmovie}
             onClose={()=>setSelectedMovie(null)}
            />
            </>
          )
        }
        

      </div>
      
      
    </div>
     
  )
}

export default Movies
