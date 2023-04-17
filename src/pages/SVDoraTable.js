import {
  Link,
  Navigate,
  useLocation,
  useParams,
  useNavigate,
} from 'react-router-dom';
import React from 'react';
import classes from '../styles/table.module.css';

export function withRouter(Children) {
  return (props) => {
    const match = {
      params: useParams(),
      location: useLocation(),
      navigate: useNavigate(),
    };
    return <Children {...props} match={match} />;
  };
}

class SVDoraTable extends React.Component {
  constructor(props) {
    super(props);

    let score = this.props.match.location.state.westrumScore;
    let culture;
    if (score >= 29) {
      culture = 'Generative';
    } else if (score >= 15) {
      culture = 'Bureaucratic';
    } else {
      culture = 'Pathological';
    }

    let SVarr = [
      {
        no: '1',
        desc: 'Getting the source code as the intellectual property and sell it under different name',
        solution: 'Integrate licensing into software product and build',
        C1: 'Low',
        C2: 'None',
        M1: 'Low',
        M2: 'Low',
      },
      {
        no: '2',
        desc: 'Stolen password/ssh keys',
        solution:
          '1. Put in place password-rotation mechanism for SSH users, or at least do linux user management every time a member leaves an organization ; 2. Use secrets or environment variables to store passwords and keys',
        C2: 'Low',
        M1: 'None',
        M2: 'Low',
      },
      {
        no: '3',
        desc: 'Extraction of credentials from the pipeline configuration to access sensitive systems connected to pipeline',
        solution:
          '1. Encrypt pipeline configuration file and store it in a safe folder with limited access ;2. Avoid adding credentials in configuration and encrypt if must',
        C1: 'Medium',
        C2: 'Low',
        C3: 'Low',
        M1: 'Medium',
        M2: 'Medium',
        M3: 'Low',
      },
      {
        no: '4',
        desc: 'Unauthorized access: a non-malicious user can misconfigure a component of pipeline',
        solution: 'Implement code review SOP ',
        C2: 'Medium',
        M2: 'Medium',
      },
      {
        no: '6',
        desc: 'Integrate “bad code” like backdoors or special behaviours',
        solution:
          '1. Merge request review/approvals ; 2. Release new version ; 3. Review code from time to time to check for bad code; 4. Use static testing tool to check before implementing code changes ',
        C1: 'High',
        C2: 'High',
        C3: 'Medium',
        M1: 'High',
        M2: 'High',
        M3: 'Medium',
        M4: 'Medium',
      },
      {
        no: '7',
        desc: 'Input data manipulation',
        solution: 'Configure end-to-end encryption',
        C2: 'None',
        M2: 'None',
      },
      {
        no: '8',
        desc: 'Source code manipulation',
        solution:
          'Increase code coverage and encourage adding automated tests to new changes ',
        C3: 'Low',
        M3: 'Low',
      },
      {
        no: '9',
        desc: 'Pipeline configuration manipulation',
        solution:
          'Time to time pipeline configuration checking and validation ',
        C2: 'Low',
        C3: 'Low',
        M2: 'Low',
        M4: 'Low',
      },
      {
        no: '10',
        desc: 'Vulnerable dependencies of the CD pipeline',
        solution:
          '1. Update dependencies when new versions are rolled out ;2. Depends on minimal number of external packages and always update them; 3. Scan through pipeline using firewall to check for vulnerabilities',
        C1: 'Medium',
        C2: 'Medium',
        C3: 'Medium',
        M1: 'High',
        M2: 'Medium',
        M3: 'Medium',
        M4: 'Medium',
      },
      {
        no: '11',
        desc: 'Denial of service',
        solution:
          '1. secure cloud infrastructure with ddos attack prevention solutions ;2. Implement server firewall',
        C1: 'High',
        C2: 'High',
        C3: 'Medium',
        M1: 'High',
        M2: 'High',
        M4: 'Medium',
      },
      {
        no: '12',
        desc: 'Availability hazard/risk',
        solution: 'Multiple servers as backup ',
        C2: 'Medium',
        C3: 'Medium',
        M2: 'Medium',
        M3: 'Medium',
      },
      {
        no: '13',
        desc: 'Changes made by individuals that break the pipeline',
        solution:
          '1. Automated CI/CD on the PR branch to flag possible failures before human-intervention for PR review/approve. ;2. Code reviews by lead developer before code integration',
        C1: 'Low',
        C2: 'Low',
        M1: 'Low',
        M2: 'Low',
        M3: 'Low',
        M4: 'Low',
      },
      {
        no: '14',
        desc: 'Updates of the pipeline environment destroys the pipeline',
        solution:
          'Store versions of pipeline env configuration and revert to previous if broken ',
        C1: 'Medium',
        C3: 'Low',
        M1: 'Medium',
        M2: 'Low',
      },
      {
        no: '16',
        desc: 'Obtain configuration files to directly access database or backends',
        solution:
          'Save database configuration in a .env file and can only be accessed by project manager or lead developer',
        C1: 'Low',
        C2: 'Medium',
        M2: 'Low',
        M4: 'Medium',
      },
      {
        no: '18',
        desc: 'Manipulate files/artifacts, unauthorized use of resource',
        solution: 'Encrypt documents with passwords ',
        C1: 'Low',
        C2: 'Low',
        C3: 'None',
        M1: 'Low',
        M2: 'None',
      },
      {
        no: '19',
        desc: 'Plant malicious code',
        solution: 'Using firewall to scan and check for vulnerabilities ',
        C1: 'Low',
        M1: 'Low',
      },
      {
        no: '20',
        desc: 'Pipeline uses old libraries/ applications with vulnerabilities',
        solution:
          '1. Utilize community reporting of issues and vulnerabilities ;2. Regular dependency updates',
        C1: 'Medium',
        C2: 'High',
        C3: 'Medium',
        M1: 'Medium',
        M2: 'Critical',
        M3: 'High',
        M4: 'Medium',
      },
      {
        no: '21',
        desc: 'Brute-force passwords',
        solution:
          '1. Limit log-in attempts from ip address ;2. Block brute force attacks with firewall',
        C1: 'Critical',
        C2: 'Critical',
        C3: 'High',
        M1: 'Critical',
        M2: 'Critical',
        M3: 'High',
        M4: 'High',
      },
      {
        no: '23',
        desc: 'Revealing error handling information (e.g., stack traces) to potential attackers ',
        solution:
          'Have a good (preferably automated) “build and deploy” process, which can run tests on deploy ',
        C1: 'Low',
        M1: 'Low',
      },
      {
        no: '24',
        desc: 'Sensitive data exposure ',
        solution:
          'Use HTTPS with a proper certificate and PFS (Perfect Forward Secrecy). Do not accept anything over non-HTTPS connections. Have the “secure” flag on cookies ',
        C2: 'Medium',
        M3: 'Medium',
      },
      {
        no: '25',
        desc: 'Server-Side Request Forgery ',
        solution:
          '1. Segment remote resource access functionality in separate networks to reduce the impact of SSRF 2. Sanitize and validate all client-supplied input data',
        C2: 'Low',
        M2: 'Low',
      },
      {
        no: '26',
        desc: 'Broken Access Control',
        solution:
          'Implement access control mechanisms once and re-use them throughout the application, including minimizing Cross-Origin Resource Sharing (CORS) usage ',
        C1: 'Critical',
        M1: 'Critical',
      },
      {
        no: '27',
        desc: 'Cross Site Scripting (XSS) attacks ',
        solution: 'Turn off HTTP TRACE support on all web servers ',
        C3: 'Medium',
        M3: 'Medium',
      },
    ];
    // let SVarr = [{ "desc": 'SV1', "solution": 'sol1', "C1": 'Low', "C2": 'None',"M1":"Low","M2":"Low" },{"desc":"SV2"}];

    // var newArray = SVarr.filter(function (el) {
    //   if (culture == 'Pathological') {
    //     return el.C1;
    //   } else if (culture == 'Bureaucratic') {
    //     return el.C2;
    //   } else {
    //     return el.C3;
    //   }
    // });

    let doraLevel = this.props.match.location.state.doraLevel;
    var finalArr = SVarr.filter(function (el) {
      if (doraLevel == 'Low') {
        return el.M1;
      } else if (doraLevel == 'Medium') {
        return el.M2;
      } else if (doraLevel == 'High') {
        return el.M3;
      } else {
        return el.M4;
      }
    });
    console.log(finalArr);
    this.state = {
      value: 'Elite',
      done: false,
      culture: culture,
      SV: finalArr,
    };
  }

  goBack = () => {
    this.props.match.navigate(-2);
  };

  next = () => {
    this.setState({
      done: true,
    });
  };

  getBackgroundColor(val) {
    switch (val) {
      case 'Critical':
        return '#FF4136';
      case 'High':
        return '#FF851B';
      case 'Medium':
        return '#FFDC00';
      case 'Low':
        return '#2ECC40';
      default:
        return 'white';
    }
  }

  render() {
    let doraLevel = this.props.match.location.state.doraLevel;
    return (
      <div className={classes.mainContainer}>
        <div className={classes.secContainer}>
          {/* <p>Cultural Level: {this.props.match.location.state.westrumScore}</p> */}
          {/* <p className={classes.topText}>
            Cultural Level: <b>{this.state.culture}</b>
          </p> */}
          <p className={classes.topText}>
            Software Delivery Performance level:{' '}
            <b>{this.props.match.location.state.doraLevel}</b>
          </p>
          <table className={classes.table}>
            <tr>
              <th>Software Vulnerabilities</th>
              <th>Technical Solution</th>
              {/* <th>Risk rating ({this.state.culture})</th> */}
              <th>Risk rating ({this.props.match.location.state.doraLevel})</th>
            </tr>
            {this.state.SV.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val.desc}</td>
                  {/* <td>{val.solution}</td> */}
                  <td>
                    <p>{val.solution.split(';').join(`\n`)}</p>
                  </td>
                  {/* <td>{val.gender}</td> */}
                  {/* {this.state.culture == 'Pathological' ? (
                    // val.C1=='Critical'?( <td style={{ textAlign: 'center',backgroundColor:'red' }}>{val.C1}</td>): (<td style={{ textAlign: 'center' }}>{val.C1}</td>),

                    <td
                      style={{
                        textAlign: 'center',
                        backgroundColor: this.getBackgroundColor(val.C1),
                      }}
                    >
                      {val.C1}
                    </td>
                  ) : null}
                  {this.state.culture == 'Bureaucratic' ? (
                    <td
                      style={{
                        textAlign: 'center',
                        backgroundColor: this.getBackgroundColor(val.C2),
                      }}
                    >
                      {val.C2}
                    </td>
                  ) : null}
                  {this.state.culture == 'Generative' ? (
                    <td
                      style={{
                        textAlign: 'center',
                        backgroundColor: this.getBackgroundColor(val.C3),
                      }}
                    >
                      {val.C3}
                    </td>
                  ) : null} */}
                  {doraLevel == 'Low' ? (
                    <td
                      style={{
                        textAlign: 'center',
                        backgroundColor: this.getBackgroundColor(val.M1),
                      }}
                    >
                      {val.M1}
                    </td>
                  ) : null}
                  {doraLevel == 'Medium' ? (
                    <td
                      style={{
                        textAlign: 'center',
                        backgroundColor: this.getBackgroundColor(val.M2),
                      }}
                    >
                      {val.M2}
                    </td>
                  ) : null}
                  {doraLevel == 'High' ? (
                    <td
                      style={{
                        textAlign: 'center',
                        backgroundColor: this.getBackgroundColor(val.M3),
                      }}
                    >
                      {val.M3}
                    </td>
                  ) : null}
                  {doraLevel == 'Elite' ? (
                    <td
                      style={{
                        textAlign: 'center',
                        backgroundColor: this.getBackgroundColor(val.M4),
                      }}
                    >
                      {val.M4}
                    </td>
                  ) : null}
                  {/* {
                if(this.state.culture=='Pathological'){
                  <td>{val.C1}</td>
                }
                } */}
                </tr>
              );
            })}
          </table>
          {/* <button onClick={this.next}>Next ></button> */}
          <div className={classes.butGroup}>
            <button className={classes.butBack} onClick={this.goBack}>
              Back
            </button>
            {/* <button className={classes.butNext} onClick={this.next}>
              Next
            </button> */}
          </div>
          {/* {this.state.done && (
            <Navigate
              to="/culturaltable"
              state={{
                westrumScore: this.props.match.location.state.westrumScore,
                doraLevel: this.props.match.location.state.doraLevel,
              }}
              replace={false}
            />
          )} */}
        </div>
      </div>
    );
  }
}

export default withRouter(SVDoraTable);
