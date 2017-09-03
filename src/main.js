import pageViewLogger from './core/pageViewLogger'

window.addEventListener('load', pageViewLogger)
window.tracker = () => {
    console.log('tracker func')
    console.log(process.env.TRACKER_URL)
}
