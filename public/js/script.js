console.log('client side js script is loaded!')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() //dont refresh!

    const location = search.value

    messageOne.textContent = 'Fetching weather info...'
    messageTwo.textContent = ''
    console.log('location: ' + location)
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
                messageOne.textContent= data.error
            } else {
                console.log(data)
                messageOne.textContent = 'Location: ' + data.location
                messageTwo.textContent = 'Currently is ' + data.description
                                            + '. Temperature is ' + data.temperature + '°C outside'
                                            + '. Feels like ' + data.feelslike + '°C.'
                                            + ' UV index is ' + data.uv_index
                                            + ' and humidity is ' + data.humidity + '%.'
            }
        })
    })
})