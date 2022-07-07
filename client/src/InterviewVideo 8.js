// import React from 'react'
import logo from './logo.png';
import axios from 'axios';
import { VideComponent } from './VideComponent';
import { useHistory } from 'react-router-dom';
import { Error, Success } from './Messages/messages';


function InterviewQuestion8() {
  const history = useHistory();
  const videoFunction = async (blob) => {
    console.log(blob)
    let data = new FormData();
    data.append('question', 'question 1');
    data.append('file', blob);
    data.append('questionTitle', 'How would you handle a situation where someone is difficult to understand or difficult to talk to on the phone?');
    data.append('user', localStorage.getItem('userId'));
    data.append('status', true);
    axios.post('/api/users/interviews/post', data).then(res => {
      if (res.status === 200) {
        Success(res.data.successMessage);
        sendEmail();
      }
      else {
        Error(res.data.errorMessage);
      }
    })
  };

  const sendEmail = async () => {
    axios.post(`/api/users/send/email/${localStorage.getItem('userId')}`).then(res => {
      if (res.status === 200) {
        console.log(res.data);
        history.push('/interviewcoomplete')
      }
      else {
        console.log(res.data.errorMessage);
      }
    })
  };


  return (
    <div>
      <div class="header">
        <di class="logo">
          <img src={logo} alt="Logo" />

        </di>
      </div>

      <div class="contentbody">
        <div class="left" style={{ width: "70%" }}>
        </div>
        <div class="right" style={{ margin: "-80px 10%" }}>
          <p style={{ color: "#ea5e11" }}>QUESTION 8</p><br />
          <p>How would you handle a situation where someone is difficult to understand or difficult to talk to on the phone?</p>
          <VideComponent videoFunction={videoFunction} />
        </div>
      </div>


      <footer>
        <div>
          WEB: <a href="#">www.REALVOICE.com</a>
        </div>
        <div>
          HELP DESK: <a href="tel:+">901-609-300</a>
        </div>
        <div>
          EMAIL: <a href="mailto:hr@realvoice.com">HR@REALVOICE.com</a>
        </div>
      </footer>
    </div>
  )
}

export default InterviewQuestion8;