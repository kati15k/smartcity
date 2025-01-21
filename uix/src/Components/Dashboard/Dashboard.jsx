import React, { useEffect, useState, useRef } from "react";
import axiosClient from "../../axios-client";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement } from "chart.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Dashboars.scss';

// Registering chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement);

const JobsAndReviewsList = () => {
  // State to hold counts for jobs, reviews, users, companies, universities, and places
  const [jobs, setJobs] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);
  const [companiesCount, setCompaniesCount] = useState(0); // State for companies count
  const [universitiesCount, setUniversitiesCount] = useState(0); // State for universities count
  const [placesCount, setPlacesCount] = useState(0); // State for places count

  const [loadingJobs, setLoadingJobs] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingCompanies, setLoadingCompanies] = useState(true); 
  const [loadingUniversities, setLoadingUniversities] = useState(true); 
  const [loadingPlaces, setLoadingPlaces] = useState(true); 

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [isOtpValid, setIsOtpValid] = useState(false);

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [newTask, setNewTask] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [editingTask, setEditingTask] = useState(null);
  const [editingTaskText, setEditingTaskText] = useState("");

  const barChartRef1 = useRef(null);
  const barChartRef2 = useRef(null);
  const lineChartRef = useRef(null);

  useEffect(() => {
    AOS.init();

    // Fetch Jobs
    setLoadingJobs(true);
    axiosClient
      .get(`/jobs`)
      .then(({ data }) => {
        setJobs(data.data);
        setLoadingJobs(false);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
        setLoadingJobs(false);
      });

    // Fetch Reviews
    setLoadingReviews(true);
    axiosClient
      .get(`/reviews`)
      .then(({ data }) => {
        setReviews(data.data);
        setLoadingReviews(false);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
        setLoadingReviews(false);
      });

    // Fetch Users
    setLoadingUsers(true);
    axiosClient
      .get(`/users`)
      .then(({ data }) => {
        setUsers(data.data);
        setLoadingUsers(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoadingUsers(false);
      });

    // Fetch Companies Count
    setLoadingCompanies(true);
    axiosClient
      .get(`/companies`)
      .then(({ data }) => {
        setCompaniesCount(data.data.length);  // assuming data.data is an array
        setLoadingCompanies(false);
      })
      .catch((error) => {
        console.error("Error fetching companies:", error);
        setLoadingCompanies(false);
      });

    // Fetch Universities Count
    setLoadingUniversities(true);
    axiosClient
      .get(`/academic_list`)
      .then(({ data }) => {
        setUniversitiesCount(data.data.length);  // assuming data.data is an array
        setLoadingUniversities(false);
      })
      .catch((error) => {
        console.error("Error fetching universities:", error);
        setLoadingUniversities(false);
      });

    // Fetch Places Count
    setLoadingPlaces(true);
    axiosClient
      .get(`/places`)
      .then(({ data }) => {
        setPlacesCount(data.data.length);  // assuming data.data is an array
        setLoadingPlaces(false);
      })
      .catch((error) => {
        console.error("Error fetching places:", error);
        setLoadingPlaces(false);
      });

    // Cleanup chart instances when component unmounts or updates
    return () => {
      if (barChartRef1.current && barChartRef1.current.chartInstance) {
        barChartRef1.current.chartInstance.destroy();  // Destroy the existing bar chart
      }
      if (barChartRef2.current && barChartRef2.current.chartInstance) {
        barChartRef2.current.chartInstance.destroy();  // Destroy the existing bar chart
      }
      if (lineChartRef.current && lineChartRef.current.chartInstance) {
        lineChartRef.current.chartInstance.destroy();  // Destroy the existing line chart
      }
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleOtpSubmit = () => {
    if (otp.join("") === "123456") { // Replace with your actual OTP validation logic
      setIsOtpValid(true);
    } else {
      alert("Invalid OTP");
    }
  };

  const handleTaskChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      const newTaskObject = {
        id: Date.now(),
        task: newTask,
        date: selectedDate,
        status: 'pending'
      };
      setTasks([...tasks, newTaskObject]);
      setNewTask("");
    }
  };

  const handleTaskDelete = (taskToDelete) => {
    setTasks(tasks.filter(task => task.id !== taskToDelete.id));
  };

  const handleTaskEdit = (task) => {
    setEditingTask(task);
    setEditingTaskText(task.task);
  };

  const handleTaskUpdate = () => {
    setTasks(tasks.map(task => task.id === editingTask.id ? { ...task, task: editingTaskText } : task));
    setEditingTask(null);
    setEditingTaskText("");
  };

  const barData1 = {
    labels: ['Users', 'Reviews'],
    datasets: [
      {
        label: 'Counts',
        data: [users.length, reviews.length],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const barData2 = {
    labels: ['Jobs', 'Companies'],
    datasets: [
      {
        label: 'Counts',
        data: [jobs.length, companiesCount],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  const lineData = {
    labels: ['Jobs', 'Reviews', 'Users', 'Companies', 'Universities', 'Places'],
    datasets: [
      {
        label: 'Counts',
        data: [jobs.length, reviews.length, users.length, companiesCount, universitiesCount, placesCount],
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

  if (!isOtpValid) {
    return (
      <div className="otp-container">
        <h2>Enter OTP to Access Dashboard</h2>
        <div className="otp-inputs">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={data}
              onChange={(e) => handleOtpChange(e.target, index)}
              onFocus={(e) => e.target.select()}
              className="otp-input"
            />
          ))}
        </div>
        <button onClick={handleOtpSubmit} className="submit-btn">Submit</button>
      </div>
    );
  }

  return (
    <section className="job-review section popular">
      <div className="jobReviewContainer">
        {/* Counts Table */}
        <div className="tableContainer" data-aos="fade-up">
          <h2>Counts Table</h2>
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Jobs</td>
                <td>{jobs.length}</td>
              </tr>
              <tr>
                <td>Reviews</td>
                <td>{reviews.length}</td>
              </tr>
              <tr>
                <td>Users</td>
                <td>{users.length}</td>
              </tr>
              <tr>
                <td>Companies</td>
                <td>{companiesCount}</td>
              </tr>
              <tr>
                <td>Universities</td>
                <td>{universitiesCount}</td>
              </tr>
              <tr>
                <td>Places</td>
                <td>{placesCount}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Charts Container */}
        <div className="chartsContainer" data-aos="fade-up">
          {/* Line Chart */}
          <div className="chartWrapper">
            <h2>Overall Counts Line Chart</h2>
            <Line ref={lineChartRef} data={lineData} />
          </div>

          {/* Bar Chart for Users and Reviews */}
          <div className="chartWrapper">
            <h2>Users and Reviews Bar Chart</h2>
            <Bar ref={barChartRef1} data={barData1} />
          </div>
        </div>

        {/* Bar Chart for Jobs and Companies */}
        <div className="chartContainer" data-aos="fade-up">
          <h2>Jobs and Companies Bar Chart</h2>
          <div className="chartWrapper">
            <Bar ref={barChartRef2} data={barData2} />
          </div>
        </div>

        {/* Calendar */}
        <div className="calendarContainer" data-aos="fade-up">
          <h2>Select Date and Time</h2>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            showTimeSelect
            dateFormat="Pp"
            className="date-picker"
            popperPlacement="top-end"
          />
        </div>

        {/* To-Do List */}
        <div className="todoContainer" data-aos="fade-up">
          <h2>To-Do List</h2>
          <form onSubmit={handleTaskSubmit}>
            <input
              type="text"
              value={newTask}
              onChange={handleTaskChange}
              className="task-input"
              placeholder="Add a new task"
            />
            <button type="submit" className="submit-btn">Add Task</button>
          </form>
          <ul className="tasks-list">
            {tasks.map((task) => (
              <li key={task.id} className="task-item">
                {editingTask && editingTask.id === task.id ? (
                  <>
                    <input
                      type="text"
                      value={editingTaskText}
                      onChange={(e) => setEditingTaskText(e.target.value)}
                      className="task-input"
                    />
                    <button onClick={handleTaskUpdate} className="submit-btn">Update</button>
                  </>
                ) : (
                  <>
                    <p>{task.task}</p>
                    <p>{new Date(task.date).toLocaleString()}</p>
                    <button onClick={() => handleTaskEdit(task)} className="edit-btn">Edit</button>
                    <button onClick={() => handleTaskDelete(task)} className="delete-btn">Delete</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default JobsAndReviewsList;