import * as firebase from "firebase/app";

export const sendMsg = (recv, msg) => {
    let user = firebase.auth().currentUser
    return dispatch => {
        if(user === null) {
            dispatch({type: "ERROR_SEND"});
            alert("Error sending message: the current session has ended, please refresh the page");
        }
        else if(msg.length < 2) {
            dispatch({type: "ERROR_SEND"});
            alert("Error sending message: message size has the minimun of 2 characters");
        }
        else {
            let data2Pager = { read: false, sender: user.uid, text: msg }
            let data2Web = { read: false, recv: recv, text: msg }
            var newMsgKey = firebase.database().ref().push().key;
            var updates = {}
            updates['/msg/' + recv + '/unread/' + newMsgKey] = data2Pager;
            updates['/users/' + user.uid + '/messages/' + newMsgKey] = data2Web;
            return firebase.database().ref().update(updates).then(() => {
                dispatch({type: "SEND"});
            })
            .catch(function(error) {
                dispatch({type: "ERROR_SEND"});
                alert("Error sending message: ", error);
            });
        }
    }
}

export const fetchMsg = (selected) => {
    let user = firebase.auth().currentUser
    return dispatch => {
        if(user === null) 
            dispatch({type: "ERROR_FETCH"});
        else {
            return firebase.database().ref('/users/' + user.uid + '/messages/').once('value')
            .then(function(snapshot) {
                dispatch({type: "FETCH"});
                return Object.values(snapshot.val()).filter(msg => {
                    return msg.recv === selected
                })
            })
            .catch(function(error) {
                dispatch({type: "ERROR_FETCH"});
                alert("Error fetching data: ", error);
            });
        }
    }
}
