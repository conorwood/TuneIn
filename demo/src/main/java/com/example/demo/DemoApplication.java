package com.example.demo;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonArray;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.michaelthelin.spotify.SpotifyApi;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.model_objects.credentials.ClientCredentials;
import se.michaelthelin.spotify.model_objects.specification.Album;
import se.michaelthelin.spotify.model_objects.specification.AlbumSimplified;
import se.michaelthelin.spotify.model_objects.specification.Paging;
import se.michaelthelin.spotify.model_objects.specification.TrackSimplified;
import se.michaelthelin.spotify.requests.authorization.client_credentials.ClientCredentialsRequest;
import org.apache.hc.core5.http.ParseException;
import java.io.IOException;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import se.michaelthelin.spotify.requests.data.albums.GetAlbumRequest;
import se.michaelthelin.spotify.requests.data.search.simplified.SearchAlbumsRequest;

import javax.swing.text.html.Option;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@SpringBootApplication
@RestController
@CrossOrigin
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	private static final String clientId = "f119f4813d174ae3a24471d38e913b61";
	private static final String clientSecret = "d635a715f58c4199bfeeca73bb7c9a39";

	//private static final String id = "5zT1JLIj9E57p3e1rFm9Uq";
	private static final String id = "0gA0nZrZ55PLUp7ARfrICu";

	private final ReviewRepository reviewRepository;

	@Autowired
	public DemoApplication(ReviewRepository reviewRepository) {
		this.reviewRepository = reviewRepository;
	}



	@GetMapping("/")
	public List<String> hello() {
		return List.of("Hello", "World");
	}


	private static final SpotifyApi spotifyApi = new SpotifyApi.Builder()
			.setClientId(clientId)
			.setClientSecret(clientSecret)
			.build();
	private static final ClientCredentialsRequest clientCredentialsRequest = spotifyApi.clientCredentials()
			.build();

//	private static final GetAlbumRequest getAlbumRequest = spotifyApi.getAlbum(id)
//			.build();

	public static void clientCredentials_Sync() {
		try {
			final ClientCredentials clientCredentials = clientCredentialsRequest.execute();

			// Set access token for further "spotifyApi" object usage
			spotifyApi.setAccessToken(clientCredentials.getAccessToken());

			System.out.println("Expires in: " + clientCredentials.getExpiresIn());
		} catch (IOException | SpotifyWebApiException | ParseException e) {
			System.out.println("Error: " + e.getMessage());
		}
	}

	@GetMapping("/album")
	public List<String> getAlbum(){
		List<String> response = new ArrayList<>();

		try {

			clientCredentials_Sync();
			GetAlbumRequest getAlbumRequest = spotifyApi.getAlbum(id)
					.build();
			final Album album = getAlbumRequest.execute();
			//JsonArray response = new JsonArray();

			for (var v : album.getTracks().getItems()) {
				System.out.println(v.getName());
				response.add(v.getName());
			}
			//System.out.println("Name: " + album.getName());
 			return (response);

		} catch (IOException | SpotifyWebApiException | ParseException e) {
			System.out.println("Error: " + e.getMessage());
			return response;
			//return ("Error: " + e.getMessage());
		}
	}

	@GetMapping("/wunna")
	public List<String> getWunna() {
		List<String> response = new ArrayList<>();
		String q = "WUNNA";
		try {
			clientCredentials_Sync();
			SearchAlbumsRequest searchAlbumsRequest = spotifyApi.searchAlbums(q).build();

			final Paging<AlbumSimplified> albumSimplifiedPaging = searchAlbumsRequest.execute();

			for (var v:
				 albumSimplifiedPaging.getItems()) {
				response.add(v.getId());
				//response.add(v.getName());
			}
			System.out.println("Total: " + albumSimplifiedPaging.getTotal());
			return  response;
		} catch (IOException | SpotifyWebApiException | ParseException e) {

			System.out.println("Error: " + e.getMessage());
			return null;
		}
	}


	@GetMapping("/getAlbum")
	public AlbumInfo GetAlbumById(@RequestParam("id") String id) {
		List<String> response = new ArrayList<>();

		try {
			clientCredentials_Sync();

			GetAlbumRequest getAlbumRequest = spotifyApi.getAlbum(id)
					.build();
			final Album album = getAlbumRequest.execute();
			//System.out.println(album);

			for (var v : album.getTracks().getItems()) {
				System.out.println(v.getName());
				response.add(v.getName());
			}

			AlbumInfo albumInfo = new AlbumInfo(album.getImages()[0].getUrl(), response, album.getArtists()[0].getName(), album.getName(), album.getId());

			return albumInfo;
			//return response;


		} catch (IOException | SpotifyWebApiException | ParseException e) {

			System.out.println("Error: " + e.getMessage());
			return null;
		}
	}

	@GetMapping("/albums")
	public AlbumInfo searchAlbumByName(@RequestParam("name") String albumName) {
		//List<String> response = new ArrayList<>();
		String albumID;
		List<String> response = new ArrayList<>();

		try {
			clientCredentials_Sync();
			SearchAlbumsRequest searchAlbumsRequest = spotifyApi.searchAlbums(albumName).build();

			final Paging<AlbumSimplified> albumSimplifiedPaging = searchAlbumsRequest.execute();
			albumID = albumSimplifiedPaging.getItems()[0].getId();

			GetAlbumRequest getAlbumRequest = spotifyApi.getAlbum(albumID)
					.build();
			final Album album = getAlbumRequest.execute();
			System.out.println(album);

			for (var v : album.getTracks().getItems()) {
				System.out.println(v.getName());
				response.add(v.getName());
			}

			AlbumInfo albumInfo = new AlbumInfo(album.getImages()[0].getUrl(), response, album.getArtists()[0].getName(), album.getName(), album.getId());

			return albumInfo;
			//return response;


		} catch (IOException | SpotifyWebApiException | ParseException e) {

			System.out.println("Error: " + e.getMessage());
			return null;
		}

	}

	@GetMapping("getAlbumSearchResults")
	public List<AlbumInfo> getAlbumSearchResults(@RequestParam("name") String name) {
		List<AlbumInfo> response = new ArrayList<>();

		try {
			clientCredentials_Sync();
			SearchAlbumsRequest searchAlbumsRequest = spotifyApi.searchAlbums(name).build();
			clientCredentials_Sync();

			final Paging<AlbumSimplified> albumSimplifiedPaging = searchAlbumsRequest.execute();

			for (var v: albumSimplifiedPaging.getItems())
			{
				System.out.println(v.getArtists()[0].getName());
				response.add(new AlbumInfo(v.getImages()[0].getUrl(), v.getArtists()[0].getName(),v.getName(), v.getId()));
			}
			return response;
		}

		catch (IOException | SpotifyWebApiException | ParseException e) {
			System.out.println("Error: " + e.getMessage());
			return null;
		}
	}

	@PostMapping("submitReview")
	public ResponseEntity<String> submitReview(@RequestBody Review review) {
		Optional<Review> testReview = reviewRepository.findByAlbumName(review.getAlbumName());

		if (testReview.isPresent()) {
			Review reviewUpdate = testReview.get();
			reviewUpdate.setReviewText(review.getReviewText());
			reviewUpdate.setFavoriteSongs(review.getFavoriteSongs());
			reviewRepository.save(reviewUpdate);
			//return ResponseEntity.ok("Review Updated!");
		}

		else if (testReview.isEmpty()) {
			//System.out.println(review.getReviewText() + " " + review.getAlbumName());
			reviewRepository.save(review);
			//return ResponseEntity.ok("Review submitted");
		}
		return ResponseEntity.ok("Review submitted");
	}


	@GetMapping("getReviews")
	public List<Review> getReviews() {
		return reviewRepository.findAll();
	}

	@GetMapping("findReview")
	public Boolean findReview(@RequestParam("albumName") String albumName) {
		boolean exists = reviewRepository.existsByAlbumName(albumName);

		return exists;
	}


	@GetMapping("findReview1")
	public ResponseEntity<?> findReview1(@RequestParam("albumId") String albumId) {
		Optional<Review> review = reviewRepository.findByAlbumId(albumId);

		if (review.isPresent()) {
			return ResponseEntity.ok(review.get());
		}

		else {
			return ResponseEntity.notFound().build();
		}
	}
}
