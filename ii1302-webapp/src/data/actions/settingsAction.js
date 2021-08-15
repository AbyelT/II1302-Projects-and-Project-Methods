import * as firebase from "firebase/app";

export const changePassword = (authUser, authPsw, password) => {
    return dispatch => {
        var user = firebase.auth().currentUser;
        var credential = firebase.auth.EmailAuthProvider.credential(authUser, authPsw)
        return user.reauthenticateWithCredential(credential).then(() => {
            return user.updatePassword(password).then(() => {
                    dispatch({type: "PSW_CHANGED"});
                    alert("password changed!")
                }).catch(function(error) {
                    dispatch({type: "ERROR_PSW"});
                    alert("error: please choose another password")
                })
            }).catch(function(error) {
                dispatch({type: "ERROR_AUTH"});
                alert("an unexpected error has occured")
            })
    }
}

export const removeAccount = (authUser, authPsw) => {
    return dispatch => {
        var user = firebase.auth().currentUser;
        var credential = firebase.auth.EmailAuthProvider.credential(authUser, authPsw)
        return user.reauthenticateWithCredential(credential).then(() => {
            return user.delete().then(() => {
                dispatch({type: "USER_DELETED"});
                alert("user deleted - you will now return to the home page")
            }).catch(function(error) {
                dispatch({type: "ERROR_DELETE"});
                alert("error: try deleting your account later")
            })
        }).catch(function (error) {
            dispatch({type: "ERROR_AUTH"});
            alert("an unexpected error has occured")
        })
    }
}

export const fetchGeneral = () => {
    return dispatch => {
        var userId = firebase.auth().currentUser.uid
        return firebase.database().ref('/users/' + userId).once('value')
        .then(function(snapshot) {
            dispatch({type: "FETCH_GENERAL"});
            return snapshot.val()          
        })
        .catch(function(error) {
            dispatch({type: "ERROR_FETCH_GENERAL"});
            alert("Error fetching settings: ", error);
        });
    }
}

export const updateGeneral = (colour, amount) => {
    return dispatch => {
        let user = firebase.auth().currentUser.uid
            let options = {
                colour: colour,
                amount_msg: parseInt(amount)
        }
        var updates = {}
        updates['/users/' + user+ '/general/'] = options;
        return firebase.database().ref().update(updates)
        .then(function() {
            dispatch({type: "UPDATE_GENERAL"})
            alert("settings saved!")
        })
        .catch(function(error) {
            dispatch({type: "ERROR_UPDATE_GENERAL"})
            alert("Error saving settings: ", error);
        })
    }
}
