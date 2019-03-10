
export default class API {
    // TODO: Do something if not set.
    idToken = localStorage.getItem('id_token');
    apiEndpoint = "https://europe-west1-trobert2-serverless.cloudfunctions.net/practicecalendar-backend";

    getUserEntry = (successCallback, errorCallback) => {
        fetch(this.apiEndpoint, { 
            method: 'GET',
            mode: "cors", 
            headers: new Headers({
              'Authorization': 'Bearer ' + this.idToken, 
              'Accept': 'application/json'
            }), 
          })
          .then(response => response.json())
          .catch(errorCallback)
          .then(successCallback);
    }
}