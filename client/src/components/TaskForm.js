import React, { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 16px;
  margin-bottom: 3rem;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

const Title = styled.h3`
  color: #ffffff;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  background: linear-gradient(90deg, #00f2fe 0%, #4facfe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  background: linear-gradient(90deg, #00f2fe 0%, #4facfe 100%);
  color: white;
  font-size: 1rem;
  width: 100%;
`;

const TaskForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      date_debut: dateDebut,
      date_fin: dateFin,
      complete: false
    });
    setTitle('');
    setDescription('');
    setDateDebut('');
    setDateFin('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Title>Create New Task</Title>
      <Input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <TextArea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Input
        type="datetime-local"
        value={dateDebut}
        onChange={(e) => setDateDebut(e.target.value)}
        required
      />
      <Input
        type="datetime-local"
        value={dateFin}
        onChange={(e) => setDateFin(e.target.value)}
        required
      />
      <Button type="submit">Create Task</Button>
    </Form>
  );
};

export default TaskForm; 