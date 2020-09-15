import React, { Component } from 'react';
import './App.css';
import axios from "axios";

import 'bootstrap/dist/css/bootstrap.css';

import { DropdownToggle, DropdownMenu, Input, Table } from 'reactstrap';
import TimeRangeSlider from 'react-time-range-slider';
import TextField from '@material-ui/core/TextField';
import TimeField from 'react-simple-timefield';
import Time from 'react-time'

import play from './image/play.png';
import pause from './image/pause.png';
import logo from './image/logo.png';
import wave from './image/wave.png';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: new Audio(),
      url: null,
      selectedFile: null,
      title: "hello",
      _validFileExtensions: [".mp3", ".wav", ".aac"],
      status: false,

      // value information
      in_bitRate: 0,
      in_sFrequency: 0,
      in_bitPerSample: 0,
      in_length: 0,
      in_cre: '',
      in_soundType: '',

      //value setting
      sFrequency: null,
      soundType: 'stereo',
      fileType: 'mp3',
      cvtOperation: 'raw',
      startTime: 0,
      endTime: 0,
    };
    // this.audio = new Audio(this.state.url);

  }



  //=========================================================

  handlePlayerClick = () => {
    var audio = new Audio(this.state.url)
    if (!this.state.status) {
      this.setState({ status: true })
      audio.play();
    } else {
      this.setState({ status: false })
      audio.pause();
    }
  }

  // play = () => {
  //   this.setState({ play: true, pause: false });
  //   let audio = new Audio(this.state.url);
  //   audio.play();
  //   console.log(this.state.url);
  // }

  // pause = () => {
  //   this.setState({ play: false, pause: true });
  //   let audio = new Audio(this.state.url)
  //   audio.pause();
  //   console.log(this.state.url);
  // }


  //=========================================================
  handle_SF = e => {
    this.setState({
      sFrequency: e.target.value
    });
  }

  handle_ST = e => {
    this.setState({
      soundType: e.target.value
    })
  }
  handle_FT = e => {
    this.setState({
      fileType: e.target.value
    })
  }
  handle_DCO = e => {
    this.setState({
      cvtOperation: e.target.value
    })
  }
  handle_startTime = e => {
    var time = e.target.value;
    var a = time.split(':');
    var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
    this.setState({
      startTime: seconds
    })
    console.log(this.state.startTime);
  }
  handle_endTime = e => {
    var time = e.target.value;
    var a = time.split(':');
    var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
    this.setState({
      endTime: seconds
    })
    console.log(this.state.endTime);
  }

  handleConvert = e => {
    e.preventDefault();
    let uploadData = new FormData();

    uploadData.append('title', this.state.title);
    uploadData.append('selectedFile', this.state.selectedFile);

    uploadData.append('sFrequency', this.state.sFrequency);
    uploadData.append('soundType', this.state.soundType);
    uploadData.append('fileType', this.state.fileType);
    uploadData.append('cvtOperation', this.state.cvtOperation);
    uploadData.append('startTime', this.state.startTime);
    uploadData.append('endTime', this.state.endTime);

    // uploadData.append('in_bitRate', this.state.in_bitRate);
    // uploadData.append('in_sFrequency', this.state.in_sFrequency);
    // uploadData.append('in_bitPerSample', this.state.in_bitPerSample);
    // uploadData.append('in_length', this.state.in_length);
    // uploadData.append('in_cre', this.state.in_cre);
    // uploadData.append('in_soundType', this.state.in_soundType);


    let url = 'http://localhost:8000/books/';
    axios.post(url, uploadData, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err))
  }





  //=========================================================

  onFileChange = e => {
    this.setState({
      selectedFile: e.target.files[0],
    },
      function () { console.log(this.state.selectedFile) },
    );
  };
  async senData() {
    await 500;
    if (this.state.selectedFile) {
      // e.preventDefault();
      console.log(this.state);
      let uploadData = new FormData();

      uploadData.append('title', this.state.title);
      uploadData.append('selectedFile', this.state.selectedFile);

      uploadData.append('sFrequency', this.state.sFrequency);
      uploadData.append('soundType', this.state.soundType);
      uploadData.append('fileType', this.state.fileType);
      uploadData.append('cvtOperation', this.state.cvtOperation);
      uploadData.append('startTime', this.state.startTime);
      uploadData.append('endTime', this.state.endTime);
      
    // uploadData.append('in_bitRate', this.state.in_bitRate);
    // uploadData.append('in_sFrequency', this.state.in_sFrequency);
    // uploadData.append('in_bitPerSample', this.state.in_bitPerSample);
    // uploadData.append('in_length', this.state.in_length);
    // uploadData.append('in_cre', this.state.in_cre);
    // uploadData.append('in_soundType', this.state.in_soundType);



      let url = 'http://localhost:8000/books/';
      axios.post(url, uploadData, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      })
        .then(res => {
          console.log(res.data);
          this.setState({
            url: res.data.selectedFile
          })
        })
        .catch(err => console.log(err))
      console.log(this.state.url);
    }

  };

  getInformation() {
    axios.get('http://localhost:8000/books')
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  }



  fileData = () => {
    this.getInformation();
    if (this.state.selectedFile) {
      var sFileName = this.state.selectedFile.name;
      if (sFileName.length > 0) {
        var blnValid = false;
        for (var j = 0; j < this.state._validFileExtensions.length; j++) {
          var sCurExtension = this.state._validFileExtensions[j];
          if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() === sCurExtension.toLowerCase()) {
            blnValid = true;
            break;
          }

        }

        if (!blnValid) {
          alert(sFileName + " is invalid! Please, allowed extensions are: " + this.state._validFileExtensions.join(", "));
          this.state.selectedFile = null;
          return false;
        }
      }
    }

    if (blnValid) {



      return (
        
        <div>
          <br />

          <div>
            {this.state.status ? <img src={play} alt="Play" height="20" onClick={() => this.handlePlayerClick()} /> : <img src={pause} alt="Pause" height="20" onClick={() => this.handlePlayerClick()} />}


            {this.state.selectedFile.name}
          </div>
          <hr class="style5" />
          <h3 for="exampleText" size="lg">File information:</h3>
          <Table size="sm">
            <thead>
              <tr>
                <th width='400'>Item</th>
                <th width='800'>Value</th>
                <th width='200'>Unit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Size</th>
                <td>{Number(this.state.selectedFile.size / 1024).toFixed(1)}</td>
                <td>Kb</td>
              </tr>
              <tr>
                <th scope="row">Bit rate</th>
                <td></td>
                <td>kbps</td>
              </tr>
              <tr>
                <th scope="row">Sampling frequency</th>
                <td></td>
                <td>kHz</td>
              </tr>
              <tr>
                <th scope="row">Byte per second</th>
                <td></td>
                <td>Byte/s</td>
              </tr>
              <tr>
                <th scope="row">Bit per sample</th>
                <td></td>
                <td>Bit/sample</td>
              </tr>
              <tr>
                <th scope="row">Length</th>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th scope="row">Creation date</th>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th scope="row">Update date</th>
                <td>{this.state.selectedFile.lastModifiedDate.toString()}</td>
                <td></td>
              </tr>
              <tr>
                <th scope="row">Sound type</th>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </Table>


          <hr class="style5" />


          <h3 for="exampleText" size="lg">Convert setting:</h3>
          <Table size="sm">
            <thead>
              <tr>
                <th width='400'>Item</th>
                <th width='800'>Value</th>
                <th width='200'>Unit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Sampling frequency</th>

                <td>
                  <Input type="text"
                    style={{ width: 240 }}
                    id="Sampling frequency"
                    placeholder="Sampling frequency"
                    value={this.state.sFrequency}
                    onChange={this.handle_SF}
                  />
                </td>
                <td>kHz</td>
              </tr>
              <tr>
                <th scope="row">Byte per second</th>
                <td> {this.state.sFrequency / 8}</td>
                <td>Byte/s</td>
              </tr>
              <tr>
                <th scope="row">Length</th>
                <td>
                  <section>
                    <div style={{ marginRight: 18 }}>
                      <TimeField
                        showSeconds
                        value={this.state.startTime}
                        onChange={this.handle_startTime}
                        style={{ width: 120 }}
                        input={<TextField label="Start time" value={this.state.startTime} variant="outlined" />}
                      />
                      {'    '}
                      <TimeField
                        showSeconds
                        value={this.state.endTime}
                        onChange={this.handle_endTime}
                        style={{ width: 120 }}
                        input={<TextField label="End time" value={this.state.endTime} variant="outlined" />}
                      />
                    </div>
                  </section>
                  {/* <TextField id="standard-basic" label="Start time" />
                  {'        '}
                  <TextField id="standard-basic" label="End Time" /> */}


                  <div>
                    {/* <TimeRangeSlider
                      disabled={false}
                      format={24}
                      maxValue={"23:59"}
                      minValue={"00:00"}
                      name={"time_range"}
                      onChangeStart={this.changeStartHandler}
                      onChangeComplete={this.changeCompleteHandler}
                      onChange={this.timeChangeHandler}
                      step={15}
                      value={this.state.value} /> */}
                  </div>

                  {/* <input
                  type="range"
                  value={this.props.value}
                  min={this.props.min}
                  max={this.props.max}
                  on Input={this .props .handleChange}
                  step={this.props.step} /> */}


                </td>
                <td></td>
              </tr>
              <tr>
                <th scope="row">Sound type</th>
                <td>

                  <select className="browser-default custom-select"
                    onChange={this.handle_ST}
                    value={this.state.soundType}
                  >
                    <option value="stereo">Stereo</option>
                    <option value="monaural">Monaural</option>
                  </select>


                </td>
                <td></td>
              </tr>
              <tr>
                <th scope="row">File type</th>
                <td>


                  <select className="browser-default custom-select"
                    onChange={this.handle_FT}
                    value={this.state.fileType}
                  >
                    <option value="mp3">.mp3</option>
                    <option value="wav">.wav</option>
                    <option value="aac">.aac</option>
                    <option value="csv">.csv</option>
                  </select>


                </td>
                <td></td>
              </tr>
              <tr>
                <th scope="row">Data coversion operation</th>
                <td>
                  <select className="browser-default custom-select"
                    onChange={this.handle_DCO}
                    value={this.state.cvtOperation}
                  >
                    <option value="raw">RAW</option>
                    <option value="ave">AVE</option>
                  </select>

                </td>
                <td></td>
              </tr>
            </tbody>
          </Table>

          <div>
            {this.state.status ? <img src={play} alt="Play" height="20" onClick={() => this.handlePlayerClick()} /> : <img src={pause} alt="Pause" height="20" onClick={() => this.handlePlayerClick()} />}
            {this.state.selectedFile.name}
          </div>
          <div className="">

            <p class="right">
              <button onClick={this.handleConvert} className="btn btn-primary">
                Convert file
                </button>{' '}
              <button onClick={this.createItem} className="btn btn-primary">
                Export file
                </button>
            </p>
          </div>
          <br />
        </div>
      );
    }
  };

  render() {
    let now = new Date()
    // let wasDate = new Date("Thu Jul 18 2013 15:48:59 GMT+0400")

    return (
      <main className="content">
        <h1 className="text-white text-uppercase text-center my-4"></h1>
        <div className="row ">
          <div className="col-md-9 col-sm-10 mx-auto p-0">

            <Table size="sm">
              <tr>
                <th>
                  <p class="left">
                    <h1>
                      <span class="contentHeader">CONVERT SOUND  </span>
                      <img height='50' src={wave} alt="logo" />
                    </h1>
                    <div>
                      <p>Today: <Time value={now} format="YYYY/MM/DD HH:mm:ss" /></p>
                    </div>
                  </p>
                </th>
                <th>
                  <p class="right">
                    <img height='50' src={logo} alt="logo" />
                  </p>
                </th>
              </tr>
            </Table>

            <div className="card p-3">
              <div className="">


                <div>
                  <p>Choose audio file before Pressing the Upload button</p>
                  <div class="custom-file">
                    <label class="custom-file-label" for="customFile">Choose file</label>
                    <input ref="upload" type="file" accept="audio/*" class="custom-file-input" id="customFile"
                      onChange={(e) => {
                        this.onFileChange(e); this.senData()
                      }}
                    />
                    {this.fileData()}

                  </div>
                </div>
                <br />


              </div>
              <ul className="list-group list-group-flush">
              </ul>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App; 
