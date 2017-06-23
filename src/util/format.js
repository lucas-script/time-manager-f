export const formatDate = (d) => {
    if (d) {
        return new Date(d).toISOString().slice(0, 10)
    } else {
        return new Date().toISOString().slice(0, 10)
    }
}