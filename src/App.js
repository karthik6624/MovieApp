import React from 'react';
import { useState,useEffect } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';
const API_URL='http://www.omdbapi.com?apikey=d62ba591';

// const movie1={
//     "Title": "Miles Morales Ultimate Spiderman",
//     "Year": "2021",
//     "imdbID": "tt14311386",
//     "Type": "movie",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BNmMzODkwNDktMTkyMy00MmU5LWE4MGMtYzIzZjdjNmJiZDRiXkEyXkFqcGdeQXVyNDU1NDQ0NzE@._V1_SX300.jpg"
// }

const App=()=>{

    const [movies,setMovies]=useState([]);
    const [searchterm,setsearchterm]=useState('');
    const searchMovies=async(title)=>{
        const response=await fetch(`${API_URL}&s=${title}`);
        const data=await response.json();
        setMovies(data.Search);
    }
    useEffect(()=>{
        searchMovies('SpiderMan');
    },[])

    return (
        <div className="app">
            <h1>MovieMazaa</h1>
            <div className="search">
                <input placeholder="Search for movies" value={searchterm} onChange={(e)=>setsearchterm(e.target.value)}/>
                <img src={SearchIcon} alt="Search" onClick={()=>searchMovies(searchterm)}/>
            </div>

            {
                movies?.length>0
                ?(
                    <div className="container">
                        {movies.map((movie)=>(
                            <MovieCard movie={movie}/>
                        ))
                    }
                    </div>
                ):(
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )
            }
        </div>
    );
}
export default App;