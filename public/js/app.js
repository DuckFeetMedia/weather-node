
console.log('Client side javascript file is loaded!')

const form = document.querySelector('form')
const searchEl = document.querySelector('input')
const loader = document.querySelector('p.load')
const messageOne = document.querySelector('p.p1')
const messageTwo = document.querySelector('p.p2')
const title = document.querySelector('.title')
const temp = document.querySelector('.temp')
const goodDuck = document.querySelector('img.goodDuck')
const notGoodDuck = document.querySelector('img.notGoodDuck')

messageTwo.textContent = ''
messageTwo.textContent = ''

const duck = (duck) => {
    if (duck == true) {
        title.style.display = 'block'
        title.textContent = "Good Weather for Ducks"
        notGoodDuck.style.display = 'none';
        goodDuck.style.display = 'block';
        
    } else {
        title.style.display = 'block'
        title.textContent = "Not Good Weather for Ducks"
        notGoodDuck.style.display = 'block';
        goodDuck.style.display = 'none';
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    loader.style.display = 'block'
    title.style.display = 'none'
    temp.style.display = 'none'
    goodDuck.style.display = 'none'
    notGoodDuck.style.display = 'none'
    messageOne.textContent = ''
    messageTwo.textContent = ''
    const location = searchEl.value

    fetch('/weather?address=' + location).then((response)=>{
        response.json().then((data)=>{
        if (data.error) {
            console.log(data.error)
            loader.style.display = 'none'
            messageOne.textContent = data.error
            messageTwo.textContent = ''
            } else {
                loader.style.display = 'none'
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
                console.log(data.location)
                console.log(data.forecast)
                // if (data.data.body.currently.precipProbability <= 0.25) {
                if (data.data.body.currently.icon != 'rain') {
                    duck(false);
                } else {
                    duck(true);
                }
                if (data.data.body.currently.temperature >= 25) {
                    temp.style.display = 'block'
                    temp.textContent = 'Bit hot out...'
                }
                console.log(data.data.body.currently)
            }
        })
    })
})

