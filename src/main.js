import pageViewLogger from './pageViewLogger'

window.addEventListener('load', pageViewLogger)
window.tracker = () => { console.log('tracker func') }
