

const serchForm = document.querySelector('form');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');

message1.textContent ='';
message2.textContent = '';
serchForm.addEventListener('submit', e => {
    e.preventDefault();
    message1.textContent = '';
    message2.textContent = 'Loading....';
    const searchTerm = document.querySelector('input').value;
    fetch(`/weather?location=${searchTerm}`).then(response => {
        response.json().then((data) => {
            if(data.error){
                message2.textContent = data.error;
            } else {
                let {forecast, location} = data;
                message1.textContent = location;
                message2.textContent = forecast;
            }
            
        });
    })

});