import './LoginPage.css'
import { LoginHeader } from './LoginHeader'
import { LoginBox } from './LoginBox'
import { Transition } from '@headlessui/react'
import { useEffect, useState } from 'react'
import NavBar from '../NavBar/NavBar'
import RightArrow from '../../Images/reshot-icon-right-arrow-button-YAB8GEM7SD-c5f61.svg'


function LoginPage(props) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
        setIsVisible(true);
        }, 300); // Set your desired delay

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <div className="h-full text-white bg-zinc-800">
            {/* <LoginHeader /> */}
            {/* <NavBar /> */}
            <div className='flex w-full h-full items-center justify-center'> 
                <div className='w-1/2 h-full bg-zinc-800'>
                    <Transition
                        className="mx-auto my-16 max-w-md space-y-4 flex flex-col items-center justify-center"
                        show={isVisible}
                        enter="transition-all ease-in-out duration-500 delay-[200ms]"
                        enterFrom="opacity-0 translate-y-6"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition-all ease-in-out duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        >
                    <h1 className='text-4xl font-bold'>Welcome To TuneIn! </h1>
                    <h1 className='text-4xl font-bold'>Sign In To Get Started </h1>
                    <div className='arrow-container animate-bounce-right'>
                        {/* <img src={RightArrow} className='arrow h-10' alt='Right Arrow'></img> */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" dataSlot="icon" className="arrow w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                    </div>

                    </Transition>
                </div>
                <div className='w-1/2'>
                    <LoginBox handleSignIn={props.handleSignIn}/>
                </div>
            </div>
        </div>
    )
}


export default LoginPage;