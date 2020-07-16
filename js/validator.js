'use strict';

class Validator {
    constructor() {
        //Pre-made messages
        this.invalidEmailError = '<i class="fas fa-times"></i> Enter a valid email';
        this.emailExistsError = '<i class="fas fa-times"></i> This email already exists';
        this.teamInexistant = '<i class="fas fa-times"></i> You must choose a team';
        this.passwordError = '<i class="fas fa-times"></i> The password must be 6 characters minimum';
        this.repeatPasswordError = '<i class="fas fa-times"></i> The two passwords do not match';

        //object with the error messages that will be displayed to the user
        this.errors = {
            invalidEmailError: this.invalidEmailError,
            teamInexistant: this.teamInexistant,
            passwordError: this.passwordError,
            repeatPasswordError: this.repeatPasswordError
        }
    }

    /* ------------- METHODS ------------- */
    //Validate the email
    validateValidEmail = (email) => {
        //Check is the email is valid, remove the message
        if (this.emailIsValid(email)) {
            delete this.errors.invalidEmailError;
        } else {
            //If it's not valid, insert the message again
            this.errors.invalidEmailError = this.invalidEmailError;
        }
    }


    //Auxiliar function of validateEmail
    emailIsValid = (email) => {
        //Contains the rules for the email
        const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

        //Test method to check if the string follows the rules
        //Return true or false
        const isValid = emailRegEx.test(email);

        return isValid;
    }

    //Validate if the email isn't already used
    valideUniqueEmail = (newEmail) => {
        //Get all the users to check if this email exists
        const usersDB = db.getAllUsers();

        let emailUnique = true;

        if (usersDB.length > 0) {
            usersDB.forEach((userObj) => {
                if (userObj.email === newEmail) {
                    //Means this email already exists
                    emailUnique = false;
                }
            })

            if (emailUnique) {
                //remove the error message
                delete this.errors.emailExistsError;
            } else {
                //Insert the message again
                this.errors.emailExistsError = this.emailExistsError;
            }
        }
    }

    //Valide the team
    teamIsChosen = (team) => {
        if (team) {
            //Remove the error message
            delete this.errors.teamInexistant;
        } else {
            //Insert the message again
            this.errors.teamInexistant = this.teamInexistant;
        }
    }

    //Validate the password's length
    validatePassword = (password) => {
        if (password.length > 5) {
            //Remove the error message
            delete this.errors.passwordError;
        } else {
            //Insert the message again
            this.errors.passwordError = this.passwordError;
        }
    }

    //Validate if the passwords are identicals
    validatePasswordRepeat = (password, passwordRepeat) => {
        if (password === passwordRepeat) {
            //Delete the error message
            delete this.errors.repeatPasswordError;
        } else {
            //Insert the message again
            this.errors.repeatPasswordError = this.repeatPasswordError;
        }
    }

    //To get the object with errors to show it to the users on the subscription
    getErrors = () => {
        return this.errors;
    }

    //Reinitiate the error messages for the next signup
    resetValidator = () => {
        this.errors = {
            invalidEmailError: this.invalidEmailError,
            teamInexistant: this.teamInexistant,
            passwordError: this.passwordError,
            repeatPasswordError: this.repeatPasswordError
        }
    }
}

const validator = new Validator();