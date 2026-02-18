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
  
  
  useEffect(()=>{
    const fetchmovies=async()=>{
      const url=search?`https://api.themoviedb.org/3/search/movie?query=${search}`:`https://api.themoviedb.org/3/movie/popular`
      const res=await fetch(url,{
        method: "GET",
        headers:{
          Authorization:'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NDhhYzliYTUzY2IxNTBjNWM0ZjU0MTU0YWE3ZWQ2OSIsIm5iZiI6MTc2NDU4MzM5NS4yMzcsInN1YiI6IjY5MmQ2N2UzMDRjZTU3MGY5YWRjMzFiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vwgqioos8hJomiBxWpAZxtXpH54L-WgJ0pbwmGOLVSI',
          'Content-Type':'application/json'
          
        }
      })
      const data=await res.json()
      SetMovies(data.results)
      console.log(data.results);
      

    
    }
    fetchmovies()
    console.log(movies);
    
  },[search])

  useEffect(()=>{
    const genre=async()=>{
      const res=await fetch(`https://api.themoviedb.org/3/genre/movie/list`,{
        method:'GET',
        headers:{
          Authorization:'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NDhhYzliYTUzY2IxNTBjNWM0ZjU0MTU0YWE3ZWQ2OSIsIm5iZiI6MTc2NDU4MzM5NS4yMzcsInN1YiI6IjY5MmQ2N2UzMDRjZTU3MGY5YWRjMzFiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vwgqioos8hJomiBxWpAZxtXpH54L-WgJ0pbwmGOLVSI',
          

        }
        

      })
      const data=await res.json()
      setgenre(data.genres)
      console.log(data);
      
      
    }
    genre()

  },[])

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
