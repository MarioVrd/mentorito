import { HIDE_MENU, SHOW_MENU, TOGGLE_MENU } from '../constants/uiConstants'

export const uiGlobalsReducer = (state = { menuOpened: false }, action) => {
    switch (action.type) {
        case HIDE_MENU:
            return { menuOpened: false }
        case SHOW_MENU:
            return { menuOpened: true }
        case TOGGLE_MENU:
            return { menuOpened: !state.menuOpened }
        default:
            return state
    }
}
