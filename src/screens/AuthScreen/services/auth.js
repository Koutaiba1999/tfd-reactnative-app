import axios from "axios";
import _ from "lodash";


//cette fonction permet de créer un token lorsque l'utilisateur se connect
export function retrieveToken(data) {
    var data = JSON.stringify({ username: data.email, password: data.password });

    var config = {
        method: "post",
        url: "https://sleepy-waters-46955.herokuapp.com/login",
        headers: {
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "application/json",
        },
        data: data,
    };

    return axios(config)

}
// appel a l'api register pour créer du nouveau compte
export function registerUser(data) {
    var data2 = JSON.stringify({ username: data.username, email: data.email, name: data.name, password: data.password });
    console.log(data2)
    var config = {
        method: "post",
        url: "https://sleepy-waters-46955.herokuapp.com/register",
        headers: {

            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "application/json",
        },
        data: data2,
    };
    return axios(config)

}
//cette fonction pour avoir les détails d'un utilisateur via un token 
