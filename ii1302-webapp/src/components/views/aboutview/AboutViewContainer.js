import { connect } from 'react-redux';
import AboutView from './AboutView';

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, null)(AboutView);