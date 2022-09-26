import { POST_UPDATE, USER_UPDATE } from './constant'

type stateDataType = {
	user: {
		id: string
	}
}
export const setTitle: Function
= (title: string) => (dispatch: any) => {
	dispatch({
		type: POST_UPDATE,
		payload: {
			newTitle: title,
		},
	})
}

export const setUser: Function
= (data: stateDataType) => (dispatch: any) => {
	dispatch({
		type: USER_UPDATE,
		payload: {
			newUser: data,
		},
	})
}
