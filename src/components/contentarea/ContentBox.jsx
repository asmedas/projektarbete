import './ContentBox.css'
export default function ContentBox({children}){
    return(
        <div className='contentbox'>
            {children}
        </div>
    )
}