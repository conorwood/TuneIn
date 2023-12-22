import {Link} from 'react-router-dom';

export function LoginHeader(props) {
    return (
        <div className="loginHeader">
            <h1 className='font-semibold text-xl tracking-tight'>Music Ranker </h1>
            <ul>
                <li className='navbar-item'>
                    <Link to='/search'> Search Albums</Link>
                </li>
                <li className='navbar-item'>
                    <Link to='/reviews'> Reviews </Link>
                </li>
                <li>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={props.logOut}> Log Out </button>
                </li>
            </ul>
        </div>
    );
}
