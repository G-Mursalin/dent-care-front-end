import React from "react";

const AllDoctors = () => {
  return (
    <section>
      <h2 className="my-3 text-2xl">Total Doctors: </h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Image</th>
              <th>Name</th>
              <th>Specialty</th>
              <th>Email</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4].map((val, i) => (
              <tr className="hover" key={i}>
                <th>{i + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="w-12 h-12 rounded-full">
                      <img src="" />
                    </div>
                  </div>{" "}
                </td>
                <td> </td>
                <td> </td>
                <td> </td>
                <td>
                  <button className="btn btn-xs">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AllDoctors;
