import { connect } from 'react-redux';
import { checkUser } from './../../data/actions/userAction';

import Sidebar from './sidebar';

const mapStateToProps = state => {
    return {
        sidebar: state.sidebar
    }
}

 const mapDispatchToProps = dispatch => {
    return {
        user: () => dispatch(checkUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);