package com.example.demo.Controllers;

import com.example.demo.Models.AlbumInfo;
import com.example.demo.Services.FirebaseAuthenticationService;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import org.apache.hc.core5.http.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import se.michaelthelin.spotify.SpotifyApi;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.model_objects.credentials.ClientCredentials;
import se.michaelthelin.spotify.model_objects.specification.Album;
import se.michaelthelin.spotify.model_objects.specification.AlbumSimplified;
import se.michaelthelin.spotify.model_objects.specification.Paging;
import se.michaelthelin.spotify.requests.authorization.client_credentials.ClientCredentialsRequest;
import se.michaelthelin.spotify.requests.data.albums.GetAlbumRequest;
import se.michaelthelin.spotify.requests.data.search.simplified.SearchAlbumsRequest;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/albums")
@CrossOrigin
public class AlbumController {

    private static final String clientId = "f119f4813d174ae3a24471d38e913b61";
    private static final String clientSecret = "d635a715f58c4199bfeeca73bb7c9a39";

    private static final SpotifyApi spotifyApi = new SpotifyApi.Builder()
            .setClientId(clientId)
            .setClientSecret(clientSecret)
            .build();

    private static final ClientCredentialsRequest clientCredentialsRequest = spotifyApi.clientCredentials().build();

    @Autowired
    private FirebaseAuthenticationService firebaseAuthenticationService;


    @Autowired
    public AlbumController() {

    }

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
    public List<AlbumInfo> getAlbumSearchResults(@RequestParam("name") String name, @RequestHeader("Authorization") String token) {
        List<AlbumInfo> response = new ArrayList<>();

        String firebaseIdToken = token.replace("Bearer ", "");
        FirebaseToken decodedToken = null;
        try {
            decodedToken = firebaseAuthenticationService.verifyFirebaseToken(firebaseIdToken);
        } catch (Exception e) {
            System.out.println(e);
        }

        // Now you can use the 'firebaseIdToken' for authentication or other purposes.
        // Example: Verify the token using Firebase Authentication SDK

        // Access user information from the decoded token
        String uid = decodedToken.getUid();
        String email = decodedToken.getEmail();
//        System.out.println(decodedToken);
//        System.out.println(uid);
//        System.out.println(email);

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


}
