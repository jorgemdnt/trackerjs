import StorageGatewayFake from '../doubles/StorageGatewayFake'
import TrackerAPIGatewayFake from '../doubles/TrackerAPIGatewayFake'
import pageViewLogger from '../../core/pageViewLogger'

const TIMESTAMP = 'Sun Aug 27 2017 23:54:15 GMT-0300 (-03)'
Date.prototype.toString = jest.fn(() => TIMESTAMP)

describe('pageViewLogger', () => {
    const PATH = 'http://trackedpage.com'
    const EVENT = {
        target: {
            location: {
                path: PATH
            }
        }
    }
    let storageGateway
    let trackerAPIGateway

    beforeEach(() => {
        storageGateway = new StorageGatewayFake()
        trackerAPIGateway = new TrackerAPIGatewayFake()
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

        expect(trackerAPIGateway.pageViewsTracked).toEqual([{
            path: PATH,
            timestamp: TIMESTAMP
        }])
        expect(trackerAPIGateway.userEmail).toEqual(userEmail)
    })
})
