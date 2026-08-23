// Project REST API service connected to the Express backend.
import api from './api';
const projectService={getAll:async()=>{const{data}=await api.get('/projects');return data.data},getById:async(id)=>{const{data}=await api.get(`/projects/${id}`);return data.data},create:async(payload)=>{const{data}=await api.post('/projects',payload);return data.data},update:async(id,payload)=>{const{data}=await api.put(`/projects/${id}`,payload);return data.data},delete:async(id)=>{const{data}=await api.delete(`/projects/${id}`);return data}};export default projectService;
