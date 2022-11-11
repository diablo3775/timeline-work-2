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

  console.log(data.filter((res) => res.result !== null))
  // let filterdata = data.filter((res) => res.result !== null);


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

  // let filterdata;
  const uniqueCouse = getUnique(data, "Date");
  const uniqueName = getUnique(data, "CallerName")
  console.log("name ", uniqueName)
  // filterdata = uniqueCouse.filter((res) => res.result !== null);

  let filterdata;
  useEffect(() => {
    filterdata = uniqueName.filter((res) => res.result !== null);
  }, [uniqueName, uniqueCouse])
  // console.log(uniqueCouse.map(c => c.Date))
  // console.log(uniqueName.map(n => n.CallerName))

  const filterDropdown = data.filter(function (result) {
    // if(result.result !== null) 
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
        {/*  */}
        {/* <select  onChange={handleChangeCourse}>
    {[...new Set(filterdata.map(item => item.Date))].map(item => (
      <option key={item}>{item}</option>
    ))}
  </select>
  <select onChange={handleChangeName}>
    {[...new Set(filterdata.map(item => item.CallerName))].map(item => (
      <option key={item}>{item}</option>
    ))}
  </select> */}
  {/*  */}
        <span>Name: </span>
        <select className='dropdown' value={CallerName}  selected='' onChange={handleChangeName}>
          {uniqueName.map((course) => (
            <>
            <option selected disabled hidden value=''>Select</option>
            <option key={course.id} value={course.CallerName}>
              {course.CallerName}
            </option>
            </>
          ))}
        </select>
      </div>
      {filterDropdown.length > 0 ? <hr /> : ""}
      <div style={{ margin: '6px' }}>
        <span>Date: </span>
        <select className='dropdown date' value={date}  selected='' onChange={handleChangeCourse}>
          {uniqueCouse.sort((a, b) => a.Date > b.Date ? 1 : -1).map((course) => (
            <>
            <option selected disabled hidden value=''>Select</option>
            <option key={course.id} value={course.Date}>
              {course.Date}
            </option>
            </>
          ))}
        </select>
      </div>
      {/* <button className='generate' onClick={handleSubmit}>Generate</button> */}

      {/* {submit ? */}
        <div className='flex'>
           {filterDropdown.length > 0 && "No Data" ? filterDropdown.sort((a, b) => Number(a.Time) > Number(b.Time) ? 1 : -1).map((course) => (
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
        {/* : null} */}
    </div>
  )
}

export default Baka

