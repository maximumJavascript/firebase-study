import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { PureComponent } from 'react';
import Star from './Star';
import styles from './Rating.module.css';

const Rating = observer(
  class Rating extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        userCount: 0,
      };
    }

    componentDidMount() {
      void this.updateAvegareScore();
    }

    updateAvegareScore = () => {
      void this.props.service.getAverageScore(this.props.postId);
    };

    handleMouseChange = (userCount) => {
      this.setState({ userCount });
    };

    handleAddRating = async (number) => {
      await this.props.service.addRating(this.props.postId, number);
      this.setState({ userCount: 0 });
      this.updateAvegareScore();
    };

    render() {
      const rating = this.props.service.averageScore;
      if (rating.postId !== this.props.postId) return null;
      const userCount = this.state.userCount;
      return (
        <div className={styles.postRaiting}>
          {new Array(5).fill(0).map((item, index) => {
            const isSelected = userCount > index;
            const isFilled = rating.score > index;
            return (
              <Star
                key={index}
                number={index + 1}
                isSelected={isSelected}
                isFilled={isFilled}
                userHovered={!!this.state.userCount}
                onMouseChange={this.handleMouseChange}
                onAddRating={this.handleAddRating}
              />
            );
          })}
        </div>
      );
    }
  }
);

export { Rating };
