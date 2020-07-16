'use strict';

class Signup {
    constructor() {
        this.nameInput = document.querySelector('#name');
        this.teamInput = document.querySelector('#team');
        this.emailInput = document.querySelector('#email');
        this.passwordInput = document.querySelector('#password');
        this.repeatPasswordInput = document.querySelector('#repeat-password');

        this.buttonInput = document.querySelector('#signup-button');
        this.errorsWrapper = document.querySelector('.message-container');
    }

    //manage team input's change
    handleTeamInput = (event) => {
        const team = event.target.value;

        //Validate the team is chosen
        validator.teamIsChosen(team);

        this.setErrorMessages();
    }

    //manage email input's change
    handleEmailInput = (event) => {
        const email = event.target.value;

        //Validate the name input
        validator.validateValidEmail(email);

        //Get the object with the errors
        const errors = validator.getErrors();

        //If the email is valid
        if (!errors.invalidEmailError) {
            //Check if the email is unique
            validator.valideUniqueEmail(email);
        }

        this.setErrorMessages();

        //Check if there are errors, if not activate the sign up button
        this.checkButton();
    }

    //manage password input's change
    handlePasswordInput = (event) => {
        const password = event.target.value;
        const passwordRepeat = this.repeatPasswordInput.value;

        //Validate the password input
        validator.validatePassword(password);
        validator.validatePasswordRepeat(password, passwordRepeat);

        this.setErrorMessages();

        //Check if there are errors, if not activate the sign up button
        this.checkButton();
    }

    //manage repeat password input's change
    handleRepeatPasswordInput = (event) => {
        const passwordRepeat = event.target.value;
        const password = this.passwordInput.value;

        //Validate the password input
        validator.validatePassword(password);
        validator.validatePasswordRepeat(password, passwordRepeat);

        this.setErrorMessages();

        //Check if there are errors, if not activate the sign up button
        this.checkButton();
    }

    //manage sending datas (submit)
    saveData = (event) => {
        //When the event occurs, cancels it and doesn't reload the page
        event.preventDefault();
        //Get all the input's values
        const name = this.nameInput.value;
        const team = this.teamInput.value;
        const email = this.emailInput.value;
        const password = this.passwordInput.value;
        const repeatPassword = this.repeatPasswordInput.value;

        //Call the function to create the object
        const newUser = new User(name, team, email, password);

        //We want to keep the new user in the fake database
        db.saveNewUser(newUser);


        //drain the form
        this.nameInput.value = '';
        this.teamInput.value = '';
        this.emailInput.value = '';
        this.passwordInput.value = '';
        this.repeatPasswordInput.value = '';

        this.showSuccessMessage();
        this.removeMessages();

        validator.resetValidator();
        //Deactivate the sign up button
        this.buttonInput.disabled = true;
    }

    //Save all the functions for each input
    addListeners = () => {
        this.teamInput.addEventListener('change', this.handleTeamInput);
        this.emailInput.addEventListener('input', this.handleEmailInput);
        this.passwordInput.addEventListener('input', this.handlePasswordInput);
        this.repeatPasswordInput.addEventListener('input', this.handleRepeatPasswordInput);

        this.buttonInput.addEventListener('click', this.saveData);
    }

    showSuccessMessage = () => {
        //Clean the error messages to insert the good ones
        this.errorsWrapper.innerHTML = "";

        const errorsObj = validator.getErrors();

        //Convert to an array of strings
        const errorsStringsArr = Object.values(errorsObj);

        if (errorsStringsArr.length > 0) {
            return;
        }

        const successMessageP = document.createElement('p');
        successMessageP.id = 'successMessageP';
        successMessageP.innerHTML = 'Your account has been successfully created';
        successMessageP.classList.add('green-message');

        this.errorsWrapper.appendChild(successMessageP);

        this.redirect();
    }

    redirect = () => {
        setTimeout(() => location.assign('login.html'), 3000);
    }

    // Activate or deactivate the Sign up button
    checkButton = () => {
        const errorsObj = validator.getErrors();
        const errorsArr = Object.values(errorsObj);


        if (errorsArr.length > 0) {
            this.buttonInput.disabled = true;
        } else {
            this.buttonInput.disabled = false;
        }
    }


    removeMessages = () => {
        //Remove the message "Your account has been created"
        setTimeout(() => {
            this.errorsWrapper.innerHTML = "";
        }, 3000)
    }

    setErrorMessages = () => {
        //Clean the error messages to insert the good ones
        this.errorsWrapper.innerHTML = "";

        const errorsObj = validator.getErrors();

        //Convert the object into an array of strings
        const errorsStringsArr = Object.values(errorsObj);

        errorsStringsArr.forEach((errorStr) => {
            const errorMessageP = document.createElement('p');
            errorMessageP.innerHTML = errorStr;

            this.errorsWrapper.appendChild(errorMessageP);
        })
    }
}

//Create a new instance
const signup = new Signup();

//This way, the new Signup will have the function running when the page is loaded
window.addEventListener('load', signup.addListeners);