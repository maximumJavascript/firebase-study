import styles from "./Author.module.css";
import { authService } from "../../../auth/auth.service";
export default function Author(props) {
  let noPhotoSrc = "https://medasco.ru/data/uploads/no-image-900x.jpg";
  let photoSrc = null;
  if (props.photoSrc === undefined) {
    photoSrc = noPhotoSrc;
  } else {
    photoSrc = props.photoSrc;
  }
  return (
    <div className={styles.postAuthor}>
      <div className={styles.authorImg}>
        <img
          className={styles.authorImg__img}
          src={photoSrc}
          alt="img: Photo author post"
        />
      </div>
      <div className={styles.authorInfo}>
        <div className={styles.authorName}>@{props.name}</div>
        <div className={styles.authorPostDate}>
          {new Date().toLocaleDateString("en", { dateStyle: "medium" })}
        </div>
      </div>
    </div>
  );
}
