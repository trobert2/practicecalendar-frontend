export default class API {
    // TODO: Do something if not set.
    apiEndpoint = 'https://europe-west1-trobert2-serverless.cloudfunctions.net/practicecalendar-backend';

    getUserEntry = (successCallback, errorCallback) => {
        let idToken = localStorage.getItem('id_token');
        fetch(this.apiEndpoint, {
            method: 'GET',
            mode: 'cors',
            headers: new Headers({
                Authorization: 'Bearer ' + idToken,
                Accept: 'application/json'
            })
        })
            .then((response) => {
                return response.json().then((data) => {
                    if (response.ok) {
                        return data;
                    } else {
                        // TODO: Check if 401 is handled
                        return Promise.reject({ status: response.status, data });
                    }
                });
            })
            .catch(errorCallback)
            .then(successCallback);
    };

    postUserEntry = (data, successCallback, errorCallback) => {
        console.log(data);
        let idToken = localStorage.getItem('id_token');
        fetch(this.apiEndpoint, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(data),
            headers: new Headers({
                Authorization: 'Bearer ' + idToken,
                'Content-Type': 'application/json',
                Accept: 'application/json'
            })
        })
            .then((response) => {
                console.log(response);
                // TODO: Not JSON! Not always. fix this.
                return response.json().then((data) => {
                    if (response.ok) {
                        return data;
                    } else {
                        // TODO: Check if 401 is handled
                        return Promise.reject({ status: response.status, data });
                    }
                });
            })
            .catch(errorCallback)
            .then(successCallback);
    };
}
