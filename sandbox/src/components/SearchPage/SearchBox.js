import {React, useState} from 'react'
import axios from 'axios'
//import '../LoginPage/LoginPage.css'
import './SearchBox.css'
import { Link } from 'react-router-dom'
import { Location } from 'react-router-dom'

function AlbumPreview({image, name, artist}) {
    return (
        <div className='albumPreviews'>
            <img alt='albumCoverPreview' src={image}></img>
            <div className='previewText'>
                <p className='previewName'>{name}</p>
                <p className='previewArtist' id='artist'>{artist}</p>
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



export function SearchBox() {
    const [searchResults, setSearchResults] = useState([]);
    const [albumName, SetAlbumName] = useState('');

    const handleInputChange = (event) => {
        SetAlbumName(event.target.value);
    }

    const getSearchResults = () => {
        if (!albumName) {
            return;
        }

        axios.get('http://localhost:8080/getAlbumSearchResults?name='+albumName)
        .then((response) => {
            setSearchResults(response.data);
        })
        .catch((error => {
            console.error(error);
        }))
    }
    

    return (
        <div className="searchBox">
            <p> Search Album Here: </p>
            <input type='text' onChange={handleInputChange}></input>
            <button className='searchButton' onClick={getSearchResults}> Find Album </button>
            <SearchResults data={searchResults} />
        </div>
    );
}
