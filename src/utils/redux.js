import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

export function connectAutoBindAction(mapState, actions = {}) {
    return connect(mapState, dispatch => bindActionCreators(actions, dispatch));
}