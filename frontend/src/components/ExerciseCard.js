import React, {useState, useEffect} from 'react';
import '../App.css';

export default function ExerciseCard(props) {
    const [num, setNum] = useState("0");
    const data = props.exercise;
    const instructions = data.instructions.split('.,');

    useEffect(() => {
        const interval = setInterval(() => {
            let prev = num === "0" ? "1" : "0";
            setNum(prev);
        }, 1500);
        return () => clearInterval(interval);
    }, [num]);

    const convertToTitleCase = (element) => {
        const words = element.toLowerCase().split(' ');
        const titleCaseWords = words.map((word) => {
          return word.charAt(0).toUpperCase() + word.slice(1);
        });
        return titleCaseWords.join(' ');
      };

    return (
        <>
            <div class="card mb-3">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src={process.env.PUBLIC_URL + "/exercises/" + data.id + "/images/" + num + ".jpg"} class="img-fluid rounded-start" alt={data.id} />
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h4 class="card-title">{convertToTitleCase(data.name)}</h4>
                            <p class="card-text">
                                {instructions.map((elem, index) => (
                                    <><li key={index}>{elem}.</li><br/></>
                                ))}
                            </p>
                            <p class="card-text"><strong>Level: </strong> {convertToTitleCase(data.level)}, <strong>Equipment: </strong> {convertToTitleCase(data.equipment)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

