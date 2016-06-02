import ActivityServices from '../services/ActivityServices';

import {
  LIST_ACTIVITY_REQUEST,
  LIST_ACTIVITY_SUCCESS,
  LIST_ACTIVITY_FAILURE,
  SUBMIT_ACTIVITY_COMMENT,
  SUBMIT_ACTIVITY_LIKE,
  RETRIEVE_PROFILE_REQUEST,
} from '../constants/actionTypes';

const minifize = (url) => {
  let minifized = url.replace(/300x300/g, "40x40");
  return minifized;
}

const listActivityRequest = () => ({ type: LIST_ACTIVITY_REQUEST });
const listActivitySuccess = (data) => ({ type: LIST_ACTIVITY_SUCCESS, data });
const listActivityFailure = () => ({ type: LIST_ACTIVITY_FAILURE });
export const listActivity = () => (dispatch) => {
  dispatch(listActivityRequest());
  ActivityServices.req.list()
    .then((data) => {
      let list = data.map((item) => {
        return {
          ...item,
          actor_avator_small: minifize(item.actor_avator),
          activity_comments_text: [],
          actor_favorite: false,
          activity_liked: false
        }
      });

      dispatch(listActivitySuccess(list));
    })
    .catch((error) => { dispatch(listActivityFailure(error)); });
};

const submitActivityComment = (data) => ({ type: SUBMIT_ACTIVITY_COMMENT, data})
export const submitComment = (data) => (dispatch) => {
  dispatch(submitActivityComment(data));
}

const submitActivityLike = (id) => ({ type: SUBMIT_ACTIVITY_LIKE, id})
export const likeComment = (id) => (dispatch) => {
  dispatch(submitActivityLike(id));
}

const retrieveProfileRequest = (id) => ({ type: RETRIEVE_PROFILE_REQUEST, id });
export const retrieveProfile = (id) => (dispatch) => {
  dispatch(retrieveProfileRequest(id))
}