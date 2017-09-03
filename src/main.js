import identifyUserFactory from './factories/identifyUserFactory'
import pageViewLoggerFactory from './factories/pageViewLoggerFactory'

window.addEventListener('load', pageViewLoggerFactory())
window.trackerjs = {
    identifyUser: identifyUserFactory()
}
//document.getElementById('tracker-user-email-form').addEventListener('submit', event => {
    //console.log('tracker func')
    //console.log(event)
    //console.log(process.env.TRACKER_URL)
//})
