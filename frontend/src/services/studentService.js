// Student REST API service connected to the Express backend.
import api from './api';
const studentService={getAll:async()=>{const{data}=await api.get('/students');return data.data},getById:async(id)=>{const{data}=await api.get(`/students/${id}`);return data.data},create:async(payload)=>{const{data}=await api.post('/students',payload);return data.data},update:async(id,payload)=>{const{data}=await api.put(`/students/${id}`,payload);return data.data},delete:async(id)=>{const{data}=await api.delete(`/students/${id}`);return data}};export default studentService;
