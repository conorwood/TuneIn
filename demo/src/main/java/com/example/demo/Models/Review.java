package com.example.demo.Models;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ElementCollection
    private List<String> favoriteSongs;
    private String reviewText;
    private String albumName;

    private String albumId;

    private String coverArtUrl;

    private int rating;

    public Review () {

    }
    public Review (String reviewText, String albumName)
    {
        this.albumName = albumName;
        this.reviewText = reviewText;
    }

    public Review (String reviewText, String albumName, String albumId) {
        this.albumName = albumName;
        this.reviewText = reviewText;
        this.albumId = albumId;
    }

    public Review (String reviewText, String albumName, String albumId, String coverArtUrl, List<String> favoriteSongs) {
        this.albumName = albumName;
        this.reviewText = reviewText;
        this.albumId = albumId;
        this.coverArtUrl = coverArtUrl;
        this.favoriteSongs = favoriteSongs;
    }

    public String getReviewText() {
        return reviewText;
    }

    public void setReviewText(String reviewText) {
        this.reviewText = reviewText;
    }

    public String getAlbumName() {
        return albumName;
    }

    public void setAlbumName(String albumName) {
        this.albumName = albumName;
    }

    public String getAlbumId() {
        return albumId;
    }

    public void setAlbumId(String albumId) {
        this.albumId = albumId;
    }

    public String getCoverArtUrl() {
        return coverArtUrl;
    }

    public void setCoverArtURL(String coverArtUrl) {
        this.coverArtUrl = coverArtUrl;
    }

    public List<String> getFavoriteSongs() {
        return favoriteSongs;
    }

    public void setFavoriteSongs(List<String> favoriteSongs) {
        this.favoriteSongs = favoriteSongs;
    }

    public int getRating() { return this.rating; }

    public void setRating(int rating) { this.rating = rating; }


}
