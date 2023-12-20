import {Link} from 'react-router-dom';

export function LoginHeader(props) {
    return (
        <div className="loginHeader">
            <h1>Music Ranker </h1>
            <ul>
                <li className='navbar-item'>
                    <Link to='/search'> Search Albums</Link>
                </li>
                <li className='navbar-item'>
                    <Link to='/reviews'> Reviews </Link>
                </li>
                <li className='logout-btn'>
                    <button onClick={props.logOut}>
                        Sign Out
                    </button>
                </li>
            </ul>
        </div>
    );
}
