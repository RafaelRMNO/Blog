import app from 'firebase/app';
import 'firebase/database';
import 'firebase/storage'
import 'firebase/auth';

let firebaseConfig = {
    apiKey: "AIzaSyCbdHXiBdfDSSwXw1dh3XU62AH8nX-DGJA",
    authDomain: "brechoapp-a7b4a.firebaseapp.com",
    databaseURL: "https://brechoapp-a7b4a.firebaseio.com",
    projectId: "brechoapp-a7b4a",
    storageBucket: "brechoapp-a7b4a.appspot.com",
    messagingSenderId: "159787734903",
    appId: "1:159787734903:web:db3a06ff890effb6ec3372",
    measurementId: "G-VY8FLGX3VX"
};


class Firebase {
    constructor() {
        if (!app.apps.length) {
            app.initializeApp(firebaseConfig);
        }

        // referenciando a database para acesar em outros locais
        this.app = app.database();
        this.storage = app.storage();

    }






    login(email, password) {
        return (app.auth().signInWithEmailAndPassword(email, password))


    }

    logout() {
        return app.auth().signOut()
    }

    async register(nome, email, password) {

        await app.auth().createUserWithEmailAndPassword(email, password)

        const uid = app.auth().currentUser.uid;
        return (app.database().ref('usuarios').child(uid).set({
            nome: nome
        }))

    }

    isInitialized() {
        return new Promise(resolve => {
            app.auth().onAuthStateChanged(resolve);
        })
    }

    getCurrent() {
        return app.auth().currentUser && app.auth().currentUser.email;
    }

    getCurrentUid() {
        return app.auth().currentUser && app.auth().currentUser.uid;
    }

    async getUserName(callback) {
        if (!app.auth().currentUser) {
            return null
        }

        const uid = app.auth().currentUser.uid;
        await app.database().ref('usuarios').child(uid)
            .once('value').then(callback)

    }

}

export default new Firebase();