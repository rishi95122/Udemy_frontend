import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import { AuthContext } from "../../context/authContext";
import "./profilebar.css";
import SingleCard from "../../../src/skeleton/SingleCard";
import { Link } from "react-router-dom";

const View = () => {
  const { currentUser } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [error, setError] = useState();
  async function deleteCourse(item) {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACK_API}/course/delete/${item._id}`,
        { name: currentUser.username },
        {
          withCredentials: true,
        }
      );
      setData(res.data);
    } catch (e) {
      console.log(e);
    }
  }

  const handleDelete = async (item) => {
    deleteCourse(item);
  };
  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACK_API}/course/get`,
          { name: currentUser.username },
          {
            withCredentials: true,
          }
        );

        setData(response.data);
      } catch (error) {
        setError(error.response.data.msg);
      }
    }
    getData();
  }, []);
  console.log(data);
  return (
    <div className="single-main">
      <h1>Your Courses</h1>
      <div className="single">
        {data || error ? (
          !error ? (
            data?.map((item) => {
              return (
                <div className="card">
                  <div className="img">
                    <img
                      src={`https://res.cloudinary.com/drlewouwd/image/upload/q_auto,f_auto/v1710917678/${item.image}.png`}
                      alt="Optimized Image"
                    />
                  </div>
                  <div className="text">
                    <h5>{item?.course}</h5>

                    <h6>{item?.category}</h6>
                    <div className="button-group">
                      <Link
                        to={
                          "/teacher/course/" + item.course + "=" + item.username
                        }
                        state={item}
                      >
                        <button>Edit Course</button>
                      </Link>
                      <button id="delete" onClick={() => handleDelete(item)}>
                        {" "}
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="error">{error}</div>
          )
        ) : (
          <div className="skeletons">
            {" "}
            <SingleCard /> <SingleCard /> <SingleCard />
          </div>
        )}
      </div>
    </div>
  );
};

export default View;
