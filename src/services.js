import axios from "axios";

var services = function() {
    const getInventoryItems = function() {
        return axios.get('/data.json')
        .then(function (response) {
            return response.data;
        });
    };

    return {
        getInventoryItems
    }


};

export default services();