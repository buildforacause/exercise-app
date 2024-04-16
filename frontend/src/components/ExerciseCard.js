import React, {useState, useEffect} from 'react';


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
        const titleCaseWords = words.map((word, index) => {
          return word.charAt(0).toUpperCase() + word.slice(1);
        });
        return titleCaseWords.join(' ');
      };

    return (
        <>
        <div className="card mb-3">
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={"https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/" + data.id + "/" + num + ".jpg"} className="img-fluid rounded-start" alt={data.id} />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h4 className="card-title">{convertToTitleCase(data.name)}</h4>
                        <p className="card-text">
                            {instructions.map((elem, index) => (
                                <><li key={index}>{elem}.</li></>
                            ))}
                        </p>
                        <p className="card-text"><strong>Level: </strong> {convertToTitleCase(data.level)}, <strong>Equipment: </strong> {convertToTitleCase(data.equipment)}</p>
                    </div>
                </div>
            </div>
        </div>

        </>
    );
}

