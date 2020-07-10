import config from '../config'
import TokenService from './token-service'

const ThingApiService = {
  getThings() {
    return fetch(`${config.API_ENDPOINT}/things`, {
      headers: {
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  getThing(thingId) {
    return fetch(`${config.API_ENDPOINT}/things/${thingId}`, {
      headers: { Authorization : `bearer ${TokenService.getAuthToken()}`
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(Promise.reject(TokenService.clearAuthToken()))
          .then(window.location.replace("http://localhost:3000/login"))
          : res.json()
      )
      // res.json().then(e => Promise.reject(e))
  },
  getThingReviews(thingId) {
    return fetch(`${config.API_ENDPOINT}/things/${thingId}/reviews`, {
      headers: { Authorization : `bearer ${TokenService.getAuthToken()}`
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(Promise.reject(TokenService.clearAuthToken()))
          .then(window.location.replace("http://localhost:3000/login"))
          : res.json()
      )
  },
  postReview(thingId, text, rating) {
    return fetch(`${config.API_ENDPOINT}/reviews`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization : `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({
        thing_id: thingId,
        rating,
        text,
      }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  }
}

export default ThingApiService
