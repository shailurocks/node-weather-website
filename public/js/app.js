const weatherForm = document.querySelector('form');
const searchQuery = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

//messageOne.textContent = 'From Javascript';

weatherForm.addEventListener('submit' , (e) => {
    e.preventDefault();
    console.log(searchQuery.value , "Testing!!!");

    messageOne.textContent = 'Request Processing';
    messageTwo.textContent = '';
    fetch('/weather?address='+searchQuery.value).then((response) => {
        response.json().then((data) => {
            if(data.errormsg){
                console.log(data.errormsg);
                messageOne.textContent = data.errormsg;
            }else{
                console.log(data);
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
            
        })
    })
})