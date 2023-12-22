import {React, useState} from 'react'
import axios from 'axios'
//import '../LoginPage/LoginPage.css'
import './SearchBox.css'
import { Link } from 'react-router-dom'
import { Location } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'

function AlbumPreview({image, name, artist}) {
    return (
        <div className='flex w-full mb-10 bg-gray-800 p-4 rounded-3xl transition duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105'>
            <img className='max-w-96 h-auto mr-5 border-white border-2 rounded-2xl' alt='albumCoverPreview' src={image}></img>
            <div className='flex flex-col items-center justify-center p-7 flex-1 text-center'>
                <p className='text-8xl text-white mb-5'>{name}</p>
                <p className='text-3xl text-neutral-400' id='artist'>{artist}</p>
            </div>
        </div>
    )
}

function SearchResults({data}) {
    return (
        <div className="searchResults">
            <ul>
                {data.map((data, idx) => (
                    <li key={data.id}>
                        <Link to={`/album/${data.id}`} className='link'>
                         <AlbumPreview image={data.coverArtUrl} name={data.name} artist={data.artist}/>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}



export function SearchBox(props) {
    const [searchResults, setSearchResults] = useState([]);
    const [albumName, SetAlbumName] = useState('');
    const user = props.user;
    const access_token = user.accessToken;

    const handleInputChange = (event) => {
        SetAlbumName(event.target.value);
    }

    const getSearchResults = () => {
        if (!albumName) {
            return;
        }
        console.log(`user: ${user.displayName}`);
        axios.get('http://localhost:8080/albums/getAlbumSearchResults?name=' + albumName, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    })
        .then((response) => {
            setSearchResults(response.data);
        })
        .catch((error => {
            console.error(error);
        }))
    }
    

    return (
        <div className="w-3/4">
            <p className='text-white text-5xl font-bold m-10'> Search Album Here: </p>
            <div className='flex items-center justify-center mb-4 relative mx-auto w-2/3'>
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                </div>
                <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Albums..." required onChange={handleInputChange}></input>
                <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={getSearchResults}>Search</button>
            </div>
            <SearchResults data={searchResults} />
        </div>
    );
}
