import { LoginHeader } from "../LoginPage/LoginHeader"
import { useParams } from "react-router-dom";
import { ReviewBox } from './ReviewBox';
import { useState, useEffect } from "react";
import axios from 'axios';
//import album_cover from './speak_now.png'
import '../LoginPage/LoginPage.css'
import './AlbumPage.css'


function AlbumInfo() {
    const params = useParams();
    const [tracks, setTracks] = useState([]);
    const [albumName, setAlbumName] = useState('');
    const [coverArtUrl, setCoverArtUrl] = useState('');
    const [artistName, setArtistName] = useState('');
    const [review, setReview] = useState('');
    const [albumId, setAlbumId] = useState('');


    useEffect(() => {
        axios.get('http://localhost:8080/findReview1?albumId='+params.id)
        .then((response) => {
            if (response.status === 200) {
                //window.alert("Review already added");
                console.log("Review added");
                setReview(response.data.reviewText)
            }
            else if (response.status === 404) {
                console.log("No review added yet");
            }
        })
        .catch((error) => {
            console.error(error);
        });
    }, [params.name]);

    useEffect(() => {
        //axios.get('http://localhost:8080/albums?name='+params.name)
        console.log(params.id);
        axios.get('http://localhost:8080/getAlbum?id='+params.id)
            .then((response) => {
                //window.alert(response.data);
                setTracks(response.data.tracks);
                setAlbumName(response.data.name);
                setCoverArtUrl(response.data.coverArtUrl);
                setArtistName(response.data.artist);
                setAlbumId(response.data.id);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [params.name]);

    const handleReviewChange = (event) => {
        setReview(event.target.value);
    } 

    const handleSaveReview = () => {
        if (!review) {
            return;
        }

        const reviewData = { 
            reviewText: review,
            albumName: albumName,
            albumId: albumId
        };

        axios.post('http://localhost:8080/submitReview', reviewData)
            .then((response) => {
                window.alert('Review saved!');
            })
            .catch((error) => {
                console.error('Error saving: ', error);
            })
    };


    return (
        <div className="albumWrapper" >
            <div className="albumInfo" >
                <div className="album">
                    <h2 id="album-name">{albumName}</h2>
                    <h2 id="artist-name">{artistName}</h2>
                    <img id="cover-art" alt='Cover Art' src={coverArtUrl} ></img>
                </div>
                <div className="tracks-info">
                    <h2 id="tracks">Tracks:</h2>
                    <ol id="track-list">
                        {tracks.map((track, idx) => (
                            <li key={idx}>{track}</li>
                        ))}
                    </ol>
                </div>
               
            </div>
            < ReviewBox 
                    review={review}
                    onReviewChange={handleReviewChange}
                    onSaveReview={handleSaveReview}
            />
        </div>
    )
}



function AlbumPage() {
    return (
        <div className="albumPage">
            <LoginHeader />
            <AlbumInfo />
        </div>
    )
}

export default AlbumPage;