// Shows the student's current team and the people in it.
function TeamCard({ team }) { return <article className="team-card"><div className="team-card-heading"><div><span>MY TEAM</span><h3>{team.name}</h3><p><i className="bi bi-folder-fill" /> {team.project}</p></div><i className="bi bi-diagram-3-fill" /></div><div className="team-members">{team.members.map((member) => <div key={member.name}><span className="member-avatar">{member.initials}</span><span><strong>{member.name}</strong><small>{member.role}</small></span></div>)}</div></article>; }
export default TeamCard;
