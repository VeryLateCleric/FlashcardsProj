import React from 'react';
import { useParams } from 'react-router-dom';
import CardForm from './CardForm';

const EditCard = () => {
    const { deckId } = useParams();
    return (
        <div>
            <h2>Edit Card in Deck - {deckId}</h2>
            <CardForm />
        </div>
    );
}

export default EditCard;