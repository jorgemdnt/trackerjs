import Cookies from 'js-cookie'

const PAGES_TRACKED_KEY = 'pageViewsTracked'
const USER_EMAIL_KEY = 'userEmail'

class CookieStorageGateway {
    constructor(document) {
        this.document = document
    }

    trackPageView(properties) {
        const pageViewsTracked = this.getPageViewsTracked() || []
        pageViewsTracked.push(properties)
        Cookies.set(PAGES_TRACKED_KEY, pageViewsTracked)
    }

    getPageViewsTracked() {
        return Cookies.getJSON(PAGES_TRACKED_KEY)
    }

    getUserEmail() {
        return Cookies.get(USER_EMAIL_KEY)
    }

    setUserEmail(userEmail) {
        Cookies.set(USER_EMAIL_KEY, userEmail)
    }
}

export default CookieStorageGateway
