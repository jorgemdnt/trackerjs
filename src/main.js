import pageViewLoggerFactory from './factories/pageViewLoggerFactory'

window.addEventListener('load', pageViewLoggerFactory())
window.trackerjs = {
    identifyUser: email => console.log(email)
}
//document.getElementById('tracker-user-email-form').addEventListener('submit', event => {
    //console.log('tracker func')
    //console.log(event)
    //console.log(process.env.TRACKER_URL)
//})
