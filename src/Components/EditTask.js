import React from "react";
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";

class EditTask extends React.Component {
  constructor(props) {
    super(props);
    const { id, name, date, status } = props.location.state.task;
    this.state = {
      id,
      name,
      date,
      status
    };
  }

  update = (e) => {
    e.preventDefault();
    if (this.state.name === "" || this.state.date === "" || this.state.status === "") {
      alert("ALl the fields are mandatory!");
      return;
    }
    Swal.fire({
      title: 'Do you want to Update this task?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Yes`,
      confirmButtonColor: '#5bc0de'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.props.updateTasksHandler(this.state);
        this.setState({ name: "", date: "", status: "" });
        this.props.history.push("/");
        Swal.fire('Task Updated!', '', 'success')
      } else {
        console.log("Do nothing");
      }
    })
  };

  render() {
    return (
      <div className="ui main">
        {/* <h2 className="font-medium flex justify-center text-center text-3xl mb-3">Edit Contact</h2> */}
        <form className="ui form" onSubmit={this.update}>


          <div className="flex">
            <Link to={{ pathname: `/` }}>
              <button type="button" className="mb-3 border border-black focus:outline-none  text-black text-sm py-2.5 px-5 rounded-md bg-white-500 hover:shadow-lg">Back to list</button>
            </Link>
          </div>


          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" >Date</label>
            <input
              type="date"
              name="date"
              value={this.state.date}
              onChange={(e) => this.setState({ date: e.target.value })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Status :</label>
            <select onChange={(e) => this.setState({ status: e.target.value })} name="status" value={this.state.status} class="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline">
              <option value="Pending">Pending</option>
              <option value="Done">Done</option>
            </select>
          </div>

          <div className="flex flex-row-reverse">
            <button type="submit" className="focus:outline-none  text-white text-sm py-2.5 px-5 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-lg flex-row-reverse">Update</button>
          </div>
        </form>
      </div>
    );
  }
}

export default EditTask;
