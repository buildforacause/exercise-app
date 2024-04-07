import React, {useState} from 'react';
import '../App.css';
import Navbar from '../components/Navbar.js';

import { useAuth } from '../context/AuthContext.tsx';

export default function Picker() {
  const { authState } = useAuth();
  const [bodypart, setBodyPart] = useState("your body");

return (
    <>
    <Navbar active="Picker" authenticated={authState.authenticated} user={authState.user} />
    <div className='register-container mt-5'>
        <h1>Wanna train {bodypart} ?</h1>
        <p className="text-muted">Tip: Click the body part you want to train from the figure below !</p>
        <div className='d-flex align-items-center justify-content-center gap-4'>

        <img src={process.env.PUBLIC_URL + "/front-body.png"} width="333" height="600" useMap="#pickerfront" alt='picker'/>
        <img src={process.env.PUBLIC_URL + "/back-body.png"} width="299" height="600" useMap="#pickerback" alt='picker'/>
        </div>
        <map name="pickerfront">
            <area shape="rect" coords="11,109,85,335" href="/recommend?train=arms" alt="arms" onMouseMove={() => setBodyPart('Arms')} />
            <area shape="rect" coords="191,108,286,335" href="/recommend?train=arms" alt="arms" onMouseMove={() => setBodyPart('Arms')} />
            <area shape="rect" coords="105,116,186,166" href="/recommend?train=chest" alt="chest" onMouseMove={() => setBodyPart('Chest')} />
            <area shape="rect" coords="103,272,221,589" href="/recommend?train=legs" alt="legs" onMouseMove={() => setBodyPart('Legs')} />
            <area shape="rect" coords="105,166,187,265" href="/recommend?train=core" alt="core" onMouseMove={() => setBodyPart('Core')} />
        </map>
        <map name="pickerback">
            <area shape="rect" coords="11,109,85,335" href="/recommend?train=triceps" alt="arms" onMouseMove={() => setBodyPart('Triceps')} />
            <area shape="rect" coords="191,108,286,335" href="/recommend?train=triceps" alt="arms" onMouseMove={() => setBodyPart('Triceps')} />
            <area shape="rect" coords="105,116,186,166" href="/recommend?train=upperback" alt="chest" onMouseMove={() => setBodyPart('Upper Back')} />
            <area shape="rect" coords="103,272,221,589" href="/recommend?train=glutes" alt="legs" onMouseMove={() => setBodyPart('Glutes')} />
            <area shape="rect" coords="105,166,187,265" href="/recommend?train=lowerback" alt="core" onMouseMove={() => setBodyPart('Lower Back')} />
        </map>
    </div>

    

    </>
  );
}

