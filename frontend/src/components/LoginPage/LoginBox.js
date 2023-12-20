import spotify_logo from './spotify_logo.png';

export function LoginBox({handleSignIn}) {
    return (
        <div className="loginBox">
            <img src={spotify_logo} alt="spotify logo"></img>
            <button className='loginButton' onClick={handleSignIn}> Login With Google </button>
        </div>
    );
}
