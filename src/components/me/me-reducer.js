const INITIAL_STATE = {
    name: '',
    email: '',
    password: '',
    workload: '',
    workloadEnable: '',
    changePass: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case 'ME_UPDATED':
            return state

        case 'ME_LOAD':
            return state

        case 'ME_NAME_CHANGED':
            return { ...state, name: action.payload }

        case 'ME_EMAIL_CHANGED':
            return { ...state, email: action.payload }

        case 'ME_PASSWORD_CHANGED':
            return { ...state, password: action.payload }

        case 'ME_CHANGE_PASS_CHANGED':
            return { ...state, changePass: action.payload }

        case 'ME_WORKLOAD_CHANGED':
            return { ...state, workload: action.payload }

        case 'ME_WORKLOAD_ENABLE_CHANGED':
            return { ...state, workloadEnable: action.payload }

        case 'ME_REDIRECT':
            return { ...state, redirectToList: true }

        default:
            return state
    }
}
