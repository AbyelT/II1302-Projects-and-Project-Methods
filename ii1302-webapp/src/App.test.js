import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as messageAction from './data/actions/messageAction'
import * as settingsAction from './data/actions/settingsAction'
import * as userAction from './data/actions/userAction'
import * as sidebarAction from './data/actions/sidebarAction'
import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

beforeAll(() => {
    const firebaseConfig = {
        apiKey: "AIzaSyCIrpYGQLp6JVlz16ryFtmau0ajT-MqLzU",
        authDomain: "pager-project-ii1302.firebaseapp.com",
        databaseURL: "https://pager-project-ii1302.firebaseio.com",
        projectId: "pager-project-ii1302",
        storageBucket: "pager-project-ii1302.appspot.com",
        messagingSenderId: "578988167558",
        appId: "1:578988167558:web:8a0574b3e61bae0b585c07",
        measurementId: "G-LC0XFGJEYT"
    };
    firebase.initializeApp(firebaseConfig); 
    window.alert = jest.fn();
});

afterEach(() => {
  window.alert.mockClear();
})

afterAll(() => {
  firebase.app().delete();
})

describe('userActions', () => {
    /*for userActions - Login*/
    it('cannot authenticate the user with wrong credentials', () => {
      const expectedActions = [{ type:"ERROR_LOGIN" }]
      const store = mockStore({ type: [] })
      return store.dispatch(userAction.submitUser("wrong@wrong.no", "notcorrectpsw")).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
    })

    it('can authenticate the user with correct credentials', () => {
      const expectedActions = [{ type:"LOGIN", payload: "test@test.test" }]
      const store = mockStore({ type: [] })
      return store.dispatch(userAction.submitUser("test@test.test", "testingtesting")).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    })

    it('can return the current user', () => {
      const expectedActions = []
      const expectedValue = "test@test.test"
      const store = mockStore({ type: [] })
      let data = store.dispatch(userAction.checkUser("test@test.test", "testingtesting"))
      expect(store.getActions()).toEqual(expectedActions)
      expect(data).toEqual(expectedValue)
    })
})

describe('messageActions - logged in', () => {
  it('can send message to database', () => {
    const expectedActions = [{ type:"SEND" }]
    const store = mockStore({ type: [] })
    return store.dispatch(messageAction.sendMsg("test", "hello test!")).then(data => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('cannot send message with length less than 2', () => {
    const expectedActions = [{ type:"ERROR_SEND" }]
    const store = mockStore({ type: [] })
    store.dispatch(messageAction.sendMsg("test", "a"))
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('can fetch correctly from database', () => {
    const expectedActions = [{ type:"FETCH" }]
    const store = mockStore({ type: [] })
    return store.dispatch(messageAction.fetchMsg("test")).then(data => {
      expect(store.getActions()).toEqual(expectedActions)
      expect(data[0].text).toEqual("hello test!")
    })
  })
})

describe('settingsAction - logged in', () => {
  it('can fetch general settings', () => {
    const expectedActions = [{type: "FETCH_GENERAL"}];
    const store = mockStore({ type: [] });
    return store.dispatch(settingsAction.fetchGeneral()).then(data => {
      expect(store.getActions()).toEqual(expectedActions);
      expect(data.general.amount_msg).toEqual(3);
      expect(data.general.colour).toEqual("inherit");
    });
  });

  it('can update general settings', () => {
    const expectedActions = [{type: "UPDATE_GENERAL"}];
    const store = mockStore({type: []});

    return store.dispatch(settingsAction.updateGeneral("red", 5)).then(data => {
      expect(store.getActions()).toEqual(expectedActions);
      return store.dispatch(settingsAction.fetchGeneral()).then(data => {
        expect(data.general.amount_msg).toEqual(5);
        expect(data.general.colour).toEqual("red");
      })
      .then(() => {
        //this resets the values for next test run
        store.dispatch(settingsAction.updateGeneral("inherit", 3))
      })
    })      
  })
})

describe('userAction & messageAction - log out and logged out', () => {
      it('can log out user', () => {
        const expectedActions = [{type: "SIDEBAR_LOGOUT"}, {type: "LOGOUT"}]
        const store = mockStore({ type: [] })
        store.dispatch(userAction.logoutUser())
        expect(store.getActions()).toEqual(expectedActions)
      })
  
      it('does not send any messages when signed out', () => {
          const expectedActions = [{type:"ERROR_SEND"}]
          const store = mockStore({ type: [] })
          store.dispatch(messageAction.sendMsg("test", "does not work!"))
          expect(store.getActions()).toEqual(expectedActions)
      })
  
      it('does not fetch when signed out', () => {
          const expectedActions = [{type:"ERROR_FETCH"}]
          const store = mockStore({ type: [] })
          store.dispatch(messageAction.fetchMsg()) 
          expect(store.getActions()).toEqual(expectedActions) 
      })
})

describe('account - change pwd, remove account', () => {
     it('cannot change password with WRONG credentials', () => {
      const expectedActions = [{type: "ERROR_AUTH"}];
      const store = mockStore({type: []});
      return firebase.auth().createUserWithEmailAndPassword("remover@test.com", "testingtesting")
        .then(() => { return firebase.auth().signInWithEmailAndPassword("remover@test.com", "testingtesting")
            .then(() => { return store.dispatch(settingsAction.changePassword("remover@test.com", "WRONG_PSW","shouldNotHappen"))
              .then(() => { return expect(store.getActions()).toEqual(expectedActions) })
            })
        })
    })

    it('can change password with CORRECT credentials', () => {
      const expectedActions = [{type: "PSW_CHANGED"}];
      const store = mockStore({type: []});
      return firebase.auth().signInWithEmailAndPassword("remover@test.com", "testingtesting")
        .then(() => { return store.dispatch(settingsAction.changePassword("remover@test.com", "testingtesting","newPassword"))
          .then(() => { return expect(store.getActions()).toEqual(expectedActions) })
      })
    })

    it('cannot remove account with WRONG credentials', () => {
      const expectedActions = [{type: "ERROR_AUTH"}];
      const store = mockStore({type: []});
      return firebase.auth().signInWithEmailAndPassword("remover@test.com", "newPassword")
        .then(() => { return store.dispatch(settingsAction.removeAccount("remover@test.com", "WRONG_PSW"))
          .then(() => { return expect(store.getActions()).toEqual(expectedActions) })
      })
    })

    it('can remove account with CORRECT credentials', () => {
      const expectedActions = [{type: "USER_DELETED"}];
      const store = mockStore({type: []});
       return firebase.auth().signInWithEmailAndPassword("remover@test.com", "newPassword")
          .then(() => { return store.dispatch(settingsAction.removeAccount("remover@test.com", "newPassword"))
            .then(() => { return expect(store.getActions()).toEqual(expectedActions) })
        })
    })
})

describe('sidebarAction', () => {
  it('can toggle the sidebar', () => {
    const expectedActions = [{ type:"SIDEBAR" }]
    const store = mockStore({ type: [] })
    store.dispatch(sidebarAction.toggle())
    expect(store.getActions()).toEqual(expectedActions)
  })
})