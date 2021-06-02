import React from 'react'
import AddTask from './AddTask';

class FormModal extends React.Component {
  render() {
    const formContent = <AddTask></AddTask>;
    const modal = this.props.showModal ? <div>{formContent}</div> : null;
    return (
      <div>
        {modal}
      </div>
    );
  }
}

export default FormModal;