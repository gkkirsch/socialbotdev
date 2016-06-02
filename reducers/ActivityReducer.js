import {
	LIST_ACTIVITY_REQUEST,
	LIST_ACTIVITY_SUCCESS,
	LIST_ACTIVITY_FAILURE,
	SUBMIT_ACTIVITY_COMMENT,
	SUBMIT_ACTIVITY_LIKE,
	RETRIEVE_PROFILE_REQUEST
} from '../constants/actionTypes';

const initialState = {
	isLoading: false,
	list: [],
	page: 1,
	item: {},
	error: null
};

export const activity = (state = initialState, action) => {
	switch(action.type) {
		case LIST_ACTIVITY_REQUEST:
			return { ...state, isLoading: true }
		case LIST_ACTIVITY_SUCCESS:
			return { ...state, isLoading: false, list: action.data }
		case LIST_ACTIVITY_FAILURE:
			return { ...state, isLoading: false }
		case SUBMIT_ACTIVITY_COMMENT:
			var activities = state.list.map((item) => {
				if (item.id === action.data.id) {
					const messages = item.activity_comments_text;
					messages.push(action.data.comment);
					return {
						...item,
						activity_comments_text: messages,
						activity_comments: item.activity_comments + 1
					}
				} else {
					return item
				}
			})
			return {
				...state,
				list: activities 
			}
		case SUBMIT_ACTIVITY_LIKE:
			var activities = state.list.map((item) => {
				if (item.id === action.id) {
					return {
						...item,
						activity_liked: !item.activity_liked,
						activity_likes: item.activity_liked ? item.activity_likes - 1 : item.activity_likes + 1
					}
				} else {
					return item
				}
			})

			return {
				...state,
				list: activities
			}
		case RETRIEVE_PROFILE_REQUEST:
			const profile = state.list.filter((item) => {
				if (item.id === action.id) {
					return item
				}
			})
			return {
				...state,
				item: profile[0]
			}
		default: return state
	}
}