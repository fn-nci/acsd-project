import { FaStar } from "react-icons/fa";
import { useState } from "react";
import '../styles/StarRating.scss';

function Rating({}) {
    const starNumber=5;
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);


    function handleClick(e, index) {
        e.preventDefault();
        setRating(index);
    }

    function handleMouseEnter(e, index) {
        e.preventDefault();
        setHover(index);
    }

    function handleMouseLeave(e) {
        e.preventDefault();
        setHover(0);// back to default if not hovering
    }

    return (
        <div>
            {
                [...Array(starNumber)].map((i, index) => {
                    const starIndex= index + 1;
                    return(
                        <FaStar 
                            key={starIndex} 
                            className={starIndex <= (hover || rating) ? "on" : "off"}
                            onClick={ (e) => { handleClick(e, starIndex) }}
                            onMouseEnter={(e) => { handleMouseEnter(e, starIndex) }}
                            onMouseLeave= {handleMouseLeave}
                        />
                    );
                })
            }
            <span>{rating === 1 ? `${rating} star` : `${rating} stars`}</span>
        </div>
    )
}

export default Rating; 