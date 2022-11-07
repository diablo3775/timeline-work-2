import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const App = () => {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState("");

  const handleChangeCourse = (event) => {
    setCourse(event.target.value);
  };

  const getUnique = (arr, comp) => {
    const unique = arr
      //store the comparison values in array
      .map((e) => e[comp])

      // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)

      // eliminate the dead keys & store unique objects
      .filter((e) => arr[e])

      .map((e) => arr[e]);

    return unique;
  };

  useEffect(() => {
    const courses = require("./courses.json");
    setCourses(courses);
  }, []);

  const uniqueCouse = getUnique(courses, "tag");

  const filterDropdown = courses.filter(function (result) {
    return result.tag === course;
  });

  return (
    <div>
      <form onSubmit={handleSubmitCourse}>
        <label>
          Looping through Courses tag from Json File
          <select value={course} onChange={handleChangeCourse}>
            {uniqueCouse.map((course) => (
              <option key={course.id} value={course.tag}>
                {course.tag}
              </option>
            ))}
          </select>
        </label>
        <input type="submit" value="Submit" />
        <div>
          {filterDropdown.map((course) => (
            <div key={course.id} style={{ margin: "10px" }}>
              {course.course}
              <br />
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};


<svg height="40" width="190">
  <polyline class="dotted-line" points="20,20 70,20 120,20 170,20"/>
  <marker id="circle-marker" markerWidth="8" markerHeight="8" refX="5" refY="5">
    <circle class="foreground" cx="5" cy="5" r="3" />
  </marker>
</svg>
