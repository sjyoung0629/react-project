import React, { Component } from 'react';
import Comment from './Comment';

class CommentList extends Component {
    static defaultProps = {
        data: []
    }
    
    render() {
        const {data, onRemove} = this.props;
        const list = data.map(
            // info들의 배열을 Comment 컴포넌트로 변환해준다
            info => (<Comment info={info} key={info.id}
                                onRemove={onRemove}/>)
        );

        return (
            <div className="comment_list">
                {list}
            </div>
        );
    }
}

export default CommentList;