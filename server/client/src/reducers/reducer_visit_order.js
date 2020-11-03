import { CHANGE_VISIT_ORDER } from '../actions/index';

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = [], action) {
  switch (action.type) {
    case CHANGE_VISIT_ORDER:
      return action.payload.data;
    default:
      return state;
  }
}