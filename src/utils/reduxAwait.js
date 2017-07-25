import {connect as reduxConnect} from 'react-redux';
import {bindActionCreators} from 'redux';

export function connect(mapStateToProps, mapDispatchToProps, ...args) {
    return reduxConnect((state, ownProps) => {
        const props = mapStateToProps(state, ownProps);
        let awaitStatuses = (state.await.statuses instanceof Array) ? {} : state.await.statuses;
        let awaitErrors = (state.await.errors instanceof Array) ? {} : state.await.errors;
        return {...props, awaitStatuses, awaitErrors};
    }, mapDispatchToProps, ...args)
}

export function connectAutoBindDispatch(mapStateToProps, actions = {}, ...args) {
    return connect(mapStateToProps, dispatch => bindActionCreators(actions, dispatch), ...args)
}

export function autoDetectStatusAllRequest(...args) {
    return connect((state) => {
        let statusAllRequest = '';
        if (Object.values(state.awaitStatuses).indexOf('pending') > -1) {
            statusAllRequest = 'pending';
        } else {
            statusAllRequest = 'success'
        }
        return {statusAllRequest}
    }, {}, ...args);
}

export function awaitCheckStatus(props, key, status, callback) {
    if (props.awaitStatuses[key] === status) {
        return callback ? callback : true;
    }
    ;
    return false;
}

export function awaitCheckPending(props, key, callback) {
    return awaitCheckStatus(props, key, 'pending', callback)
}

export function awaitCheckSuccess(props, key, callback) {
    return awaitCheckStatus(props, key, 'success', callback)
}

export function awaitCheckFail(props, key, callback) {
    return awaitCheckStatus(props, key, 'fail', callback)
}