import React, { Component } from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

class CommentView extends Component {
    // 댓글마다 고유한 id값
    comment_id = 2;

    state = {
        information: [{
            id: 0,
            author: 'sjyoung',
            content: '안녕하세요',
            likes: 0,
            time: 1544064880438,
        },
        {
            id: 1,
            author: 'julia',
            content: '안녕',
            likes: 2,
            time: 1544007341933,
        }]
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
                            likes: info.likes,
                            ...data,
                        };
                    }
                    return info;
                }
            )
        });
    }

    // 좋아요 수 반영
    updateLikes = (id, likes) => {
        const {information} = this.state;
        this.setState({
            information: information.map(
                info => {
                    if (info.id === id) {
                        return {
                            id: id,
                            author: info.author,
                            content: info.content,
                            likes: likes,
                            time: info.time,
                        };
                    }
                    return info;
                }
            )
        })
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
                onRemove={this.handleRemove}
                updateLikes={this.updateLikes}/>
                <hr />
                <CommentForm type="main" onCreate={this.handleCreate}/>
            </div>
        );
    }
}

export default CommentView;