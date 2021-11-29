import axios from "axios";
import _ from "lodash";

// appel au api getStock pour avoir les stock par magasins

export function getDataStock(params = {}, userToken = null) {
    var data = "";
    console.log("token: " + userToken);
    var config = {
        method: "get",
        url: "https://sleepy-waters-46955.herokuapp.com/getstock",
        headers: {
            "x-access-token": userToken,
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "application/json",
        },
    };

    return axios(config);
}

//appel au api transformstock pour faire un transfert du stock d'un magasin à un autre
export function updateStock(data, userToken) {
    var data = JSON.stringify({
        ville1: data.ville1.value,
        ville2: data.ville2.value,
        categorie: data.categorie.value,
        souscategorie: data.souscategorie.value,
        quantity: data.quantity,
    });
    console.log("token: " + data);
    var config = {
        method: "post",
        url: "https://sleepy-waters-46955.herokuapp.com/transfertBlood",
        headers: {
            "x-access-token": userToken,
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "application/json",
        },
        data: data,
    };

    return axios(config);
}