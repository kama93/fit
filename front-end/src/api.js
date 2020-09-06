

export function fetchWithToken(url, token, options) {
    options['headers']['fit-token'] = token
    return fetch(url, options)
        .then(x => {
            if (x.status == 401) {
                console.log('invalid token')
                window.location.href = '/login'
            }

            return x
        })
}