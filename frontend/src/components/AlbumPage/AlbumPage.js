import { LoginHeader } from "../LoginPage/LoginHeader"
import { useParams } from "react-router-dom";
import { ReviewBox } from './ReviewBox';
import { PreviewReviewBox } from './PreviewReviewBox';
import { useState, useEffect } from "react";
import axios from 'axios';
//import album_cover from './speak_now.png'
import './AlbumPage.css'
import { isEditable } from "@testing-library/user-event/dist/utils";
import { UserAuth } from "../../context/AuthContext";


function AlbumInfo(props) {
    const params = useParams();
    const [tracks, setTracks] = useState([]);
    const [albumName, setAlbumName] = useState('');
    const [coverArtUrl, setCoverArtUrl] = useState('');
    const [artistName, setArtistName] = useState('');
    const [review, setReview] = useState('');
    const [albumId, setAlbumId] = useState('');
    const [favTracks, setFavTracks] = useState([]);
    const [reviewBoxExpanded, setReviewBoxExpanded] = useState(false);
    const [hasReview, setHasReview] = useState(false);
    const [canEdit, setCanEdit] = useState(false);
    const [rating, setRating] = useState(0);


    useEffect(() => {
        axios.get('http://localhost:8080/review/findReview1?albumId='+params.id)
        .then((response) => {
            if (response.status === 200) {
                console.log("Review added");
                setReview(response.data.reviewText)
                setFavTracks(response.data.favoriteSongs)
                setHasReview(true);
                setRating(response.data.rating)
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
        console.log(params.id);
        axios.get('http://localhost:8080/albums/getAlbum?id='+params.id)
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

        console.log(props.user.accessToken);

        const reviewData = { 
            reviewText: review,
            albumName: albumName,
            albumId: albumId,
            coverArtUrl: coverArtUrl,
            favoriteSongs: favTracks,
            rating: rating
        };

        const headers = {
            'Authorization': `Bearer ${props.user.accessToken}`,
        };

        axios.post('http://localhost:8080/review/submitReview', reviewData, { headers: headers })
            .then((response) => {
                setHasReview(true);
                setCanEdit(false);
                console.log('Review saved!');
            })
            .catch((error) => {
                console.error('Error saving: ', error);
            })
    };

    const handleTrackClick = (track) => {
        if (canEdit && !favTracks.includes(track)) {
            setFavTracks([...favTracks, track]);
        }

        console.log(favTracks);
    }


    const handleToggleReviewBox = () => {
        setReviewBoxExpanded(!reviewBoxExpanded);
    }

    const handleNewReviewClick = () => {
        setHasReview(true);
        setCanEdit(true);
    }

    const handleEditReview = () => {
        setCanEdit(true);
    }

    const handleDeleteFavoriteTrack = (trackToDelete) => {
        setFavTracks((prevTracks) => prevTracks.filter((track) => track !== trackToDelete));
    }

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
                            <li key={idx}>
                                {track} 
                                {canEdit && (
                                    <button id="addTrackButton" onClick={() => handleTrackClick(track)}>+</button>
                                )}
                            </li>
                        ))}
                    </ol>
                </div>
               
            </div>
            <div className="reviewSection">
                {hasReview && !canEdit ? (
                        <div className="preview">
                            < PreviewReviewBox 
                                review={review}
                                rating={rating}
                                favTracks={favTracks}
                            />
                            <button className="editReviewButton" onClick={handleEditReview}>Edit Review</button>
                        </div>
                    ) : canEdit ? (
                        <ReviewBox
                            review={review}
                            onReviewChange={handleReviewChange}
                            onSaveReview={handleSaveReview}
                            favTracks={favTracks}
                            handleDeleteFavoriteTrack={handleDeleteFavoriteTrack}
                            rating={rating}
                            setRating={setRating}
                        />
                    ) : (
                        <div className="newReviewButton">
                            <button onClick={handleNewReviewClick}>+ Add Review</button>
                        </div>
                    )}
            </div>
        </div>
    )
}


function AlbumPage() {
    const { user } = UserAuth();
    return (
        <div className="albumPage">
            <LoginHeader />
            <AlbumInfo user={user}/>
        </div>
    )
}

export default AlbumPage;