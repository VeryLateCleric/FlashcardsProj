import React from 'react';
import { useParams } from 'react-router-dom';

const DeckView = () => {
    const { deckId } = useParams();
    return (
        <div>
            <h2>Devk view - {deckId}</h2>
            {/* Later implement the deck view as well. Also currently, just bones */}
        </div>
    );
}

export default DeckView;