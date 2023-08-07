import spotify_logo from './spotify_logo.png';

export function LoginBox() {
    return (
        <div className="loginBox">
            <img src={spotify_logo} alt="spotify logo"></img>
            <button className='loginButton'> Login With Spotify </button>
        </div>
    );
}
