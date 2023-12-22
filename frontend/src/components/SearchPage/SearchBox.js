import {React, useState} from 'react'
import axios from 'axios'
//import '../LoginPage/LoginPage.css'
import './SearchBox.css'
import { Link } from 'react-router-dom'
import { Location } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'

function AlbumGridPreview({image, name, artist}) {
    return (
        <div className='flex w-full mb-10 bg-gray-800 p-4 rounded-3xl transition duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105'>
            <img className='w-1/2 h-1/2 mr-5 border-white border-2 rounded-2xl' alt='albumCoverPreview' src={image}></img>
            <div className='flex flex-col items-center justify-center text-center'>
                <p className='text-2xl text-white mb-2'>{name}</p>
                <p className='text-lg text-neutral-400' id='artist'>{artist}</p>
            </div>
        </div>
    )
}

function AlbumListPreview({image, name, artist}) {
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

function GridListView(props) {
    const [grid, setGrid] = useState(false);
    const handleGridClick = () => {
        props.setGridView(true);
        setGrid(true)
    };
    
      const handleListClick = () => {
        props.setGridView(false);
        setGrid(false)
    };

    return (
        <div className="inline-flex space-x-2 bg-white rounded-md p-2 transition-all duration-300 m-3">
            <button
                onClick={handleGridClick}
                className={`p-2 rounded-md ${grid ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" dataSlot="icon" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                </svg>
            </button>
            <button
                onClick={handleListClick}
                className={`p-2 rounded-md ${!grid ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" dataSlot="icon" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
            </button>
        </div>
    )
    
}

function SearchResults({data}) {
    const [isGridView, setGridView] = useState(true);

    return (
        <div className="">
            {data.length !== 0 ? (<GridListView setGridView={setGridView} isGridView={isGridView}/>)
            : (<div></div>)}
            {isGridView ? (
            <ul className="grid grid-cols-3 gap-4">
                {data.map((data, idx) => (
                    <li key={data.id}>
                        <Link to={`/album/${data.id}`} className='link'>
                         <AlbumGridPreview image={data.coverArtUrl} name={data.name} artist={data.artist}/>
                        </Link>
                    </li>
                ))}
            </ul> ) : 
            (
                <ul>
                    {data.map((data, idx) => (
                        <li key={data.id}>
                            <Link to={`/album/${data.id}`} className='link'>
                            <AlbumListPreview image={data.coverArtUrl} name={data.name} artist={data.artist}/>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
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
