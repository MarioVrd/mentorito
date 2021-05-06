import axios from 'axios'
import { UPLOAD_FAIL, UPLOAD_REQUEST, UPLOAD_SUCCESS } from '../constants/uploadConstants'
import { getAuthorizedFormConfig } from '../utils/axiosConfig'

export const uploadFile = file => async (dispatch, getState) => {
    const formData = new FormData()
    formData.append('file', file)
    try {
        dispatch({ type: UPLOAD_REQUEST })

        const {
            userLogin: { userInfo }
        } = getState()

        const { data } = await axios.post(
            '/api/upload',
            formData,
            getAuthorizedFormConfig(userInfo.token)
        )

        dispatch({ type: UPLOAD_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: UPLOAD_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}
