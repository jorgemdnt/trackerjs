import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import TrackerAPIGateway from '../../gateways/TrackerAPIGateway'


describe('TrackerAPIGateway', () => {
    const EMAIL = 'user@email.com'
    let gateway
    let axiosMock

    beforeEach(() => {
        axiosMock = new MockAdapter(axios)
        gateway = new TrackerAPIGateway()
    })

    afterEach(() => {
        axiosMock.reset()
    })

    describe('trackPageView', () => {
        const PROPERTIES = {
            path: 'http://trackedpage.com',
            timestamp: 1504446923512
        }

        test('Should send page view info to tracker servers', async () => {
            axiosMock
                .onPost(process.env.TRACKER_URL + 'api/v1/page_views', {
                    email: EMAIL,
                    path: PROPERTIES.path,
                    timestamp: PROPERTIES.timestamp
                })
                .reply(201)

            const response = await gateway.trackPageView(EMAIL, PROPERTIES)

            expect(response.status).toEqual(201)
        })
    })

    describe('identifyUser', () => {
        const PAGE_VIEWS_STORED = [{
            path: 'http://trackedpage.com',
            timestamp: 1504446923512
        }, {
            path: 'http://trackedpage.com/contact',
            timestamp: 1504446911512
        }]

        test('Should send user email along browser-stored page views', async () => {
            axiosMock
                .onPost(process.env.TRACKER_URL + 'api/v1/users', {
                    email: EMAIL, page_views: PAGE_VIEWS_STORED
                })
                .reply(201)

            const response = await gateway.identifyUser(EMAIL, PAGE_VIEWS_STORED)

            expect(response.status).toEqual(201)
        })
    })
})
