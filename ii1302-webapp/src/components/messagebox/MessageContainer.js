import { connect } from 'react-redux';
import { sendMsg, fetchMsg } from './../../data/actions/messageAction';
import { fetchGeneral } from './../../data/actions/settingsAction';
import MessageBox from './MessageBox';

const mapStateToProps = state => {
    return {
        user: state.user,
    }
}

 const mapDispatchToProps = dispatch => {
    return {
        message: (recv, msg) => dispatch(sendMsg(recv, msg)),
        fetch: (selected) => dispatch(fetchMsg(selected)),
        general: () => dispatch(fetchGeneral()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageBox);
