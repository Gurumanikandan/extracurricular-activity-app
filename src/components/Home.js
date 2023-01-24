import React from "react";
import Brouchers from "./Brouchers"
import "./Home.css";
import { Link } from "react-router-dom";

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2 className="text-gray-600 text-center mt-28 leading-normal text-5xl">
          {" "}
          KONGU ENGINEERING COLLEGE
        </h2>
        <Brouchers />

        <div className="flex flex-col">
          <div className="flex flex-col-2 sm:flex-col-2 h-fit  w-full justify-center">
            <form className=" py-6 px-20 rounded-lg">
              {/* <h2 className="text-4xl text-white font-bold mt-3 mb-40 text-center">
              UPCOMING EVENTS
            </h2> */}

              <Link to="/Registration">
                <div className="text-center">
                  <button
                    type="button"
                    className="btn font-bold bg-gray-700 text-white my-7 btn-default p-2"
                  >
                    REGISTER
                  </button>
                </div>
              </Link>
            </form>
          </div>
        </div>
      </div >
    );
  }
}

export default Home;
