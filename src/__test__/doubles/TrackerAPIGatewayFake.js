class TrackerAPIGatewayFake {
    constructor() {
        this.userEmail = null
        this.pageViewsTracked = []
    }

    trackPageView(userEmail, properties) {
        this.userEmail = userEmail
        this.pageViewsTracked.push(properties)
    }
}

export default TrackerAPIGatewayFake
