import React, { useState } from 'react';

const CardForm = ({ initialData = { front: '', back: '' }, onSubmit }) => {
    const [formData, setFormData] = useState(initialData);

    const handleChange = (event) => {
        const { name, value } = event.target;
        // set form data here
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label ></label>
                <textarea
                />
            </div>
            <div>
                <label></label>
                <textarea
                />
            </div>
            <button type='submit' className='btn btn-primary'>Submit</button>
        </form>
    );
};