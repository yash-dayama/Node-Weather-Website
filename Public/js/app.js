// const { response } = require("express");

console.log('Client side JS file is loaded!!');

// fetch('http://puzzle.mead.io/puzzle').then((response) =>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })

fetch('/weather?address=!' + location).then((response) =>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = data.error
        }
        else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
            console.log(data.location)
            console.log(data.forecast);
        }
    })
})

const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')

messageOne.textContent = 'From JS '

weatherform.addEventListener('submit', (e) =>{
    e.preventDefault()

    const location = search.value
    messageOne.textContent  = 'Loading...'
    messageTwo.textContent = ''
})