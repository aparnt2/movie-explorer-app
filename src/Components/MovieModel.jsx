import React, { useEffect, useState } from 'react'
import './MovieModel.css'
import { MdCancel } from "react-icons/md";

function MovieModel({genre,movie,onClose}){
    const [moviekey,setmoviekey]=useState(null)
     const API_KEY = import.meta.env.VITE_TMDB_KEY;

    useEffect(()=>{
       const fetchmovievideo=async ()=>{
                 try{
            const res=await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}`)
            const data=await res.json()
            console.log(data);
           const tailer=data.results.find(v=>v.site === "YouTube" && v.type === "Trailer")
            if(tailer){
                setmoviekey(tailer.key)
            }
            console.log(moviekey);
            

            
        }catch(err){
            console.log(err);
            
        }
       }
       fetchmovievideo()
    },[movie.id])

    return(
        <div className='movie-model'>
        <button className='close' onClick={onClose}><MdCancel className='cancel-btn'/></button>
        <div className='movie-details'>
            {moviekey? <iframe
      width="100%"
      height="450"
      src={`https://www.youtube.com/embed/${moviekey}?autoplay=1&mute=1`}
      title={movie.title}
      frameBorder="0"
      allow="autoplay; encrypted-media"
      allowFullScreen
    />:<img  src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`} alt={movie.title} />}
            <div className='movie-details-section'>
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
            <h4 className='movie-genre'>{movie.genre_ids.map(g=>genre[g]).join(' | ')}</h4>
            <button className='watch-btn'>Watch Now</button>
            </div>
        </div>

    </div>
    )


}
export default MovieModel
