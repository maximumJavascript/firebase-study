import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { Component, PureComponent } from 'react';
import Star from './Star';
import styles from './Rating.module.css';
import { ratingService } from './rating.service';

class Rating extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      userCount: 0,
    };
  }

  async componentDidMount() {
    this.updateAvegareScore();
  }

  updateAvegareScore = async () => {
    const count = await ratingService.getAverageScore(this.props.postId);
    this.setState({ count, userCount: 0 });
  };

  handleMouseChange = (userCount) => {
    this.setState({ userCount });
  };

  handleAddRating = async (number) => {
    await ratingService.addRating(this.props.postId, number);
    this.updateAvegareScore();
  };

  render() {
    const count = this.state.count;
    const userCount = this.state.userCount;
    return (
      <div className={styles.postRaiting}>
        {new Array(5).fill(0).map((item, index) => {
          const isSelected = userCount > index;
          const isFilled = count > index;
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

export { Rating };
