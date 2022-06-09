import axios from './axios'

export function getMultidata() {
  return axios({ url: '/home/multidata' })
}
