import {connect} from 'react-redux';
import { logoutUser, checkUser } from './../../data/actions/userAction';
import { toggle } from './../../data/actions/sidebarAction';
import Headermenu from './headermenu';

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        exit: () => dispatch(logoutUser()),
        check: () => dispatch(checkUser()),
        toggle: () => dispatch(toggle())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Headermenu);
