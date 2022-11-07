import React, { useEffect, useState } from 'react'
import data from './a/name.json'
import './Baka.css'
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11
  }
}))(Tooltip);

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black
  },
  tooltip: {
    backgroundColor: theme.palette.common.black
  }
}));

function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}

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
  const [date,setDate] = useState("")
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
    return result.Date === date  && result.CallerName === CallerName;
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
  formatPhoneNumber('+12345678900') // => "+1 (234) 567-8900"
  formatPhoneNumber('2345678900')   // => "(234) 567-8900"
  console.log(data.map((r) => formatPhoneNumber(r.PhoneNumber)))

  return (
    <div className='timeline-container'>
<div style={{margin: '6px'}}> 
<span>Name: </span>
          <select value={CallerName} onChange={handleChangeName} style={{borderRadius: '10px'}}>
            {uniqueName.map((course) => (
              <option key={course.id} value={course.CallerName}>
                {course.CallerName}
              </option>
            ))}
          </select>
</div>
        <hr />
          <div style={{margin: '6px'}}>
          <span>Date: </span>
            <select value={date} onChange={handleChangeCourse} style={{borderRadius: '10px'}}>
              {uniqueCouse.sort((a, b) => a.Date > b.Date ? 1 : -1).map((course) => (
                <option key={course.id} value={course.Date}>
                  {course.Date}
                </option>
              ))}
            </select>
          </div>
          <button style={{marginLeft: '50px',borderRadius: '10px',border:'1px solid black'}} onClick={handleSubmit}>Ok</button>

        {submit ? 
        <div className='flex'>
          {filterDropdown.sort((a,b) => Number(a.Time) > Number(b.Time) ? 1 : -1).map((course) => (
            <div key={course.id} style={{ margin: "10px" }}>
              <p>{course.Time}</p>
              <HtmlTooltip
        title={
//           <div style={{ height: "250px", overflowY: "auto" }}>
//           Phone Number: {course.PhoneNumber}
//           <br /> 
// Message:{course.result 
// ?  course.result.replace(/-->/g, 'to').replace(/[",']/g, '').slice(2,-3).split("\\n").map(place => <p> {place} </p>) 
// : "No Reply"}


// </div>
          <div style={{ height: "250px", overflowY: "auto" }}>
                          Phone Number: {formatPhoneNumber(course.PhoneNumber)}
                          <br /> 
               Message:{course.result 
               ? course.result.replace(/-->/g, 'to').replace(/[",']/g, '').slice(2,-3).split("\\n").map(place => <p> {place} </p>)  
               : "No Message"}
          </div>
        }
        interactive={true}
      >
                <div>⦿</div>
      </HtmlTooltip>

              {/* <div className="tooltip-on-hover">⦿</div>
              <div className="tooltip">
              Phone Number: {course.PhoneNumber}
              <br /> 
               Message:{course.result 
                ? course.result.replace(/-->/g, 'to').replace(/[",']/g, '').slice(2,-2).split("\\n").map(place => <p> {place} </p>) 
                : "No Reply"}
              </div> */}
              <div style={{width: '110px'}}>{formatPhoneNumber(course.PhoneNumber)}</div>
            </div>
          ))}
        </div>
      : null}

    </div>
  )
}

export default Baka

