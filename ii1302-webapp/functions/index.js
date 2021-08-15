const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.changeReadStatus = functions.database.ref('/msg/{userid}/unread/{msgid}')
    .onUpdate((change, context) => {
        const before = change.before.val();
        const after = change.after.val();

        // make sure not to get stuck in loop
        if(before === after) {
            console.log("no change");
            return null;
        }

        var userid = change.after.ref.parent.parent.key;
        var msgid = change.after.ref.key;
        var senderid = change.after.child('sender').val();
        var readbool = change.after.child('read').val();
        
        // deleting a user will trigger this function, hence this check to only run it when it needs to be run.
        if(change.before.child('read').val() !== change.after.child('read').val()) {
            
            // if the user is deleted, no need to update the /users/ branch.
            if(change.after.child('sender').val() !== "Deleted user") {
                // if msg is read, set the msg copy in /users/ branch to true.
                admin.database().ref('/users/' + senderid + '/messages/' + msgid + '/read/').set(true);
            }
            
            // move the msg to read
            admin.database().ref('/msg/' + userid + '/read/' + msgid + '/').set(after);

            // remove the msg from unread
            return change.after.ref.set(null);
        }
        return null;
    });

const MAX_MSGS = 20;

exports.limitReadMsgs = functions.database.ref('/msg/{userid}/read/{msgid}')
    .onWrite(async (change, context) => {

        // ref to parent
        const parentRef = change.after.ref.parent;

        // snapshot of parent
        const parent = await parentRef.once('value');

        if(parent.numChildren() >= MAX_MSGS) {
            const diff = parent.numChildren() - MAX_MSGS;
            let i = 1;
            const children = {};
            parent.forEach((child) => {
                if(i++ <= diff) {
                    children[child.key] = null;
                }
            });
            return parentRef.update(children);
        }
        return null;
    });

exports.removeUserData = functions.auth.user()
    .onDelete((user) => {
        return admin.database().ref('/users/' + user.uid).set(null);
    });

exports.removeUsersMessages = functions.database.ref('/users/{userid}')
    .onDelete(async snapshot => {
        console.log(snapshot.key);

        const msgRef = admin.database().ref('/msg/');
        const msgSnap = await msgRef.once('value');

        msgSnap.forEach((hardware_user) => {
            hardware_user.forEach((read_status) => {
                read_status.forEach((msgid) => {
                    if(msgid.child('sender').val() === snapshot.key) {
                        msgid.child('sender').ref.set("Deleted user");
                    }
                })
            })
        })
        return null;
    });

exports.createUserDefaultSettings = functions.auth.user()
    .onCreate((user) => {
        var generalRef = admin.database().ref('/users/' + user.uid + '/general/');
        generalRef.child('amount_msg').set(3);
        generalRef.child('colour').set("inherit");
        var messageRef = admin.database().ref('/users/' + user.uid + '/messages/dummyID/');
        messageRef.child('read').set(false);
        messageRef.child('recv').set("none");
        messageRef.child('text').set("");
        return null;
    });
