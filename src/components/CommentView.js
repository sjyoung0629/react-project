import React, { Component } from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

class CommentView extends Component {
    // 댓글마다 고유한 id값
    comment_id = 0;

    state = {
        information: []
    }

    // 댓글 입력
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

    // 댓글 수정
    handleUpdate = (id, data) => {
        const {information} = this.state;
        this.setState({
            information: information.map(
                info => {
                    if (info.id === id) {
                        return {
                            id: id,
                            author: info.author,
                            time: info.time,
                            ...data,
                        };
                    }
                    return info;
                }
            )
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
                onUpdate={this.handleUpdate}
                onRemove={this.handleRemove}/>
                <hr />
                <CommentForm onCreate={this.handleCreate}/>
            </div>
        );
    }
}

export default CommentView;