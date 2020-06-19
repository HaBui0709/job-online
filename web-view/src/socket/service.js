import openSocket from 'socket.io-client'
import { ApiConst, AppConst } from '../configs'

// TOKEN
const token = localStorage.getItem(AppConst.localStorage.authKey)

const socket = openSocket(ApiConst.endpointUpload, { query: { token } })

export default socket

