export default class data {
    
    // function for getting data
    getData(url) {
        debugger;
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(response => {
                    if (response.ok) { return response.json(); }
                })
                .then(data => {
                    resolve(data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
}