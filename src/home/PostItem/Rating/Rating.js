import { PureComponent } from 'react';
import Star from './Star';
import styles from './Rating.module.css';
import { RatingService } from './rating.service';
import { observer } from 'mobx-react';

const Rating = observer(
  class Rating extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        userCount: 0,
      };
      this.service = new RatingService();
    }

    componentDidMount() {
      void this.updateAvegareScore();
    }

    updateAvegareScore = () => {
      this.service.getAverageScore(this.props.postId);
    };

    handleMouseChange = (userCount) => {
      this.setState({ userCount });
    };

    handleAddRating = async (number) => {
      await this.service.addRating(this.props.postId, number);
      this.setState({ userCount: 0 });
      this.updateAvegareScore();
    };

    handleMouseLeave = () => {
      this.setState({ userCount: 0 });
    };

    render() {
      const rating = this.service.averageRating;
      if (rating.postId !== this.props.postId) return null;
      const userCount = this.state.userCount / 2;
      const score = rating.score / 2;
      return (
        <div className={styles.postRaiting} onMouseLeave={this.handleMouseLeave}>
          {new Array(5).fill(0).map((item, index) => {
            const percSelected = userCount - index;
            let percFilled = score - index;
            percFilled =
              percFilled >= 0.5 && percFilled < 1
                ? 0.5
                : percFilled < 0.5
                ? 0
                : percFilled;
            return (
              <Star
                key={index}
                number={index + 1}
                percSelected={percSelected}
                percFilled={percFilled}
                userHovered={!!this.state.userCount}
                onMouseChange={this.handleMouseChange}
                onAddRating={this.handleAddRating}
                postId={this.props.postId}
              />
            );
          })}
        </div>
      );
    }
  }
);

export { Rating };
