const initialState = {};

const projectReducer = (state = initialState, { type, payload }) => {
  //console.log(type);
  switch (type) {
    case "FIND_PROJECT":
      return { projects: state.projects, project: payload.project };

    case "UPDATE_PROJECT":
      console.log(payload.project);
      return { updated: true, alert: payload.alert };

    case "DELETE_PROJECT_SUCCESS":
      console.log(payload.id);
      let filtered = state.projects.filter(
        (proj) => proj.projectCode !== parseInt(payload.id)
      );
      return { projects: filtered, alert: payload.alert };

    case "DELETE_PROJECT_FAILED":
      return { projects: state.projects, alert: payload.alert };

    case "FIND_PROJECTS":
      // let filteredList = payload.employees.filter(
      //   (emp) => emp.loginDetails.roles[0].name !== 'ROLE_ADMIN'
      // );
      return { projects: payload.projects, alert: state.alert };

    case "ADD_PROJECT":
      console.log(payload.project);
      let list = []
      if(state.projects)
       list = [...state.projects, payload.project];
       else
       list = [payload.project]
      return { projects: list, alert: payload.alert, added: true };
    // return {projects : state.projects, message: payload.message};

    case "RESET_ALERT":
      return { projects: state.projects };

    case "ADD_PROJECT_FAILED":
      return { projects: state.projects, alert: payload.alert };

    case "UPDATE_PROJECT_SUCCESS":
      console.log(payload.id);
      // let filtered2 = state.projects.filter(
      //   (proj) => proj.projectCode !== parseInt(payload.id)
      // );
      // let list2 = [...state.projects]
      return { projects: state.projects, alert: payload.alert, updated: true };

    case "UPDATE_PROJECT_FAILED":
      console.log(payload.id);
      return { projects: state.projects, alert: payload.alert };

    default:
      return state;
  }
};

export default projectReducer;
