import generateSomeJokes from './js/generateDadJokes'
import './styles/main.scss'
import globeImg from './assets/globe-solid.svg'

const img = document.querySelector('#myImg')
img.src = globeImg

console.log('what?')

generateSomeJokes()