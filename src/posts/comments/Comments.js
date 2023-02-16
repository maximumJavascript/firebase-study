import { observer } from 'mobx-react';
import { Component } from 'react';
import { commentsService } from './comments.service';

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
      if (!post.author) return null;
      return <div>{post.author.id}</div>;
    }
  }
);

export { Comments };
