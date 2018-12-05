import React, { Component } from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

class CommentView extends Component {
    // 댓글마다 고유한 id값
    comment_id = 0;

    state = {
        information: []
    }

    handleCreate = (data) => {
        const {information} = this.state;
        this.setState({
          information: information.concat({
            // data가 추가될때마다 id 값 ++
            ...data,
            id: this.comment_id++
          })
        });
    }

    // 댓글 삭제
    handleRemove = (id) => {
        const {information} = this.state;
        this.setState({
            information: information.filter(info => info.id !== id)
        });
    }
    
    render() {
        return (
            <div>
                <CommentList data={this.state.information}
                onRemove={this.handleRemove}/>
                <hr />
                <CommentForm onCreate={this.handleCreate}/>
            </div>
        );
    }
}

export default CommentView;