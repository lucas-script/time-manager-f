const INITIAL_STATE = {
    reportList: [],
    usersList: [],
    sDate: '',
    eDate: '',
    user: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case 'REPORT_GENERATED':
            return { ...state, reportList: action.payload }

        case 'REPORT_USERS_LOADED':
            return { ...state, usersList: action.payload }

        case 'REPORT_SDATE_CHANGED':
            return { ...state, sDate: action.payload }

        case 'REPORT_EDATE_CHANGED':
            return { ...state, eDate: action.payload }

        case 'REPORT_USER_CHANGED':
            return { ...state, user: action.payload }

        default:
            return state
    }
}
