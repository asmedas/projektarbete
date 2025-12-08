import './ContentBox.css'

export default function ContentBox({ children }) {
    return (
        <div className="contentbox">
            <div className="content-inner">
                {children}
            </div>
        </div>
    );
}
