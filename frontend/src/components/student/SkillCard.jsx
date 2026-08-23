// Displays one skill, its proficiency, and an optional remove action.
function SkillCard({ skill, onRemove }) { return <article className="skill-card"><div><i className="bi bi-code-square" /><span><strong>{skill.name}</strong><small>{skill.category}</small></span></div><div className="skill-actions"><span className={`skill-level ${skill.level.toLowerCase()}`}>{skill.level}</span>{onRemove && <button className="btn btn-sm" onClick={() => onRemove(skill.name)} aria-label={`Remove ${skill.name}`}><i className="bi bi-x-lg" /></button>}</div></article>; }
export default SkillCard;
