import { Link, Navigate } from 'react-router-dom';
import classes from '../styles/WestrumQs.module.css'
import React from 'react';
import Likert from 'react-likert-scale';


class WestrumQS extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qsArr: [
        'On my team, information is actively sought.',
        'On my team, failutes are learning opportunities, and messengers of them are not punished.',
        'On my team, responsibilities are shared.',
        'On my team, cross-functional collaboration is encouraged and rewarded.',
        'On my team, failure causes enquiry',
        'On my team, new ideas are welcomed.',
      ],
      score: 1,
      storedScore:0,
      finalscore: 0,
      count: 0,
      changed: false,
      done: false,
    };
    // let navigate = useNavigate();
  }

  next = () => {
    console.log('next');

    if (this.state.count < 5) {
      this.setState({
        count: this.state.count + 1,
        finalscore: this.state.finalscore + this.state.score,
        storedScore: this.state.score,
      });
    } else {
      // this.props.history.push("/dora");
      this.setState({
        finalscore: this.state.finalscore + this.state.score,
        done: true,
      });
      // <Navigate to="/dashboard" replace={true} />
    }
  };

  goBack = () =>{
    this.setState({
      count: this.state.count - 1,
      finalscore: this.state.finalscore - this.state.storedScore,
    });
  }

  render() {
    const likertOptions = {
      question: null,
      responses: [
        { value: 1, text: '1', checked: true },
        { value: 2, text: '2' },
        { value: 3, text: '3' },
        { value: 4, text: '4' },
        { value: 5, text: '5' },
        { value: 6, text: '6' },
        { value: 7, text: '7' },
      ],
      onChange: (val) => {
        console.log(val);
        this.setState({
          score: val.value,
          changed: true,
        });
      },
    };
    return (
      <div className={classes.mainContainer}>
        <div className={classes.secContainer}>
          <p className={classes.text1}>
            Please answer the following questions to determine the cultural
            level of your organization.
          </p>
          <h3>
            {this.state.count + 1}. {this.state.qsArr[this.state.count]}
          </h3>
          <div className={classes.scale}>
            {/* <div className={classes.scale} style={{ display: 'flex', flexDirection: 'row',marginTop: '20' }}> */}
            <p>Strongly disagree</p>
            <Likert {...likertOptions} />
            <p>Strongly agree</p>
          </div>
          {/* <p>Score is {this.state.finalscore}</p> */}
          <div className={classes.butGroup}>
            {this.state.count > 0 && (
              <button className={classes.butBack} onClick={this.goBack}>
                Back
              </button>
            )}

            <button className={classes.butNext} onClick={this.next}>
              Next 
            </button>
          </div>
          {this.state.done && (
            <Navigate
              to="/dora"
              state={{ westrumScore: this.state.finalscore }}
              replace={false}
            />
          )}
        </div>
      </div>
    );
  }
}

export default WestrumQS;
//  export default withRouter(WestrumQS);
