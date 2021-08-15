import * as firebase from "firebase/app";

export const submitUser = (email, password) => {
    return dispatch => {
        return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(data => dispatch({type: "LOGIN", payload: data.user.email}))
        .catch(function(error) {
            dispatch({type: "ERROR_LOGIN"});
            alert(error)
        });
    }
}

export const logoutUser = () => {
    return dispatch => {
        firebase.auth().signOut()
        .catch(function(error) {
            dispatch({type: "ERROR"});
            alert(error)
        });
        dispatch({type: "SIDEBAR_LOGOUT"}) 
        dispatch({type: "LOGOUT"}) 
    }
}

export const checkUser = () => {
    return dispatch => {
        let user = firebase.auth().currentUser
        if(user === null) return null
        else return user.email
    }
}

export async function test() {
    firebase.auth().signInWithEmailAndPassword("test@test.test", "testingtesting")
    .then(() => console.log("signed in!"))
    .catch(function(error) {
        console.log(error)
        alert(error)
    });
}
