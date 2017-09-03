import Cookies from 'js-cookie'
import CookieStorageGateway from '../../gateways/CookieStorageGateway'
import { createCookie, getCookie } from '../utils'

describe('CookieStorageGateway', () => {
    const PATH = 'http://trackedpage.com'
    const TIMESTAMP = 1504446923512
    let gateway
    let document

    beforeEach(() => {
        Cookies.remove('pageViewsTracked')
        Cookies.remove('userEmail')
        gateway = new CookieStorageGateway(window.document)
    })

    describe('trackPageView', () => {
        test('Should save page track to local storage', () => {
            gateway.trackPageView({ path: PATH, timestamp: TIMESTAMP })

            const pagesTracked = getCookie('pageViewsTracked')
            expect(pagesTracked).toEqual([{
                path: PATH,
                timestamp: TIMESTAMP
            }])
        })

        test('Should not overwrite page views already tracked', () => {
            const pageTracked = { path: 'http://trackedpage.com/contact/', timestamp: 'Sun Aug 27 2017 21:40:15 GMT-0300 (-03)' }
            gateway.trackPageView(pageTracked)

            gateway.trackPageView({ path: PATH, timestamp: TIMESTAMP })

            const pagesTracked = getCookie('pageViewsTracked')
            expect(pagesTracked).toEqual([
                pageTracked,
                {
                    path: PATH,
                    timestamp: TIMESTAMP
                }
            ])
        })
    })

    describe('getPageViewsTracked', () => {
        test('Should get pages tracked from localStorage in json format', () => {
            const pageTracked = { path: PATH, timestamp: TIMESTAMP }
            createCookie('pageViewsTracked', [pageTracked])

            const pagesTracked = gateway.getPageViewsTracked()

            expect(pagesTracked).toEqual([pageTracked])
        })
    })

    describe('getUserEmail', () => {
        test('Should get user email when set', () => {
            const userEmail = 'user@email.com'
            createCookie('userEmail', userEmail)

            expect(gateway.getUserEmail()).toEqual(userEmail)
        })
    })

    describe('setUserEmail', () => {
        test('Should define user email on key userEmail', () => {
            const userEmail = 'user@email.com'

            gateway.setUserEmail(userEmail)

            const userEmailStored = Cookies.get('userEmail')
            expect(userEmailStored).toEqual(userEmail)
        })
    })
})
