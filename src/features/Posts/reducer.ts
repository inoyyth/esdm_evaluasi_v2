import { isNil } from 'lodash'
import { POST_UPDATE, USER_UPDATE } from './constant'

type actionType = {
	type: string | null
	payload?: any
}

type stateDataType = {
  title?: string
	user?: {
		id: string
		email: string
		user_registered: string
		name: string
	}
}

const initialState: stateDataType = {
	title: '',
	user: {
		id: '',
		email: '',
		user_registered: '',
		name: '',
	},
}
type paramReducerType =
// eslint-disable-next-line no-unused-vars
(state: stateDataType | undefined, action: actionType)
=> stateDataType | undefined

const postReducer: paramReducerType
= (state: stateDataType = initialState, action: actionType) => {

	switch(action.type) {
	case POST_UPDATE:
		if (!isNil(action.payload.newTitle)) {
			const newTitle: string = action.payload.newTitle
			return {
				...state,
				title: newTitle,
			}
		}
		break
	case USER_UPDATE:
		if (!isNil(action.payload.newUser)) {
			const newUser: any = action.payload.newUser
			return {
				...state,
				user: newUser,
			}
		}
		return {
			...state,
		}
	default:
		return state
	}

}

export default postReducer
