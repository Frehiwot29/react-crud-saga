import {combineReducers} from 'redux'
import { cartData, announcementCount } from './reducer'
import {productData} from './productReducer'
export default combineReducers({
    cartData,
    productData,
    announcementCount
})