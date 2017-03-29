import React, {Component, PropTypes} from 'react';
import "./style.scss";

export default class Status extends Component {
    static propTypes = {
        status: PropTypes.string,
        like: PropTypes.number,
        count: PropTypes.number
    }

    state = {
        like: false
    }

    clickLike(e) {
        // Tắt sự kiện chuyển trang khi click lên thẻ a
        e.preventDefault();

        // Cập nhật lại like, nếu like hiện tại là false thì sẽ update là true, và ngược lại
        this.setState({
            like: !this.state.like
        })
    }

    render() {
        // Khởi tạo className mặc định cho like
        let likeClassName = `like`;

        // Nếu như like thì sẽ thêm active vào likeClassName
        if (this.state.like) {
            likeClassName += ' active';
        }

        return <div className="status">
            <p>{this.props.status} Count: {this.props.count}</p>
            <div className="meta">
                {/* Lưu ý xử dụng .bind(this), mình sẽ giải thích sau*/}
                <a onClick={this.clickLike.bind(this)} className={likeClassName} href="#">
                    ♥ {this.state.like ? 'Liked' : ''}
                </a>
                <div className="time">
                    {this.props.time}
                </div>
            </div>

        </div>
    }
}