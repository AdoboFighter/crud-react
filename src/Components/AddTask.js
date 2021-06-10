import React from "react";

class AddTask extends React.Component {
  state = {
    name: "",
    date: "",
    status: ""
  };

  add = (e) => {
    e.preventDefault();
    if (this.state.name === "" || this.state.date === "" || this.state.status === "") {
      alert("All the fields are mandatory!");
      return;
    }
    this.props.addTaskHandler(this.state);
    this.setState({ name: "", date: "", status: "" });


  };
  render() {
    return (
      <div className="ui main">
        <h2 className="font-medium flex justify-center text-center text-3xl mb-3">Add Task</h2>

        <form className="ui form" onSubmit={this.add}>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Task name</label>
            <input type="text" name="name" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Task" />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Task Date</label>
            <input type="date" name="date" value={this.state.date} onChange={(e) => this.setState({ date: e.target.value })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Status :</label>
            <select onChange={(e) => this.setState({ status: e.target.value })} name="status" value={this.state.status} className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline">
              <option defaultValue="">Choose a status</option>
              <option value="Pending">Pending</option>
              <option value="Done">Done</option>
            </select>
          </div>
          {/* <button className="ui button blue">Add</button> */}
          <div className="flex flex-row-reverse">
            <button type="submit" className="focus:outline-none  text-white text-sm py-2.5 px-5 rounded-md bg-green-500 hover:bg-green-600 hover:shadow-lg flex-row-reverse">Add</button>
          </div>

        </form>
      </div>
    );
  }
}

export default AddTask;
