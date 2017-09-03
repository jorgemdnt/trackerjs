import axios from 'axios'

class TrackerAPIGateway {
    trackPageView(email, { path, timestamp }) {
        return axios.post(process.env.TRACKER_URL + '/api/v1/page_views', {
            email,
            path,
            timestamp
        })
    }

    identifyUser(email, pageViewsStored) {
        return axios.post(process.env.TRACKER_URL + '/api/v1/users', {
            email,
            page_views: pageViewsStored
        })
    }
}

export default TrackerAPIGateway
