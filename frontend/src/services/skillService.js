import api from './api';
export default {getAll:async()=>(await api.get('/skills')).data.data,create:async(payload)=>(await api.post('/skills',payload)).data.data,delete:async(id)=>(await api.delete(`/skills/${id}`)).data};
