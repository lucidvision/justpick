import axios from 'axios'
import { GOOGLE_API_KEY } from 'config/env'

export function fetchRestaurants(location, radius) {
  const config = {
    url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&key=${GOOGLE_API_KEY}`,
    method: 'GET',
  }
  return axios(config)
}

export function fetchPhoto(reference) {
  const config = {
    url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${reference}&key=${GOOGLE_API_KEY}`,
  }
  return axios(config)
}
