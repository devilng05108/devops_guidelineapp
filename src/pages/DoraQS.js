import {
  Link,
  Navigate,
  useLocation,
  useParams,
  useNavigate,
} from 'react-router-dom';
import React from 'react';
import classes from '../styles/DoraQs.module.css';

 export function withRouter(Children) {
   return (props) => {
     const match = { params: useParams(),location: useLocation(),navigate:useNavigate() };
     return <Children {...props} match={match} />;
   };
 }

 class DoraQS extends React.Component{
  constructor(props){
    super(props);
    this.state={
      value: 'Elite',
      done: false
    }
    console.log(this.props.match.location.state.westrumScore);
    // console.log(this.props);
  }
  handleChange = (event) =>{
    this.setState({
      value: event.target.value
    })
  }
  next = () => {
    this.setState({
      done: true
    })
  }

  goBack = () =>{
    this.props.match.navigate(-2);
  }
  render(){
      return (
        <div className={classes.mainContainer}>
          <div className={classes.secContainer}>
            <p className={classes.text1}>
              Please click on the link below to access DORA DevOps Quick Check
              tool in order to determine the software delivery performance level
              of you organization.
            </p>
            {/* <p>{this.props.match.location.state.westrumScore}</p> */}
            <a
              className={classes.link}
              href={'https://www.devops-research.com/quickcheck.html'}
              target="_blank"
            >
              Click here: DORA DevOps Quick Check tool
            </a>
            <h3 className={classes.subtitle}>
              Select your software delivery performance level:
            </h3>
            <select
              className={classes.select}
              value={this.state.value}
              onChange={this.handleChange}
            >
              <option value="Elite">Elite</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            {/* <p>{this.state.value}</p> */}
            <div className={classes.butGroup}>
              <button className={classes.butBack} onClick={this.goBack}>
                Back
              </button>
              <button className={classes.butNext} onClick={this.next}>
                Next
              </button>
            </div>
            {this.state.done && (
              <Navigate
                to="/table"
                state={{
                  westrumScore: this.props.match.location.state.westrumScore,
                  doraLevel: this.state.value,
                }}
                replace={false}
              />
            )}
          </div>
        </div>
      );
  }
 }


// export default DoraQS;
export default withRouter(DoraQS);
