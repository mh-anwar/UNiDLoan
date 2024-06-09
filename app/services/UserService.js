import http from "./http-common";

class UserService {
    async SignUp(user) {
        console.log(user)

        http.post("someUserEndpoint", user)
        .then(function (response) {
            console.log(response); 
            return response.data; 
        })
        .catch(function (error) {
            console.log(error.response);
        })
        .finally(function () {
            
        })
    }

    async GetUsers() {
        try {
            const response = await http.get("someUserEndpoint"); 
            console.log(response); 

            return response; 
        } catch (error) {
            console.log(error.response); 
        }
    }
}