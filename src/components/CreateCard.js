import React from 'react';
import { useParams } from 'react-router-dom';
import CardForm from './CardForm';

const CreateCard = () => {
    const { deckId } = useParams();
    return (
        <div>
            <h2>Create New Card in Deckj - {deckId}</h2>
            <CardForm />
        </div>
    ) 
}

export default CreateCard;