import { LoginHeader} from "../LoginPage/LoginHeader";
import { SearchBox } from "./SearchBox";
import './SearchPage.css'

function SearchPage() {
    return (
        <div className="searchPage">
            <LoginHeader/>
            <SearchBox />
        </div>
    )
}


export default SearchPage;