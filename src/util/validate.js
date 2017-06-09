export const required = (f) => {
    if (f != '' && f != null && f!= undefined) {
        return true
    }
    return false
}

export const email = (f) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(f)) {
        return true
    }
    return false
}