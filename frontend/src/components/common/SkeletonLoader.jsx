// Lightweight visual placeholder while content is loading.
function SkeletonLoader({rows=3}){return <div className="ui-skeleton">{Array.from({length:rows},(_,i)=><span key={i}/>)}</div>}export default SkeletonLoader;
