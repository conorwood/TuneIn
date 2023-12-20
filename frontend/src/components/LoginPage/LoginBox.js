import spotify_logo from './spotify_logo.png';

export function LoginBox(props) {
    return (
        <div className="loginBox">
            <img src={spotify_logo} alt="spotify logo"></img>
            <button className='loginButton' onClick={props.handleSignIn}> Login With Google </button>
        </div>
    );
}
