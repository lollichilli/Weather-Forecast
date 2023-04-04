import "./Card.css";

const Card = (props) => {
    return (
        <div className="card">
            <h1>{props.descr}</h1>
            <h2>{props.title}</h2>
        </div>
    );
};

export default Card;