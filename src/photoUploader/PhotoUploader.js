import React from 'react';
import styles from './photoUploader.modules.css';

export class PhotoUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fileName: null };
  }

  toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
    });

  handleChange = async (value) => {
    let file = value.target.files[0];
    this.setState({ fileName: file.name });
    let base64Code = await this.toBase64(file);
    this.props.getCode(base64Code);
  };

  render() {
    let labelText = this.state.fileName === null ? 'Choose photo' : this.state.fileName;
    return (
      <div className="photoUploaderContainer">
        <label className={styles.inputFile} htmlFor="uploadPhoto">
          <span className="labelText ">{labelText}</span>
          <input
            type="file"
            name="file"
            id="uploadPhoto"
            onChange={this.handleChange}
            accept="image/gif, image/jpeg, image/png"
          ></input>
        </label>
      </div>
    );
  }
}
