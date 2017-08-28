class StorageGatewayFake {
    constructor () {
        this.userId = null
        this.pageViewsTracked = []
    }

    trackPageView(userId, properties) {
        this.userId = userId
        this.pageViewsTracked.push(properties)
    }

    getPageViewsTracked () {
        return this.pageViewsTracked
    }

    getUserId() {
        return this.userId
    }
}

export default StorageGatewayFake
