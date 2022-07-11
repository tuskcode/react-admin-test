import { AuthProvider } from "react-admin";

const authProvider: AuthProvider = {
    // called when the user attempts to log in
    login: ({ username, password }) => {
        console.log('~~ auth: login')
        return new Promise((res, rej) => {
            if (username === 'username' && password === 'password') {
                localStorage.setItem('access_token', '$token');
                var date = new Date();
                date.setSeconds(date.getSeconds() + 15);
                localStorage.setItem('access_token_expire', String(date.getTime()));
                return res('');
            } else {
                rej('Wrong username or password')
            }
            // sdk.authenticate({
            //     email: username,
            //     password,
            //     remember: true,
            // }).then((response) => {
            //     console.log(response)
            //     const { access_token } = response.results;
            //     sdk.setAuthorization(access_token as string);
            //     localStorage.setItem('access_token', access_token);
            //     return res('');
            // }).catch(e => rej('Wrong username or password'))
        })
    },
    // called when the user clicks on the logout button
    logout: () => {
        console.log('~~ auth: logout')
        return new Promise((res, rej) => {
            localStorage.removeItem('access_token');
            return res('');
        })
    },
    // called when the API returns an error
    checkError: ({ status }) => {
        console.log('~~ auth: checkError')
        return new Promise((res, rej) => {
            if (status === 401 || status === 403) {
                localStorage.removeItem('access_token');
                return rej('Si è verificato un errore');
            }
            return res();
        });
    },
    // called when the user navigates to a new location, to check for authentication
    checkAuth: () => {
        console.log('~~ auth: checkAuth')
        if (localStorage.getItem('access_token') && localStorage.getItem('access_token_expire')) {
            const expireDate = new Date(Number(localStorage.getItem('access_token_expire')));
            if (expireDate.getTime() > (new Date()).getTime()) {
                console.log('token ok')
                return Promise.resolve();
            } else {
                console.log('token expired. I want to be redirected to /#/login')
                return Promise.reject({redirectTo: '/#/login'})
            }
        } else {
            console.log('token not set. I want to be redirected to /#/login')
            return Promise.reject({redirectTo: '/#/login'})
        }

        // TODO: check if access_token is valid with sdk.getMe()
        // const access_token = localStorage.getItem('access_token');
        // if (access_token) {
        //     return new Promise((res, rej) => {
        //         sdk.getMe()
        //             .then(() => res())
        //             .catch(e => rej('User not logged in'))
        //     })
        // } else {
        //     Promise.reject()
        // }

        // return localStorage.getItem('access_token')
        //     ? Promise.resolve()
        //     : Promise.reject('User not logged in');
    },
    // called when the user navigates to a new location, to check for permissions / roles
    getPermissions: () => {
        console.log('~~ auth: getPermissions')
        return Promise.resolve()
    },
};

export default authProvider;