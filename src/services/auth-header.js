export function authHeader() {
    const user = localStorage.getItem('user')
    if (user) {
        return { Authorization: user.data }
    } else {
        return {}
    }
}