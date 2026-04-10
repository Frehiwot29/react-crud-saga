import { ADD_TO_CART, EMPTY_CART, REMOVE_FROM_CART, NAVIGATE_TO_ANNOUNCEMENT, INCREMENT_ANNOUNCEMENT_CLICK } from "./constant"

export const addToCart = (data) => {
    console.warn("action is called", data)
    return {
        type: ADD_TO_CART,
        data
    }
}
export const navigateToAnnouncement = (navigate) => {
    return {
        type: NAVIGATE_TO_ANNOUNCEMENT,
        navigate
    }
}

export const incrementAnnouncementClick = () => {
    return {
        type: INCREMENT_ANNOUNCEMENT_CLICK
    }
}

export const removeToCart = (data) => {
    console.warn("action removeToCart", data)
    return {
        type: REMOVE_FROM_CART,
        data
    }
}

export const emptyCart = () => {
    console.warn("action emptyCart",)
    return {
        type: EMPTY_CART,
    }
}