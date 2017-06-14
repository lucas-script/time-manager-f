import axios from 'axios'

const INITIAL_STATE = {
    token: null,
    name: '',
    email: 'admin@gmail.com',
    password: '123123',
    role: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case 'AUTH_USER_AUTHENTICATED':
            localStorage.setItem('token', action.payload.token)
            axios.defaults.headers.common['token'] = localStorage.getItem('token')
            return { ...state, token: action.payload.token, name: action.payload.name, email: action.payload.email, password: '', role: action.payload.role }

        case 'AUTH_TOKEN_EXPIRED':
            localStorage.removeItem('token')
            delete axios.defaults.headers.common['token']
            return { ...state, token: null }

        case 'AUTH_EMAIL_CHANGED':
            return { ...state, email: action.payload }

        case 'AUTH_PASSWORD_CHANGED':
            return { ...state, password: action.payload }

        default:
            return state
    }
}
