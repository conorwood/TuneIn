import './LoginPage.css'
import { LoginHeader } from './LoginHeader'
import { LoginBox } from './LoginBox'

function LoginPage(props) {
    return (
        <div className="loginPage">
            <LoginHeader />
            <LoginBox handleSignIn={props.handleSignIn}/>
        </div>
    )
}


export default LoginPage;