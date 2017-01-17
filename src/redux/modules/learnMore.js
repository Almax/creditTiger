const SAVE = 'LEARN_MORE_SAVE_CONTACT';
const SAVE_SUCCESS = 'LEARN_MORE_SAVE_SUCCESS_CONTACT';
const SAVE_FAIL = 'LEARN_MORE_SAVE_FAIL_CONTACT';

const initialState = {
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SAVE:
      return state; // 'saving' flag handled by redux-form
    case SAVE_SUCCESS:
      return state;
    case SAVE_FAIL:
      return state;
    default:
      return state;
  }
}

export function save(contact) {
  console.log('saving contact', contact);
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    promise: (client) => client.post('/learn_more/save', {
      data: contact
    })
  };
}
