<div>
  {options.map((option) => {
    return (
      <div
        key={option.id}
        className={this.state.isClicked ? "active-color" : null}
        onClick={this.toggleClass}
      >
        {option.value}
      </div>
    );
  })}
</div>;
