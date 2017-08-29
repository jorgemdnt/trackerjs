class StorageGatewayFake {
    constructor () {
        this.userEmail = null
        this.pageViewsTracked = []
    }

    trackPageView(properties) {
        this.pageViewsTracked.push(properties)
    }

    getPageViewsTracked () {
        return this.pageViewsTracked
    }

    setUserEmail(userEmail) {
        this.userEmail = userEmail
    }

    getUserEmail(userEmail) {
        return this.userEmail
    }
}

export default StorageGatewayFake
