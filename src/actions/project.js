import {portNumber} from '../helpers/port'


// export const findProjects = (projects) => {
//     return { type: "FIND_PROJECTS", payload : {projects} }
//   }
  
//   export const fetchProjects = () => {

//     const user = JSON.parse(localStorage.getItem('user'));

//     const requestOptions = {
//       method: 'GET',
//       headers: { 'Content-Type': 'application/json' ,'Authorization': 'Bearer ' + user.accessToken}
//     };
  
//     return dispatch => {
//       fetch(`http://localhost:${portNumber}/api/v1/projects/`, requestOptions)
//         .then(res => {
//           console.log(res);
//           return res.json();
//         })
//         .then(data => {
//           console.log(data);
//           dispatch(findProjects(data));
//         })
//     }
//   }

  const findProject = (project) =>{
    return {type : "FIND_PROJECT",payload : {project}}
}

export const fetchProject = (id) => {

    console.log("inside fetchProject... id = " + id)
    // let project = JSON.parse(localStorage.getItem('project'));
    // console.log(project)

    const user = JSON.parse(localStorage.getItem('user'));

    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
    
         'Authorization': 'Bearer ' + user.accessToken

    }
    };
    return dispatch => {
        fetch(`http://localhost:${portNumber}/api/v1/project/`+id, requestOptions)
            .then(res => {
                console.log(res);
                return res.json();
            })
            .then(data => {
                console.log(data);
                dispatch(findProject(data));
            }).catch((error) => {
                console.error('Error:', error);
              });

    }

}

// const updateProject = () =>{
//     return {type : "UPDATE_PROJECT",payload : {message : 'Updated Successfully'}}
// }
const updateProject = () =>{
    return {type : "UPDATE_PROJECT_SUCCESS",payload : {alert:{type : 'success',message : 'Project updated successfully!'}}}
    // return {type : "UPDATE_PROJECT_SUCCESS", payload : {message : 'Project updated successfully!'}}
}

export const editProject = (updateRequest) => {

    // console.log("inside fetch project... id = ")
    // let user = JSON.parse(localStorage.getItem('project'));
    // console.log(project)
    
    const user = JSON.parse(localStorage.getItem('user'));

    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json',
        
         'Authorization': 'Bearer ' + user.accessToken

    },
    body : JSON.stringify(updateRequest)  
    };
    return dispatch => {
        let code = 0
        fetch(`http://localhost:${portNumber}/api/v1/project/`, requestOptions)
        .then(res => {
            console.log(res);
            //console.log(res.message);
            code = res.status
            if(code!==204)
            {
                return res.text()
            }
            dispatch(updateProject());
            dispatch(fetchProjects());
        })
            .then(res => {
                console.log(res);
                if(code!==204)
                {
                    return Promise.reject(res)
                }  
            })
            .catch((error) => {
                console.error('Error:', error);
                dispatch({type : "UPDATE_PROJECT_FAILED",payload : {alert:{type : 'error',message : error}}})
              });
            
    }

}

const removeProject = (id) =>{
    return {type : "DELETE_PROJECT_SUCCESS",payload : {id,alert:{type : 'success',message : 'Project deleted!'}}}
}

export const deleteProject = (id) => {

    // console.log("inside delete project... id = " + id)
    // let user = JSON.parse(localStorage.getItem('project'));
    // console.log(project)

    const user = JSON.parse(localStorage.getItem('user'));

    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json',
    
         'Authorization': 'Bearer ' + user.accessToken

    }
    };
    return dispatch => {
        fetch(`http://localhost:${portNumber}/api/v1/project/`+id, requestOptions)
            .then(res => {
                console.log(res);
                if(res.status!==204)
                return Promise.reject("Couldn't delete!");
                dispatch(removeProject(id));
            })
            .catch((error) => {
                console.error('Error:', error);
                dispatch({type : "DELETE_PROJECT_FAILED",payload : {alert:{type : 'error',message : error}}})
              });

    }

}

const findProjects = (projects) =>{
    return {type : "FIND_PROJECTS",payload : {projects}}
}

export const fetchProjects = () => {

    //console.log("fetch project... id = " + id)
    // let user = JSON.parse(localStorage.getItem('user'));
    // console.log(user)

    const user = JSON.parse(localStorage.getItem('user'));

    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
    
        'Authorization': 'Bearer ' + user.accessToken

    }
    };
    return dispatch => {
        fetch(`http://localhost:${portNumber}/api/v1/projects`, requestOptions)
            .then(res => {
                console.log(res);
                return res.json();
            })
            .then(data => {
                console.log(data);
                dispatch(findProjects(data));
            }).catch((error) => {
                console.error('Error:', error);
              });

    }

}

const saveProject = (project) =>{
    return {type : "ADD_PROJECT",payload : {project : project, alert:{type : 'success',message : 'Project added successfully!'}}}
}

export const addProject = (payload) => {

    // console.log("adding project")

    const user = JSON.parse(localStorage.getItem('user'));

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + user.accessToken },
        body : JSON.stringify(payload)
    };

    return dispatch => {
        let code = 0
        fetch(`http://localhost:${portNumber}/api/v1/project`, requestOptions)
            .then(res => {
                console.log(res);
                //console.log(res.message);
                code = res.status
                if(res.status!==201)
                {
                    return res.text()
                }
                return res.json();
            })
            .then(res => {  
                console.log(res);
                if(code === 201){
                    console.log("project added successfully");
                    dispatch(saveProject(res))  
                }   
                   
                else{
                    return Promise.reject(res)
                }       
            })
            
            .catch((error) => {
                console.error('Error:', error);
                dispatch({type : "ADD_PROJECT_FAILED",payload : {alert : {type : 'error',message : error}}})
              });

    }

}