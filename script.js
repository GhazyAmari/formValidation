const username = document.getElementById('username')
const email = document.getElementById('Email')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')
const form = document.getElementById('form')

const showError = (input, message) =>{
    const formControl = input.parentElement;
    formControl.className = 'form-control error';

    const msg = formControl.querySelector('small');
    msg.innerText = message;
}

const showSuccess = (input) =>{
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

const checkRequired = (inputs) => {
    inputs.forEach(input =>{
        if (!input.value){
            showError(input, `${input.id==='password2'?'Password do not match': input.id + ' is required'} `)
        }
        else{
            showSuccess(input)
        }
    })
}

const checkLength = (input, min, max) =>{
    if (input.value.length < min ){
        showError(input, `${input.id} must be atleast ${min} characters long.`)
    } else if (input.value.length > max ){
        showError(input, `${input.id} must be at most ${max} characters long.`)
    } else {
        showSuccess(input)
    }
}

const checkEmail =  (input) =>{
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(input.value.trim())
} 

const validateEmail = (input) =>{
    if (!checkEmail(input)){
        showError(input, 'Invalid Email')
    }else {
        showSuccess(input)
    }
} 

const checkPassword = (pass1, pass2)=>{
    if (pass1.value === '' && pass2.value === '' || pass1.value!== pass2.value){
        showError(pass2, 'Password do not match')
    }else {
        showSuccess(pass2)
    }
}

const reset =(inputs) =>{
    inputs.forEach((input)=> (input.value =''))
}

form.addEventListener('submit', (event) =>{

    event.preventDefault();
    checkRequired([username, email, password, password2])
    checkLength(username, 3, 20);
    checkLength(password, 8, 20);
    validateEmail(email);
    checkPassword(password,password2)
    reset([username, email, password, password2])
})

