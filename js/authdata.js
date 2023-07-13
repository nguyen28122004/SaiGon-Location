import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut  } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";


import * as places from './index.js'

import {fav, createList} from './fav.js'



const firebaseConfig = {
    apiKey: "AIzaSyAtwPhCdCQLf2TVE0AmsI6LJA5DOsch8Qo",
    authDomain: "saigon-location.firebaseapp.com",
    projectId: "saigon-location",
    storageBucket: "saigon-location.appspot.com",
    messagingSenderId: "297373622656",
    appId: "1:297373622656:web:ffdc04efb1039220ab2165"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);





function signUpUser() {
    $('#signup-submit')[0].onclick = () => {
        var email = $('#email-signup')[0].value;
        var password = $('#password-signup')[0].value
        var rePassword = $('#re-password-signup')[0].value
    
        if (password != rePassword) {
            alert('Xác nhận mật khẩu không đúng')
            $('.signup .error-message')[0].innerText = "Mật khẩu nhập lại không đúng!"
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            alert('Tạo tài khoản thành công, hãy tiến hành đăng nhập bằng cách bấm vào nút Đăng nhập phía dưới. Cảm ơn bạn đã sử dụng Saigon Location')
            $('.signup .error-message')[0].innerText = "Đăng kí tài khoản thành công!"
            $('.signup .error-message').css('color', 'rgba(0, 255, 0, 0.857)')
            // ...
        })
        .catch((error) => {
            $('.signup .error-message').css('color', 'rgba(227, 0, 0, 0.857)')
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            switch (errorCode) {
    
                case 'auth/missing-email':
                    alert("Thiếu email")
                    $('.signup .error-message')[0].innerText = "Hãy điền đầy đủ email"
                    break;
    
                case 'auth/invalid-email':
                    alert("Email không hợp lệ")
                    $('.signup .error-message')[0].innerText = "Email không hợp lệ, hãy lựa chọn email khác"
                    break;
    
                case 'auth/email-already-in-use':
                    alert("Email không hợp lệ")
                    $('.signup .error-message')[0].innerText = "Email đã được đăng kí cho tài khoản khác trên hệ thống Saigon Location, hãy lựa chọn email khác"
                    break;
    
                case 'auth/internal-error':
                    alert("Mật khẩu quá yếu, hãy chọn mật khẩu khác")
                    $('.signup .error-message')[0].innerText = "Vui lòng lựa chọn mật khẩu khác"
                    break;
    
    
                case 'auth/internal-error':
                    alert("Lỗi không xác định")
                    $('.signup .error-message')[0].innerText = "Lỗi không xác định, vui lòng nhập lại thông tin đăng kí"
                    break;
                default:
                    alert("Lỗi không xác định")
                    $('.signup .error-message')[0].innerText = "Lỗi không xác định, vui lòng nhập lại thông tin đăng kí"
                    break;
            }
        });
    }
}



function signInUser() {
    $('#signin-submit')[0].onclick = () => {
        var email = $('#email-signin')[0].value;
        var password = $('#password-signin')[0].value
    
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            user = userCredential.user;
            // console.log(database[user.uid])
            $('.signin .error-message')[0].innerText = "Đăng nhập thành công!"
            $('.signin .error-message').css('color', 'rgba(0, 255, 0, 0.857)')
            console.log(user)
        })
        .catch((error) => {
            $('.signin .error-message').css('color', 'rgba(227, 0, 0, 0.857)')
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            switch (errorCode) {
                
                case 'auth/missing-email':
                    alert("Thiếu email")
                    $('.signin .error-message')[0].innerText = "Hãy điền đầy đủ email"
                    break;
    
                case 'auth/invalid-email':
                    alert("Email không hợp lệ")
                    $('.signin .error-message')[0].innerText = "Email không hợp lệ, hãy lựa chọn email khác"
                    break;
    
                case 'auth/user-not-found':
                    alert("Không tìm thấy tài khoản")
                    $('.signin .error-message')[0].innerText = "Email chưa được đăng kí, hãy đăng kí trước khi đăng nhập"
                    break;
    
                case 'auth/wrong-password':
                    alert("Sai mật khẩu")
                    $('.signin .error-message')[0].innerText = "Mật khẩu không đúng"
                    break;
                
                default:
                    alert("Lỗi không xác định")
                    $('.signin .error-message')[0].innerText = "Lỗi không xác định, vui lòng nhập lại thông tin đăng kí"
                    break;
            }
        });
    }
}

function signOutUser()
{
    document.getElementsByClassName('signout')[0].onclick = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("sign-out  successful")
          }).catch((error) => {
            // An error happened.
          });
          
    }
}


function UserOnChange()
{
    onAuthStateChanged(auth, function (user1){

            if (user1) {
                $('.fav').toggleClass('hidden', false);
                // console.log(user1)
                $('.registration').toggleClass('hidden', true);
                $('.signout').toggleClass('hidden', false);
                localStorage.setItem('user', user1.uid)
                var favList = fav[user1.uid].fav;
                var database = places.database;
                // console.log(favList);
                var datafav = new Array();
                if (favList.length > 0)
                    for (let i = 0; i < favList.length; i++) {
                        let index = database.findIndex(e => {
                            return e.name == favList[i];
                        });
                        if (index != -1) {
                            datafav.push(database[i]);
                        }
                    }
                // console.log(datafav);
                if ($('.fav-list').length > 0)
                    createList(datafav, '.fav-list');
                // ...
            } else {
                $('.fav').toggleClass('hidden', true);
                console.log(user1);
                $('.registration').toggleClass('hidden', false);
                $('.signout').toggleClass('hidden', true);
            }
        })
}


var user = localStorage.getItem('user')
UserOnChange()
export {user, auth, signUpUser, signInUser, signOutUser, UserOnChange}