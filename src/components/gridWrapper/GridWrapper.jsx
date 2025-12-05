import './GridWrapper.css'
export default function GridWrapper({children}){
    return(
        <div className="gridwrapper">
            {children}
        </div>
    )
}