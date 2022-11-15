import { withStyles, makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from 'react'
import Tooltip from "@material-ui/core/Tooltip";
import data from './a/name.json'
import uuid4 from "uuid4";
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
  const [Ddisabled, setDDisabled] = useState(null)
  // let [filterDropdown, setFilterDropDown] = useState([])
  // let [uniqueCouse, setUniqueCouse] = useState([])
  // let [uniqueName, setUniqueName] = useState([])

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
    setData(data)
  }, []);

  let uniqueCouse = getUnique(data, "Date");
  let uniqueName = getUnique(data, "CallerName")

  let datajohn = data.filter((name) => name.CallerName === 'John Riley')
  // console.log(datajohn)

  let datajenni = data.filter((name) => name.CallerName === "Jennifer.hart Hart")
  // console.log(datajenni.map(a => a.CallerName))
  let a = datajenni.map(a => a.CallerName);
  console.log(a)

  let filterDropdown = data.filter(function (result) {
    return result.Date === date && result.CallerName === CallerName;
  });

  // console.log(filterDropdown)

  function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      var intlCode = (match[1] ? '+1 ' : '');
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return null;
   }

  //  useEffect(() => {
  //   const elementss =  document.getElementById("bb");
  //   if(filterDropdown.length > 0 ) {
  //     console.log("data")
  //   } else {
  //     elementss[0].parentNode.removeChild(elementss[0])
  //     console.log("no data")
  //   }
  //  },[date])

  //  function removeElements(className) {
  //   const elements =  document.getElementsByClassName(className);
  //   if(filterDropdown.length > 0 ) {
  //     console.log("data")
  //   } else {
  //     elements[0].parentNode.removeChild(elements[0])
  //     console.log("no data")
  //   }
  //  }

  //  removeElements(bb)
//   function removeElementsByClass(className){
//     const elements = document.getElementsByClassName(className);
//     while(elements.length > 0){
//         elements[0].parentNode.removeChild(elements[0]);
//     }
// }
// removeElementsByClass("bb")
// useEffect(() => {
//   setBp(bp)
let bp
if(filterDropdown.length > 0) {
    bp = "(Data)"
  } else {
    bp = "(No Data)"
  }
// }, [bp])

let s = data.map((sa) => sa.Date)
let asa = data.map((ba) => ba.PhoneNumber)

// let e = {PhoneNumber: ""}


// let am = data.some(ss => ss.PhoneNumber === ss.PhoneNumber)
let am = data.map(ss => ss.PhoneNumber)

// console.log(am)
// console.log(am)
// for(let i=0; i<=am.length;i++) {
//   console.log(i)
// }
// if(typeof am !== "undefined") {
//   console.log('ab')
// } else {
//   console.log('ba')
// }
// if(data.includes(asa)) {
// console.log('saa')
// } else {
//   console.log('baa')
// }

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
            <option disabled hidden value=''>Select</option>
            <option key={uuid4()} value={course.CallerName}>
              {course.CallerName}
            </option>
            </>
          ))}
        </select>
      </div>
      {filterDropdown.length > 0 ? <hr /> : ""}
      <div style={{ margin: '6px' }}>
        {/* <span>Date: </span>
        <select className='dropdown date' value={date}  selected='' onChange={handleChangeCourse}>
          {uniqueCouse.sort((a, b) => a.Date > b.Date ? 1 : -1).map((course) => (
            <>
            <option disabled hidden value=''>Select</option>
            <option key={uuid4()} value={course.Date}>
            {course.Date}
            </option>
            </>
          ))}
        </select> */}
        {/* testing */}
        {console.log(CallerName)}
        {
         CallerName === 'Jennifer.hart Hart' ?
         <div>
        <span>Date: </span>
        <select className='dropdown date' value={date}  selected='' onChange={handleChangeCourse}>
          {[...new Set(datajenni.map(item => item.Date))].sort((a, b) => a.Date > b.Date ? 1 : -1).map((course) => (
            <>
            <option disabled hidden value=''>Select</option>
            <option key={uuid4()} value={course}>
            {course}
            </option>
            </>
          ))}
        </select>
        </div>
        :
        <div>
        <span>Date: </span>
        <select className='dropdown date' value={date}  selected='' onChange={handleChangeCourse}>
          {[...new Set(datajohn.map(item => item.Date))].sort((a, b) => a.Date > b.Date ? 1 : -1).map((course) => (
            <>
            <option disabled hidden value=''>Select</option>
            <option key={uuid4()} value={course}>
            {course}
            </option>
            </>
          ))}
        </select>
        </div>

}
        {/* testing */}
      </div>
      {/* <button className='generate' onClick={handleSubmit}>Generate</button> */}

      {/* {submit ? */}
        <div className='flex'>
          {
           filterDropdown.length > 0 && "No Data" ? 
           filterDropdown.sort((a, b) => Number(a.Time) > Number(b.Time) ? 1 : -1).map((course) => (
            <div key={uuid4()} style={{ margin: "10px" }}>
              <p className="time">{course.Time}</p>
              <HtmlTooltip
                title={
                  <div style={{ height: "250px", overflowY: "auto" }}>
                    <span className="result">PhoneNumber:</span> {formatPhoneNumber(course.PhoneNumber)}
                    <br />
                    <span className="result">Message:</span>{(course.result
                      ? course.result.replace(/-->/g, 'to').replace(/[",']/g, '').slice(2, -3).split(/\r?\\n/).map(place => <div className='evenelement'><p className='place'> {place} </p></div>)
                      : "No Message")}
                      {/* {console.log(course.result !== "" ? course.result :  console.log('okk'))} */}
                  </div>
                }
                interactive={true}
              >
                <div>⦿</div>
              </HtmlTooltip>
              <div className="phoneNumber">{formatPhoneNumber(course.PhoneNumber)}</div>
            </div>
          )) 
          : <div className='nodata'>No Data</div>
          } 
        </div>
        {/* : null} */}
    </div>
  )
}

export default Baka

