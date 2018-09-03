import Axios from "axios";

const instance = Axios.create({
    baseURL: "https://burger-project-react-my.firebaseio.com/"
});

export default instance;