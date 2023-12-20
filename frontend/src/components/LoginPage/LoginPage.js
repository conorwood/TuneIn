import './LoginPage.css'
import { LoginHeader } from './LoginHeader'
import { LoginBox } from './LoginBox'

function LoginPage({handleSignIn}) {
    return (
        <div className="loginPage">
            <LoginHeader />
            <LoginBox handleSignIn={handleSignIn}/>
        </div>
    )
}


export default LoginPage;