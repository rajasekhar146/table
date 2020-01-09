import React, { useEffect, useState } from 'react';
import JobTable from './JobTable'

const App = () => {
  // states to store the java and py jobs 
  const [javaJobs, setJavaJobs] = useState([])
  const [pyJobs, setPyJobs] = useState([])
  const [jobList, setJobList] = useState([])

  useEffect(() => {
    console.log('Base Mounted');
    let pyUrl = 'https://jobs.github.com/positions.json?description=python&location=new+york'
    let javaUrl = 'https://jobs.github.com/positions.json?description=java&location=new+york'
    doCORSRequest({
      method: 'GET',
      url: javaUrl,
      data: null
    }, function printResult(result) {
      console.log(result.toString())
      // result = result.replace(/\n/g, "\\\\n").replace(/\r/g, "\\\\r").replace(/\t/g, "\\\\t");
      var jArr = JSON.parse(result);
      setJavaJobs(jArr)
    });
    doCORSRequest({
      method: 'GET',
      url: pyUrl,
      data: null
    }, function printResult(result) {
      var pyArr = JSON.parse(result);
      setPyJobs(pyArr)
    });
  }, []);

  useEffect(() => {
    if (javaJobs.length && pyJobs.length) {
      // merging two arrays
      mergeSortJobs(javaJobs, pyJobs)
    }
  }, [javaJobs, pyJobs]);

  // fetching data 
  const doCORSRequest = (options, printResult) => {
    var cors_api_url = 'https://cors-anywhere.herokuapp.com/';
    var x = new XMLHttpRequest();
    x.open(options.method, cors_api_url + options.url);
    x.onload = x.onerror = function() {
      printResult(
        (x.responseText || '')
      );
    };
    if (/^POST/i.test(options.method)) {
      x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }
    x.send(options.data);
  }

  const mergeSortJobs = (javaJobs, pyJobs) => {
    let javaIndex = 0
    let pyIndex = 0
    let finalArr = []
    const length = javaJobs.length + pyJobs.length
    // filling our final arr with alernative java and py jobs
    for (let i=0; i < length; i++) {
      if (javaIndex === javaJobs.length) {
        finalArr[i] = pyJobs[pyIndex++]
      } else if (pyIndex === pyJobs.length) {
        finalArr[i] = javaJobs[javaIndex++]
      } else if (i%2 === 0) {
        finalArr[i] = pyJobs[pyIndex++]
      } else {
        finalArr[i] = javaJobs[javaIndex++]
      }
    }
    setJobList(finalArr)
  }

  return (
    <div className="App">
      <h1>Jobs Available in NY City: </h1>
      {jobList.length ? <JobTable jobList={jobList} /> : 'Fetching Jobs... Please wait'}
    </div>
  );
}

export default App;