import styles from './dropdown.module.css';

console.log(this.props.options);
<div>
  {this.props.options.map((option) => {
    return (
      <div
        key={option.id}
        className={this.state.isClicked ? styles.activeColor : null}
        onClick={this.toggleClass}
      >
        {option.value}
      </div>
    );
  })}
</div>;
