const VIEWS_TRACKED_KEY = 'pageViewsTracked'
const USER_EMAIL_KEY = 'userEmail'

class LocalStorageGateway {
    constructor(localStorage) {
        this.localStorage = localStorage
    }

    trackPageView(properties) {
        const pageViews = this.getPageViewsTracked()
        this.localStorage.setItem(VIEWS_TRACKED_KEY, JSON.stringify(pageViews.concat([properties])))
    }

    getPageViewsTracked() {
        return JSON.parse(this.localStorage.getItem(VIEWS_TRACKED_KEY)) || []
    }

    getUserEmail() {
        return this.localStorage.getItem(USER_EMAIL_KEY)
    }

    setUserEmail(userEmail) {
        this.localStorage.setItem(USER_EMAIL_KEY, userEmail)
    }
}

export default LocalStorageGateway
