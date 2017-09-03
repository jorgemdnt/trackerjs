class TrackerAPIGatewaySpy {
    constructor() {
        this.spiedTrackPageView = {}
        this.spiedIdentifyUser = {}
    }

    trackPageView(userEmail, properties) {
        this.spiedTrackPageView = {
            userEmail,
            properties
        }
    }

    identifyUser(userEmail, pageViewsTracked) {
        this.spiedIdentifyUser = {
            userEmail,
            pageViewsTracked
        }
    }
}

export default TrackerAPIGatewaySpy
