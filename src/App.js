import { Button } from "react-bootstrap";
import "./App.css";
import Table from "react-bootstrap/Table";
import BASE_URL from "./Helper";
import { useState } from "react";
function App() {
  const [studentData, setStudentData] = useState({
    data: [],
  }); // Empty array
  let getStudents = (e) => {
    try {
      fetch(BASE_URL + "/api/friends")
        .then((response) => response.json())
        .then((data) => {
          // now set the student data in hook variables
          setStudentData(data);
          console.log("Data fetched successfully: ", studentData);
        })
        .catch((err) => {
          console.error("Error fetching data: ", err);
        });
    } catch (e) {
      console.error("Error loading data: ", e);
    }
  };
  return (
    <>
      <h1 className="text-center p-2">Crud Operation</h1>
      <Button
        className="btn btn-success m-3"
        onClick={(e) => {
          getStudents(e);
        }}
      >
        Load data
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Friend Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {studentData.data.map(function (currrVal, index, arr) {
            return (
              <tr key={index}>
                <td>{currrVal.id}</td>
                <td>{currrVal.name}</td>
                <td>
                  <Button variant="danger">Delete</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default App;
