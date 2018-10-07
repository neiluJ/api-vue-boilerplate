import {ApiClient} from './http'

export default {
    greetings() {
        return ApiClient.get('/greetings')
    }
}