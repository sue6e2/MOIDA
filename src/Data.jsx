import CryptoJS from "crypto-js";

export default class Data {
    static getUserData = () => {
        if (sessionStorage.getItem("userData") != null) {
            const bytes = CryptoJS.AES.decrypt(sessionStorage.getItem('userData'), 'signIn key');
            let userData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            return userData
        }
        else {
            return null
        }
    }
}