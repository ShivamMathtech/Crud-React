import { Button, Pagination } from "react-bootstrap";
import "./App.css";
import Table from "react-bootstrap/Table";
import BASE_URL from "./Helper";
import React, { useState } from "react";
function App() {
  const [studentData, setStudentData] = useState({
    data: [],
  }); // Empty array

  let getStudents = (pageno = 1) => {
    try {
      fetch(
        `${BASE_URL}/api/friends?pagination[page]=${pageno}&pagination[pageSize]=10`
      )
        .then((response) => response.json())
        .then((data) => {
          // now set the student data in hook variables
          setStudentData(data);
        })
        .catch((err) => {
          console.error("Error fetching data: ", err);
        });
    } catch (e) {
      console.error("Error loading data: ", e);
    }
  };
  let Last = (e) => {
    if (
      studentData.meta.pagination.page !== studentData.meta.pagination.pageCount
    ) {
      getStudents(studentData.meta.pagination.pageCount);
    } else {
      alert("Last page");
    }
  };
  let Next = (e) => {
    if (
      studentData.meta.pagination.page < studentData.meta.pagination.pageCount
    ) {
      getStudents(studentData.meta.pagination.page + 1);
      studentData.meta.pagination.page += 1;
    }
  };
  let Prev = (e) => {
    // getStudents(studentData.meta.pagination.page - 1);
    if (studentData.meta.pagination.page > 1) {
      // getStudents(studentData.meta.pagination.page);
      console.log(st);
      studentData.meta.pagination.page -= 1;
    }
  };
  let First = (e) => {};
  return (
    <>
      <h1 className="text-center p-2">Crud Operation</h1>
      <Button
        className="btn btn-success m-3"
        onClick={(e) => {
          getStudents();
        }}
      >
        Load data
      </Button>
      {studentData.data.length > 0 && (
        <React.Fragment>
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
                      <Button variant="danger" className="m-2 btn-sm">
                        Delete
                      </Button>
                      <Button variant="info" className="m-2 btn-sm">
                        Edit
                      </Button>
                      <Button variant="success" className="m-2 btn-sm">
                        Add
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Pagination className="d-flex justify-content-center">
            <Pagination.First
              onClick={(e) => {
                First(e);
              }}
            />
            <Pagination.Prev
              onClick={(e) => {
                Prev(e);
              }}
            />
            {/* <Pagination.Item>{1}</Pagination.Item>
            <Pagination.Ellipsis />

            <Pagination.Item>{10}</Pagination.Item>
            <Pagination.Item>{11}</Pagination.Item>
            <Pagination.Item active>{12}</Pagination.Item>
            <Pagination.Item>{13}</Pagination.Item>
            <Pagination.Item disabled>{14}</Pagination.Item>

            <Pagination.Ellipsis />
            <Pagination.Item>{20}</Pagination.Item> */}
            <Pagination.Next
              onClick={(e) => {
                Next(e);
              }}
            />
            <Pagination.Last
              onClick={(e) => {
                Last(e);
              }}
            />
          </Pagination>
        </React.Fragment>
      )}
    </>
  );
}

export default App;
