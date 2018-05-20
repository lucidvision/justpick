import axios from 'axios'
import { GOOGLE_API_KEY } from 'config/env'

export function fetchRestaurants(coords, radius = '1500') {
  const { latitude, longitude } = coords
  const config = {
    url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=restaurant&key=${GOOGLE_API_KEY}`,
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
