import { Component } from 'react';
import { observer } from 'mobx-react';
import { authService } from '../../auth/auth.service';
import CommentLoginButton from '../../controls/CommentLoginButton/CommentLoginButton';
import TextArea from '../../controls/createPostForm/TextArea/TextArea';
import CreatePostBtn from '../../controls/createPostForm/CreatePostBtn/CreatePostBtn';

const CreateComment = observer(
  class CreateComment extends Component {
    handleRedirect = () => {
      authService.handleLogin();
    };

    render() {
      if (!authService.isAuth)
        return (
          <CommentLoginButton
            onClick={this.handleRedirect}
            text={'Чтобы оставлять комментарии, авторизуйтесь'}
          />
        );
      return (
        <div>
          <TextArea />
          <CreatePostBtn />
        </div>
      );
    }
  }
);

export { CreateComment };
