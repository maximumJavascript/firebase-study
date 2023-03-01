import { PureComponent } from 'react';
import Star from './Star';
import styles from './Rating.module.css';

class Rating extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      userCount: 0,
    };
  }

  componentDidMount() {
    void this.updateAvegareScore();
  }

  updateAvegareScore = async () => {
    const count = await this.props.service.getAverageScore(this.props.postId);
    this.setState({ count });
  };

  handleMouseChange = (userCount) => {
    this.setState({ userCount });
  };

  handleAddRating = async (number) => {
    await this.props.service.addRating(this.props.postId, number);
    this.setState({ userCount: 0 });
    this.updateAvegareScore();
  };

  handleMouseLeave = () => {
    this.setState({ userCount: 0 });
  };

  render() {
    const userCount = this.state.userCount / 2;
    const score = this.state.count / 2;
    return (
      <div className={styles.postRaiting} onMouseLeave={this.handleMouseLeave}>
        {new Array(5).fill(0).map((item, index) => {
          const percSelected = userCount - index;
          let percFilled = score - index;
          percFilled =
            percFilled >= 0.5 && percFilled < 1 ? 0.5 : percFilled < 0.5 ? 0 : percFilled;
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

export { Rating };
