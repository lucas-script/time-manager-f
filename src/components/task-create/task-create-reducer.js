const today = new Date().toISOString().slice(0, 10)
const INITIAL_STATE = {
    name: '',
    project: '',
    date: today,
    durationInMin: '',
    redirectToList: false,
    projectList: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case 'TASK_CREATE_CREATED':
            return state

        case 'TASK_CREATE_CLEAR_FORM':
            return { ...state,  name: '', date: today, durationInMin: 0 }

        case 'TASK_CREATE_NAME_CHANGED':
            return { ...state, name: action.payload }

        case 'TASK_CREATE_DATE_CHANGED':
            return { ...state, date: action.payload }

        case 'TASK_CREATE_DURATION_CHANGED':
            return { ...state, durationInMin: action.payload }

        case 'TASK_CREATE_PROJECT_CHANGED':
            return { ...state, project: action.payload }

        case 'TASK_CREATE_REDIRECT':
            return { ...state, redirectToList: true }

        case 'TASK_CREATE_REDIRECT_RESET':
            return { ...state, redirectToList: false }

        case 'TASK_CREATED_PROJECTS_LOADED':
            return { ...state, projectList: action.payload }

        default:
            return state
    }
}
