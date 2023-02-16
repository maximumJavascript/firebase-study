import { observer } from 'mobx-react';
import { Component } from 'react';
import { commentsService } from './comments.service';
import PostItem from '../../home/PostItem';
import styles from './Comments.module.css';
import homeStyles from '../../home/home.module.css';

const Comments = observer(
  class Comments extends Component {
    constructor(props) {
      super(props);
      // не нашёл как это лучше сделать для классовых компонентов с 6 версией роутера
      this.id = window.location.pathname.split('/')[2];
    }

    componentDidMount() {
      void commentsService.getPost(this.id);
    }

    render() {
      const post = commentsService.post;
      if (!post.text) return null;
      return (
        <div className={homeStyles.container}>
          <div className={homeStyles.homePage}>
            <PostItem post={post} isComments={true} />
          </div>
        </div>
      );
    }
  }
);

export { Comments };
