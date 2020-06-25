import React, { Component, useEffect, useState } from "react";
import { connect, useDispatch, useSelector, shallowEqual } from "react-redux";
import { Tabs, Tab, Button } from "react-bootstrap";

import { fetchProcessesName } from "./redux/processesName/actions";
import { fetchProcessesDetail } from "./redux/processesDetail/actions";

function App() {
  const dispatch = useDispatch();
  const processesName = useSelector((state) => state.processesName);
  useEffect(() => {
      dispatch(fetchProcessesName())
  }, []);

  return (
    <div>
      <Tabs defaultActiveKey={processesName[0]}>
        {processesName.map((pName) => {
          return (
            <Tab key={pName} eventKey={pName} title={pName}>
              <Button variant="primary">Primary</Button>
            </Tab>
          );
        })}
      </Tabs>
    </div>
  );
}

export default App;

// class App extends Component {
//   constructor(props) {
//     super(props);
//   }

//   componentDidMount() {
//     // if (!processesName.length) {
//     this.props.fetchProcessesName();
//     // }
//   }

//   componentDidUpdate() {
//     console.log("Update");
//   }

//   render() {
//     const { processesName } = this.props;
//     return (
//       <Tabs defaultActiveKey={processesName[0]}>
//         {processesName.map((pName) => {
//           return (
//             <Tab key={pName} eventKey={pName} title={pName}>
//               <Button variant="primary">Primary</Button>
//             </Tab>
//           );
//         })}
//       </Tabs>
//     );
//   }
// }

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProcessesName: () => dispatch(fetchProcessesName()),
    fetchProcessesDetail: (pName) => dispatch(fetchProcessesDetail(pName)),
  };
};

const mapStateToProps = (state) => {
  const { processesName } = state;
  return { processesName };
};

// export default connect(null, mapDispatchToProps)(App);
