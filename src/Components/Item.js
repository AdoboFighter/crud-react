import React from 'react';

class Item extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="m-2 select-none cursor-pointer bg-gray-200 rounded-md flex flex-1 items-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                {/* <div className="flex flex-col rounded-md w-10 h-10 bg-gray-300 justify-center items-center mr-4">💧</div> */}
                <div className="flex-1 pl-1 mr-16">
                    <div className="font-medium text-left">
                        {/* {this.props.items.map(this.props.items.name)} */}
                         

                    </div>
                    <div className="text-gray-600 text-sm">{this.props.items.status}</div>
                </div>
                {/* <div className="text-gray-600 text-xs">{this.props.items.date}</div> */}
                {/* <button onClick={this.props.action} className="bg-red-500 text-white font-medium px-2 py-1 rounded-xl hover:bg-red-900">Remove</button> */}
            </div>



        );
    }

}

export default Item;
