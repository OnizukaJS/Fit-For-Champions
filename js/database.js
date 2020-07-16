'use strict'

class Database {
    //Gather new user datas in an array
    getAllUsers = () => {
        //get the string
        const usersStr = localStorage.getItem('users');
        //convert the string into an array
        const usersArr = JSON.parse(usersStr);

        //If there is no user, return an empty array
        if (usersArr === null) {
            return [];
        } else {
            return usersArr;
        }
    }

    saveNewUser = (newUser) => {

        //Recover the array of all users from the localStorage
        const usersArr = this.getAllUsers();

        //Update the array
        usersArr.push(newUser);

        //Convert the array into a string
        const usersStr = JSON.stringify(usersArr);

        //Save it into localStorage
        localStorage.setItem('users', usersStr);
    }

    saveLoginUser = (user) => {

        //Convert the array into a string
        const userStr = JSON.stringify(user);

        localStorage.setItem('currUser', userStr);
    }

    getLoginUser = () => {
        const userStr = localStorage.getItem('currUser');
        const userObj = JSON.parse(userStr);
        return userObj;
    }
}

const db = new Database();

console.log('db', db);