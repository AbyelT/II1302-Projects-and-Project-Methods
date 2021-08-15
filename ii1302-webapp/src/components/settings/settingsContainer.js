import { connect } from 'react-redux';
import { changePassword, removeAccount, fetchGeneral, updateGeneral} from '../../data/actions/settingsAction';
import Settings from './settings';

const mapStateToProps = state => {
    return {
        user: state.user,
    }
}

 const mapDispatchToProps = dispatch => {
    return {
        fetch: () => dispatch(fetchGeneral()),
        general: (colour, amount_msg) => dispatch(updateGeneral(colour, amount_msg)), 
        password: (authUser, authPsw, password) => dispatch(changePassword(authUser, authPsw, password)),
        remove: (authUser, authPsw) => dispatch(removeAccount(authUser, authPsw)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
