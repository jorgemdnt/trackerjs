import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import TrackerAPIGateway from '../../gateways/TrackerAPIGateway'


describe('TrackerAPIGateway', () => {
    const EMAIL = 'user@email.com'
    const PROPERTIES = {
        path: 'http://trackedpage.com',
        timestamp: 1504446923512
    }
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
        test('Should send page view info to tracker servers', async () => {
            axiosMock
                .onPost(process.env.TRACKER_URL + 'api/v1/page_views')
                .reply(201)

            const response = await gateway.trackPageView(EMAIL, PROPERTIES)

            expect(response.status).toEqual(201)
        })
    })
})
