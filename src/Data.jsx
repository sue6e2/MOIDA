import CryptoJS from "crypto-js";

export default class Data {
    static getUserData = () => {
        if (sessionStorage.getItem("userData") != null) {
            const bytes = CryptoJS.AES.decrypt(sessionStorage.getItem('userData'), 'signIn key');
            let userData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            let userRealId = sessionStorage.getItem("accountRealId");
            userData.realId = userRealId;
            let userName = sessionStorage.getItem("accountName");
            userData.accountName = userName;
            return userData
        }
        else {
            return null
        }
    }

    static getChallengeData = () => {
        if (sessionStorage.getItem("challengeData") != null) {
            const bytes = CryptoJS.AES.decrypt(sessionStorage.getItem('challengeData'), 'challenge key');
            let challengeData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            return challengeData
        }
        else {
            return null
        }
    }
}