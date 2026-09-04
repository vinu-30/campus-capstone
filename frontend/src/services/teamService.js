import api from './api';
export default {getAll:async()=>(await api.get('/teams')).data.data,getStudentTeam:async(id)=>(await api.get(`/teams/student/${id}`)).data.data,create:async(payload)=>(await api.post('/teams',payload)).data.data,delete:async(id)=>(await api.delete(`/teams/${id}`)).data};
