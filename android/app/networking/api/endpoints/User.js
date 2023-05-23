import {api} from '../Api';
export default loginWS = {
    test: async function () {
        return await api.get('/users/test');
    }
}