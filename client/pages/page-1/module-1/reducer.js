import {Map} from 'immutable';

function module1(state = Map(), action) {
  const {type, context} = action;
  switch (type) {
  case 'module-1-hello':
    return state.set('context', context);
  default:
    return state;
  }
}

export default module1;
