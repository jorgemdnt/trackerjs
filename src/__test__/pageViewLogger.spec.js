import StorageGatewayFake from './doubles/StorageGatewayFake'
import pageViewLogger from '../pageViewLogger'

jest.mock('uuid', () => ( { v4: jest.fn(() => 'USER_ID') } ))
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

    beforeEach(() => {
        storageGateway = new StorageGatewayFake()
    })

    test('Should track page view with new userId when user not tracked yet', () => {
        pageViewLogger(storageGateway)(EVENT)

        expect(storageGateway.getPageViewsTracked()).toEqual([{ 
            path: PATH,
            timestamp: TIMESTAMP
        }])
        expect(storageGateway.getUserId()).toEqual('USER_ID')
    })

    test('Should use previous userId when user already tracked', () => {
        const expectedUserId = 'PREEXISTING_USER_ID'
        storageGateway.trackPageView(expectedUserId, { 
            path: PATH,
            timestamp: TIMESTAMP
        })

        pageViewLogger(storageGateway)(EVENT)

        expect(storageGateway.getUserId()).toBe(expectedUserId)
    })
})
