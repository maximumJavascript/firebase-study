import { Component } from 'react';
import { ReactComponent as FilledStar } from '../../../../assets/icons/FilledStar.svg';
import { ReactComponent as EmptyStar } from '../../../../assets/icons/EmptyStar.svg';
import { authService } from '../../../../auth/auth.service';
import { observer } from 'mobx-react';
import styles from './Star.module.css';
import classNames from 'classnames';

const Star = observer(
  class Star extends Component {
    onMouseOver = (e) => {
      this.props.onMouseChange(this.props.number);
    };

    onMouseOut = (e) => {
      this.props.onMouseChange(0);
    };

    onClick = (e) => {
      this.props.onAddRating(this.props.number);
    };

    render() {
      const handlers = authService.isAuth
        ? {
            onMouseOver: this.onMouseOver,
            onMouseOut: this.onMouseOut,
            onClick: this.onClick,
          }
        : {};

      const isFilled = this.props.isFilled;
      const isSelected = this.props.isSelected;
      const starClass = classNames({
        [styles.star]: true,
        [styles.isSelected]: isSelected,
        [styles.isFilled]: isFilled,
      });

      if (this.props.userHovered) {
        if (isSelected) return <FilledStar {...handlers} className={starClass} />;
      } else {
        if (isFilled) return <FilledStar {...handlers} className={starClass} />;
      }
      return <EmptyStar {...handlers} className={styles.star} />;
    }
  }
);

export { Star };
