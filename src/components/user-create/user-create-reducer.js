const INITIAL_STATE = {
    name: '',
    email: '',
    password: '',
    role: 'admin',
    redirectToList: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case 'USER_CREATE_CREATED':
            return state

        case 'USER_CREATE_CLEAR_FORM':
            return { ...state,  name: '', email: '', password: '', role: 'regular'}

        case 'USER_CREATE_NAME_CHANGED':
            return { ...state, name: action.payload }

        case 'USER_CREATE_EMAIL_CHANGED':
            return { ...state, email: action.payload }

        case 'USER_CREATE_PASSWORD_CHANGED':
            return { ...state, password: action.payload }

        case 'USER_CREATE_ROLE_CHANGED':
            return { ...state, role: action.payload }

        case 'USER_CREATE_REDIRECT':
            return { ...state, redirectToList: true }

        case 'USER_CREATE_REDIRECT_RESET':
            return { ...state, redirectToList: false }

        default:
            return state
    }
}
