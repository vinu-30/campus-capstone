// Page dedicated to browsing available dummy project opportunities.
import { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import ProjectCard from '../../components/student/ProjectCard';
const projects=[{title:'Smart Campus Navigator',category:'Mobile Application',description:'Build a simple map and service guide for the university community.',skills:['React','Maps API','Figma'],membersNeeded:2},{title:'EcoTrack Analytics',category:'Data Science',description:'Turn energy usage data into clear sustainability insights.',skills:['Python','MySQL','Charts'],membersNeeded:1},{title:'MediConnect Platform',category:'Web Development',description:'A booking and communication system for campus health services.',skills:['React','Node.js','UI/UX'],membersNeeded:2}];
function StudentProjects(){const [message,setMessage]=useState('');return <DashboardLayout><main className="student-page"><div className="student-page-heading"><div><h1>Find Projects</h1><p>Explore open capstone opportunities for your next team.</p></div></div>{message&&<div className="alert alert-success">{message}</div>}<div className="student-project-grid">{projects.map((project)=><ProjectCard key={project.title} project={project} onApply={(title)=>setMessage(`Application sent for ${title}.`)}/>)}</div></main></DashboardLayout>}
export default StudentProjects;
