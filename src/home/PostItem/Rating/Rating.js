import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { Component } from 'react';
import Star from './Star';
import styles from './Rating.module.css';
import { ratingService } from './rating.service';

class Rating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      userCount: 0,
    };
  }

  async componentDidMount() {
    const count = await ratingService.getAverageScore(this.props.postId);
    this.setState({ count });
  }

  handleMouseChange = (userCount) => {
    this.setState({ userCount });
  };

  render() {
    let count = this.state.count;
    let userCount = this.state.userCount;
    return (
      <div className={styles.postRaiting}>
        {new Array(5).fill(0).map((item, index) => (
          <Star
            key={index}
            number={index + 1}
            isSelected={userCount-- > 0}
            isFilled={count-- > 0}
            userHovered={!!this.state.userCount}
            onMouseChange={this.handleMouseChange}
          />
        ))}
      </div>
    );
  }
}

export { Rating };
