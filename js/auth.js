import * as places from './index.js'

import {fav, createList} from './fav.js'

import {auth, user, signUpUser, signInUser, signOutUser, UserOnChange} from "./authdata.js";



var toggleButon = document.getElementsByClassName('toggle')
var signinForm = document.getElementsByClassName('signin')[0]
var signupForm = document.getElementsByClassName('signup')[0]

for (let i = 0; i < toggleButon.length; i++) {
    const e = toggleButon[i];
    e.onclick = () => {
        if (e.classList.contains('button-signin') && signinForm.classList.contains('hidden')) {
            signinForm.classList.toggle('hidden')
            signupForm.classList.toggle('hidden')
            document.getElementsByClassName('registration')[0].style = "height:400px;"
            $('.toggle.button-signin').toggleClass('form-color')
            $('.toggle.button-signup').toggleClass('form-color')
        }
        else if(e.classList.contains('button-signup') && signupForm.classList.contains('hidden'))
        {
            signinForm.classList.toggle('hidden')
            signupForm.classList.toggle('hidden')
            document.getElementsByClassName('registration')[0].style = "height:530px;"
            $('.toggle.button-signin').toggleClass('form-color')
            $('.toggle.button-signup').toggleClass('form-color')
        } 
    }
}

// ===========================Login function========================

function login()
{
    signUpUser()

    signInUser()
    
    UserOnChange()
    signOutUser()
}
if(document.title == 'SAIGON LOCATION')
    login()

    
export {login}

//======================================





