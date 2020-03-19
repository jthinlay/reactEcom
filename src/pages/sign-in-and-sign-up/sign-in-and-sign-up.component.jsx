import React from 'react';
import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';
//import './sign-in-and-sign-up.styles.scss';
import SignInAndSignUp from './signInAndSignUp.styles'


const SignInAndSignUpPage = () => (
    //<div className='sign-in-and-sign-up'>
    <SignInAndSignUp>
        <SignIn />
        <SignUp />
    </SignInAndSignUp>
      
    //</div>
)
export default SignInAndSignUpPage;