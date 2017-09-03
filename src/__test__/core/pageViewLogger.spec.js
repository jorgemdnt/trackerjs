import StorageGatewayFake from '../doubles/StorageGatewayFake'
import TrackerAPIGatewaySpy from '../doubles/TrackerAPIGatewaySpy'
import pageViewLogger from '../../core/pageViewLogger'

const TIMESTAMP = 1504446923512
Date.now = jest.fn(() => TIMESTAMP)

describe('pageViewLogger', () => {
    const PATH = 'http://trackedpage.com'
    const EVENT = {
        target: {
            location: {
                href: PATH
            }
        }
    }
    let storageGateway
    let trackerAPIGateway

    beforeEach(() => {
        storageGateway = new StorageGatewayFake()
        trackerAPIGateway = new TrackerAPIGatewaySpy()
    })

    test('Should track page view in browser storage when user email not defined yet', () => {
        pageViewLogger(storageGateway, trackerAPIGateway)(EVENT)

        expect(storageGateway.getPageViewsTracked()).toEqual([{
            path: PATH,
            timestamp: TIMESTAMP
        }])
    })

    test('Should send page view to Tracker API when user email already defined', () => {
        const userEmail = 'user@email.com'
        storageGateway.setUserEmail(userEmail)

        pageViewLogger(storageGateway, trackerAPIGateway)(EVENT)

        expect(trackerAPIGateway.spiedTrackPageView).toEqual({
            userEmail,
            properties: {
                path: PATH,
                timestamp: TIMESTAMP
            }
        })
    })
})
