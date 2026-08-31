// Dashboard REST API service for live counts and recent projects.
import api from './api';
const dashboardService={getSummary:async()=>{const{data}=await api.get('/dashboard/summary');return data.data}};export default dashboardService;
