import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import { LoginHeader } from "../LoginPage/LoginHeader";

export default function AlbumPlaceHolder() {
    const params = useParams();
    const [tracks, setTracks] = useState([]);
    const [albumName, setAlbumName] = useState('');
    const [coverArtUrl, setCoverArtUrl] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/albums/albums?name='+params.name)
            .then((response) => {
                setTracks(response.data.tracks);
                setAlbumName(response.data.name);
                setCoverArtUrl(response.data.coverArtUrl);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);


    return (
        <div className="albumPlaceHolder" >
            <h1>Album Page</h1>
            <img alt='Cover Art' src={coverArtUrl} ></img>
            <p>{albumName}</p>

            <h2>Tracks:</h2>
            <ol>
                {tracks.map((track, idx) => (
                    <li key={idx}>{track}</li>
                ))}
            </ol>
        </div>
    )
}