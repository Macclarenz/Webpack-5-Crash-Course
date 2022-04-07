import axios from 'axios'

const jokeBtn = document.querySelector('#moreJokes')
jokeBtn.addEventListener('click', e => {
    generateSomeJokes()
})

function generateSomeJokes() {
    const config = {
        headers: {
            Accept: 'application/json'
        }
    }

    axios.get('https://icanhazdadjoke.com', config)
        .then(res => {
            document.querySelector('#jokeP').innerText = res.data.joke
        })
}

export default generateSomeJokes