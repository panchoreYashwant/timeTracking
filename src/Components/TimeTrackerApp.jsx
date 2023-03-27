import React, { createContext, useContext, useState } from "react";
import { MyContext } from "../App";
import Tables from "./Tables";

function TimeTrackerApp(props) {
  const [project, setProject] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [tasktName, setTaskName] = useState([]);
  const [currentProject, setCurrentProject] = useState("");
  const [date, setDate] = useState();
  const [task, setTask] = useState([]);
  const [taskTime, setTaskTime] = useState({});
  const [tableData, setTableData] = useState([]);
  const {setData} = useContext(MyContext)
  const addProject = () => {
    let projectDetails = {
      name: projectName,
      tasks: [],
    };
    setProject([...project, projectDetails]);
    setProjectName("");
  };

  const addTask = () => {
    setTask([...task, tasktName]);
    setTaskName("");
  };

  const setTime = (e) => {
    const { name, value } = e.target;
    setTaskTime({ ...taskTime, [name]: value });
  };
  const doneClick = () => {
    const total = Object.values(taskTime).reduce((a, b) => +a + +b);

    if (tableData.some((person) => person.project == currentProject)) {
      const con = tableData.map((dt) =>
        dt.details.some((st) => st.date === date)
      );
      // alert(con);
      if (con[0]) {
        alert("Select Other Date");
      } else {
        // alert(2);

        const data = {
          date: date,
          task: taskTime,
          total: total,
        };
        const fildata = tableData.filter((dt) => dt.project === currentProject);
        const idxNum = tableData.indexOf(fildata[0]);
        // alert(idxNum);
        const data2 = [...tableData];
        data2[idxNum].details.push(data);
        setTableData(data2);
        setTaskTime({});
      }
    } else {
      const data = {
        project: currentProject,
        details: [
          {
            date: date,
            task: taskTime,
            total: total,
          },
        ],
      };
      setTableData([...tableData, data]);
      setTaskTime({});
    setData(tableData)

    }
    setTask([]);
    console.log(tableData);

  };
  setData(tableData)

  return (
    <React.Fragment>
      <div className="container-fluid mt-5 ">
        <div className="row ">
          <div className="col-4">
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">
                Project Name
              </span>
              <input
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                type="text"
                class="form-control"
                placeholder="new project"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
              <span>
                <button onClick={addProject} className="btn btn-success">
                  add
                </button>
              </span>
            </div>
            <div class="list-group list-group-numbered">
              {project.map((dt, i) => (
                <button
                  onClick={() => {
                    setCurrentProject(dt.name);
                    setDate("");
                    setTaskName("");
                    setTask([]);
                    setTaskTime({});
                  }}
                  type="button"
                  class="list-group-item list-group-item-action"
                >
                  {dt.name} ↗
                </button>
              ))}
            </div>
          </div>
          <div className="col-4 border-start border-end">
            <div>
              <h4>Project Name : {currentProject?currentProject:<span className="text-danger">select project from list</span>}</h4>
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">Select Date</span>

              <input
                value={date}
                onChange={(e) => {
      setTaskTime({});
      setDate(e.target.value);
                }}
                className="form-control"
                type="date"
              />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">
                Task Name
              </span>
              <input
                value={tasktName}
                onChange={(e) => setTaskName(e.target.value)}
                type="text"
                class="form-control"
                placeholder="new task"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
              <span>
                <button onClick={addTask} className="btn btn-success">
                  add
                </button>
              </span>
            </div>
            <ul class="list-group list-group-numbered">
              {task.map((dt) => (
                <li class="list-group-item">
                  {dt}
                  <div class="input-group mb-3">
                    <input
                      onChange={setTime}
                      name={dt}
                      className="form-control"
                      placeholder="enter spent time for task"
                    />
                    <span class="input-group-text" id="basic-addon2">
                      {" "}
                      Hours{" "}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <button onClick={doneClick} className="btn btn-primary w-100 mt-2">
              submit
            </button>
          </div>
          <div className="col-4">
          <Tables/>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default TimeTrackerApp;
