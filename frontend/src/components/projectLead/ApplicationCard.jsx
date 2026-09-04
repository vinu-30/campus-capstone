function ApplicationCard({ application, onAction }) {
  return (
    <tr>
      <td>
        <strong>{application.name}</strong>
        <small>{application.email}</small>
      </td>

      <td>{application.department}</td>

      <td>
        <div className="lead-tags">
          {application.skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </td>

      <td>{application.experience}</td>

      <td>{application.date}</td>

      <td className="d-flex gap-1">
        <button
          className="btn btn-sm btn-success"
          onClick={() =>
            onAction(application.id, application.name, 'accepted')
          }
          disabled={application.status !== 'Pending'}
        >
          Accept
        </button>

        <button
          className="btn btn-sm btn-outline-danger"
          onClick={() =>
            onAction(application.id, application.name, 'rejected')
          }
          disabled={application.status !== 'Pending'}
        >
          Reject
        </button>
      </td>
    </tr>
  );
}

export default ApplicationCard;