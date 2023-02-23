import { observer } from 'mobx-react';
import { Component } from 'react';
import SvgEmptyStar from '../../../assets/icons/SvgEmptyStar';
import styles from './Rating.module.css';
import { ratingService } from './rating.service';

const Rating = observer(
  class Rating extends Component {
    componentDidMount() {
      ratingService.getAverageScore(this.props.postId);
    }

    render() {
      return (
        <div className="postRaiting">
          <SvgEmptyStar />
          <SvgEmptyStar />
          <SvgEmptyStar />
          <SvgEmptyStar />
          <SvgEmptyStar />
        </div>
      );
    }
  }
);

export { Rating };
