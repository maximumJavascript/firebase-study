import { ButtonUI } from '../../../controls/ButtonUI';
import { postsService } from '../../../posts/posts.service';

export function PostDeleteButton({ onModalClose, postId }) {
  const handleDeletePost = () => {
    if (onModalClose) onModalClose();
    postsService.deletePostItem(postId);
  };
  return <ButtonUI onClick={handleDeletePost}>Delete</ButtonUI>;
}
