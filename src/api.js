//All apis reqs will be here

export default {
    baseURL: `https://wainnakel.com/api/v1/`,
    getNewSuggestion(location) {
        return fetch(`${this.baseURL}GenerateFS.php?uid=${location.latitude},${location.longitude}&get_param=value`, {
            method: 'get',
            headers: new Headers({
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }),
        })
            .then(response => {
                console.log(response);
                return response;
            })
            .catch(err => {
                console.log(err);
            });
    },
}