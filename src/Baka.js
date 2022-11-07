import { withStyles, makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from 'react'
import Tooltip from "@material-ui/core/Tooltip";
import data from './a/name.json'
import './Baka.css'

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9"
  }
}))(Tooltip);

const Baka = () => {
  const [data, setData] = useState([])
  const [date, setDate] = useState("")
  const [CallerName, setCallerName] = useState("");
  const [submit, setSubmit] = useState(false)

  const handleChangeCourse = (event) => {
    setDate(event.target.value);
  };

  const handleChangeName = (event) => {
    setCallerName(event.target.value);
  }

  const handleSubmit = () => {
    setSubmit(true)
  }


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
    const data = require("./a/name.json");
    setData(data);
  }, []);

  const uniqueCouse = getUnique(data, "Date");
  const uniqueName = getUnique(data, "CallerName")

  const filterDropdown = data.filter(function (result) {
    return result.Date === date && result.CallerName === CallerName;
  });


  function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      var intlCode = (match[1] ? '+1 ' : '');
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return null;
  }


  return (
    <div className='timeline-container'>
      <div style={{ margin: '6px' }}>
        <span>Name: </span>
        <select value={CallerName} onChange={handleChangeName} style={{ borderRadius: '10px' }}>
          {uniqueName.map((course) => (
            <option key={course.id} value={course.CallerName}>
              {course.CallerName}
            </option>
          ))}
        </select>
      </div>
      <hr />
      <div style={{ margin: '6px' }}>
        <span>Date: </span>
        <select value={date} onChange={handleChangeCourse} style={{ borderRadius: '10px' }}>
          {uniqueCouse.sort((a, b) => a.Date > b.Date ? 1 : -1).map((course) => (
            <option key={course.id} value={course.Date}>
              {course.Date}
            </option>
          ))}
        </select>
      </div>
      <button style={{ marginLeft: '50px', borderRadius: '10px', border: '1px solid black' }} onClick={handleSubmit}>Ok</button>

      {submit ?
        <div className='flex'>
            
           {filterDropdown.length > 0 ? filterDropdown.sort((a, b) => Number(a.Time) > Number(b.Time) ? 1 : -1).map((course) => (
            <div key={course.id} style={{ margin: "10px" }}>
              <p className="time">{course.Time}</p>
              <HtmlTooltip
                title={
                  <div style={{ height: "250px", overflowY: "auto" }}>
                    <span className="result">PhoneNumber:</span> {formatPhoneNumber(course.PhoneNumber)}
                    <br />
                    <span className="result">Message:</span>{(course.result
                      ? course.result.replace(/-->/g, 'to').replace(/[",']/g, '').slice(2, -3).split(/\r?\\n/).map(place => <div className='evenelement'><p className='place'> {place} </p></div>)
                      : "No Message")}
                  </div>
                }
                interactive={true}
              >
                <div>⦿</div>
              </HtmlTooltip>
              <div className="phoneNumber">{formatPhoneNumber(course.PhoneNumber)}</div>
            </div>
          )) : <div className='nodata'>No Data</div>} 
        </div>
        : null}

    </div>
  )
}

export default Baka

