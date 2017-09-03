import axios from 'axios'

class TrackerAPIGateway {
    constructor() {
    }

    trackPageView(email, { path, timestamp }) {
        return axios.post(process.env.TRACKER_URL + 'api/v1/page_views', {
            email,
            path,
            timestamp
        })
    }
}

export default TrackerAPIGateway
