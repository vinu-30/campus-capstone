// Page dedicated to browsing available dummy project opportunities.
import { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import ProjectCard from '../../components/student/ProjectCard';
import useAuth from '../../auth/useAuth';
import applicationService from '../../services/applicationService';
function StudentProjects(){const{user}=useAuth();const[message,setMessage]=useState('');const[applications,setApplications]=useState(()=>applicationService.getStudentApplications(user.id));const applyToProject=(project)=>{const result=applicationService.apply(user,project);setApplications(applicationService.getStudentApplications(user.id));setMessage(result.created?`Application sent for ${project.title}.`:`You already applied for ${project.title}.`)};const getStatus=(projectId)=>applications.find(item=>item.projectId===projectId)?.status;return <DashboardLayout><main className="student-page"><div className="student-page-heading"><div><h1>Find Projects</h1><p>Explore open capstone opportunities for your next team.</p></div></div>{message&&<div className="alert alert-success">{message}</div>}<div className="student-project-grid">{applicationService.projects.map((project)=><ProjectCard key={project.id} project={project} applicationStatus={getStatus(project.id)} onApply={applyToProject}/>)}</div></main></DashboardLayout>}
export default StudentProjects;
