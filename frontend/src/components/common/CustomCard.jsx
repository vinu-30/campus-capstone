// Generic Bootstrap-style card wrapper.
function CustomCard({title,children,className=''}){return <section className={`ui-card ${className}`}><>{title&&<h2>{title}</h2>}</>{children}</section>}export default CustomCard;
