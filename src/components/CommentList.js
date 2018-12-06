import React, { Component } from 'react';
import Comment from './Comment';

class CommentList extends Component {
    static defaultProps = {
        data: []
    }

    state = {
        bestSort: true,
        recentSort: false,
    }

    // 추천순 정렬
    handleToggleBestSort = () => {
        this.setState({
            bestSort: true,
            recentSort: false,
        });
    }

    // 최신순 정렬
    handleToggleRecentSort = () => {
        this.setState({
            bestSort: false,
            recentSort: true,
        });
    }
    
    render() {
        const {onUpdate, onRemove, updateLikes} = this.props;
        let {data} = this.props;
        // props 렌더링 전 정렬
        if (this.state.bestSort) {
            // 추천순 정렬: '좋아요' 개수 기준으로 내림차순 정렬
            data = data.sort(function (a, b) {
                return b.likes - a.likes;
            });
        } else {
            // 최신순 정렬: 입력 시간(timestamp) 기준으로 내림차순 정렬
            data = data.sort(function(a, b) {
                return b.time - a.time;
            });
        }

        const list = data.map(
            // info들의 배열을 Comment 컴포넌트로 변환해준다
            info => (<Comment info={info} key={info.id}
                                onUpdate={onUpdate}
                                onRemove={onRemove}
                                updateLikes={updateLikes}/>)
        );
        const arr_len = list.length;

        return (
            <div>
                <div className="sort">
                <input type="button" name="bestSort" value="추천순"
                        onClick={this.handleToggleBestSort} />
                <input type="button" name="recentSort" value="최신순"
                        onClick={this.handleToggleRecentSort} />
                </div>
                <div className="commentList">
                    <div>
                        <span>{arr_len}</span><span>개의 댓글</span>
                    </div>
                    {list}
                </div>
            </div>
        );
    }
}

export default CommentList;