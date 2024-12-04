var userNameInput = document.getElementById('userName')
var emailInput = document.getElementById('email')
var passwordInput = document.getElementById('password')
var incorrectInput = document.getElementById('incorrectInputs')
var incorrectEmailInput = document.getElementById ('incorrectEmail')
var successInput = document.getElementById('success')
var incorrectBothInput = document.getElementById('incorrectBoth')
var userName = document.getElementById('userName')
var nameAlertInput =  document.getElementById('nameAlert')
var emailAlertInput = document.getElementById('emailAlert')
var passwordAlertInput = document.getElementById('passwordAlert')

var users = []

var users = JSON.parse(localStorage.getItem('allUsers')) || [];

function signup(){

    if(userNameInput.value == "" || emailInput.value == "" || passwordInput.value == ""){
        incorrectInput.style.display = "block"
        incorrectEmailInput.style.display = "none"
        successInput.style.display = "none" 
        return false
    }

    for (let i = 0; i < users.length; i++) { 
        if (users[i].email.toLowerCase() === emailInput.value.toLowerCase()) { 
            incorrectEmailInput.style.display = "block"
            incorrectInput.style.display = "none" 
            successInput.style.display = "none"
            return false; 
        }
        else{
            incorrectEmailInput.style.display = "none"
            emailAlertInput.style.display = 'none';
        }
    }

    var signupUsers = {
        name: userNameInput.value,
        email: emailInput.value,
        password: passwordInput.value     
    }
    

    if (userValidation() && emailValidation() && passwordValidation()) {
        users.push(signupUsers);
        localStorage.setItem('allUsers', JSON.stringify(users));

        // Set the current user in localStorage
        localStorage.setItem('currentUser', JSON.stringify(signupUsers.name));

        // Display success message
        nameAlertInput.style.display = 'none';
        emailAlertInput.style.display = 'none';
        successInput.style.display = "block";
        incorrectInput.style.display = "none";
    } else {
        if (!userValidation()) {
            nameAlertInput.style.display = 'block';
            incorrectInput.style.display = "none";
        }
        if (!emailValidation()) {
            emailAlertInput.style.display = 'block';
            incorrectInput.style.display = "none";
        }
        if (!passwordValidation()) {
            passwordAlertInput.style.display = 'block';  
            incorrectInput.style.display = "none";
        }
        successInput.style.display = "none";
        incorrectInput.style.display = "none";
        incorrectEmailInput.style.display = "none"
    }
    
}


function login(){

    if(emailInput.value == "" || passwordInput.value == ""){
        incorrectInput.style.display = "block"
        incorrectBothInput.style.display = "none"
        return false
    }
    else{
            incorrectInput.style.display = "none"
    }


    if (emailValidation() && passwordValidation()) {
            passwordAlertInput.style.display = 'none';  
            emailAlertInput.style.display = 'none';
            incorrectInput.style.display = "none";
    } 
    else {
        if (!emailValidation()) {
            emailAlertInput.style.display = 'block';
            incorrectInput.style.display = "none";
        }
        if (!passwordValidation()) {
            passwordAlertInput.style.display = 'block';  
            incorrectInput.style.display = "none";
        }
        incorrectInput.style.display = "none";
    }

    for(let i = 0; i < users.length; i++) {
        if(users[i].email.toLowerCase() === emailInput.value.toLowerCase() && users[i].password.toLowerCase() === passwordInput.value.toLowerCase()){
            localStorage.setItem('currentUser', JSON.stringify(users[i].name));
            window.location.href = "./welcome.html" 
        }
        else{
            incorrectBothInput.style.display = "block"
        }
    }

    }

    function displayWelcomeMessage() {
        var currentUserName = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUserName) {
          document.getElementById('userName').innerHTML = "Welcome " + currentUserName;       
        } 
        // Not required for the first use it will make looping
        // else {
        //     window.location.href = "./index.html";
        // }
    }
        displayWelcomeMessage()
    

    function userValidation(){
        var regex = /^[a-zA-Z0-9_ ]{3,}$/
        if(regex.test(userNameInput.value) == true){
            userNameInput.classList.add('is-valid')
            userNameInput.classList.remove('is-invalid')
            nameAlertInput.style.display='none'
            return true
        }
        else{
            userNameInput.classList.add('is-invalid')
            userNameInput.classList.remove('is-valid')
            nameAlertInput.style.display='block'
            return false        
        }
    }

    function emailValidation(){
        var regex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
        if(regex.test(emailInput.value) == true){
            emailInput.classList.add('is-valid')
            emailInput.classList.remove('is-invalid')
            emailAlertInput.style.display='none'
            return true
        }
        else{
            emailInput.classList.add('is-invalid')
            emailInput.classList.remove('is-valid')
            emailAlertInput.style.display='block'
            return false        
        }    
    }

        function passwordValidation(){
            var regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
            if(regex.test(passwordInput.value) == true){
                passwordInput.classList.add('is-valid')
                passwordInput.classList.remove('is-invalid')
                passwordAlertInput.style.display='none'
                return true
            }
            else{
                passwordInput.classList.add('is-invalid')
                passwordInput.classList.remove('is-valid')
                passwordAlertInput.style.display='block'
                return false        
            }    
        }

        // function validAll(){
        //     if(userValidation(/^[a-zA-Z0-9_]{3,}$/) && emailValidation(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)) {
        //         return true;
        //     }
        //     else{
        //         return false;
        //     }
        // }

        
        // Success Message Before Validation last thing in the function signup

        //  if(userNameInput.value || emailInput.value || passwordInput.value){
        //             successInput.style.display = "block"
        //             incorrectInput.style.display = "none"
        //             return true;
        //         }


