// Standard Bootstrap error alert.
function ErrorAlert({message}){return message?<div className="alert alert-danger"><i className="bi bi-exclamation-triangle-fill"/> {message}</div>:null}export default ErrorAlert;
