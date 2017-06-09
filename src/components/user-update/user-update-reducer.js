const INITIAL_STATE = {
    name: '',
    email: '',
    password: '',
    role: 'manager',
    changePass: false,
    redirectToList: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case 'USER_UPDATE_UPDATED':
            return { ...state, name: '', email: '',  password: '',role: 'regular' }

        case 'USER_UPDATE_INITIAL_LOAD':
            return state

        case 'USER_UPDATE_NAME_CHANGED':
            return { ...state, name: action.payload }

        case 'USER_UPDATE_EMAIL_CHANGED':
            return { ...state, email: action.payload }

        case 'USER_UPDATE_PASSWORD_CHANGED':
            return { ...state, password: action.payload }

        case 'USER_UPDATE_ROLE_CHANGED':
            return { ...state, role: action.payload }

        case 'USER_UPDATE_CHANGE_PASS_CHANGED':
            return { ...state, changePass: action.payload }

        case 'USER_UPDATE_REDIRECT':
            return { ...state, redirectToList: true }

        case 'USER_UPDATE_REDIRECT_RESET':
            return { ...state, redirectToList: false }

        case 'USER_UPDATE_CLEAR_FORM':
            return { ...state, name: '', email: '', password: '', role: 'regular'}

        default:
            return state
    }
}