import {connect} from 'react-redux';
import { submitUser } from './../../data/actions/userAction';
import Home from './home';

const mapDispatchToProps = dispatch => {
    return {
        login: (user, pass) => dispatch(submitUser(user, pass)),
    }
}

export default connect(null, mapDispatchToProps)(Home);
