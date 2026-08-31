// Accessible loading indicator for async screens.
function LoadingSpinner({text='Loading...'}){return <div className="ui-loading"><div className="spinner-border text-primary" role="status"/><span>{text}</span></div>}export default LoadingSpinner;
