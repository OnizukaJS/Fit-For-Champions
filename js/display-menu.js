//[ALL PAGES] Display sign up or login buttons
const containerSignUpOrLogin = document.getElementById('container-signup-login');
const signUpOrLogin = document.getElementById('signup-or-login');

containerSignUpOrLogin.addEventListener('click', function () {

    if (signUpOrLogin.style.display === 'none') {
        signUpOrLogin.style.display = 'block';
    } else {
        signUpOrLogin.style.display = 'none';
    }
});