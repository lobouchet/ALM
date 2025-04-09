import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { toast } from 'react-toastify';

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
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  position: relative;
  padding-bottom: 0.5rem;
  background: linear-gradient(90deg, #00f2fe 0%, #4facfe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 20px rgba(0, 242, 254, 0.3);

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, 
      rgba(0, 242, 254, 0) 0%,
      rgba(0, 242, 254, 0.8) 50%,
      rgba(0, 242, 254, 0) 100%
    );
    border-radius: 2px;
    box-shadow: 0 0 10px rgba(0, 242, 254, 0.3);
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #ffffff;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #00b4d8;
    box-shadow: 0 0 0 2px rgba(0, 180, 216, 0.2);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #ffffff;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #00b4d8;
    box-shadow: 0 0 0 2px rgba(0, 180, 216, 0.2);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #ffffff;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #00b4d8;
    box-shadow: 0 0 0 2px rgba(0, 180, 216, 0.2);
  }

  option {
    background: #0a0a1a;
    color: #ffffff;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  background: #00b4d8;
  color: white;
  font-size: 1rem;
  width: 100%;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #0096c7;
    transform: translateY(-2px);
  }
`;

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/tasks',
        {
          title,
          description,
          date_debut: dateDebut,
          date_fin: dateFin,
          priority,
          completed: false
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setTitle('');
      setDescription('');
      setDateDebut('');
      setDateFin('');
      setPriority('medium');
      onTaskAdded();
      toast.success('Tâche créée avec succès !');
    } catch (error) {
      toast.error('Erreur lors de la création de la tâche');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Title>Nouvelle tâche</Title>
      
      <Label htmlFor="title">Titre de la tâche</Label>
      <Input
        id="title"
        type="text"
        placeholder="Entrez le titre de votre tâche"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <Label htmlFor="description">Description</Label>
      <TextArea
        id="description"
        placeholder="Décrivez votre tâche en détail"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Label htmlFor="dateDebut">Date et heure de début</Label>
      <Input
        id="dateDebut"
        type="datetime-local"
        value={dateDebut}
        onChange={(e) => setDateDebut(e.target.value)}
        required
      />

      <Label htmlFor="dateFin">Date et heure de fin</Label>
      <Input
        id="dateFin"
        type="datetime-local"
        value={dateFin}
        onChange={(e) => setDateFin(e.target.value)}
        required
      />

      <Label htmlFor="priority">Niveau de priorité</Label>
      <Select
        id="priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        required
      >
        <option value="low">Basse</option>
        <option value="medium">Moyenne</option>
        <option value="high">Haute</option>
      </Select>

      <Button type="submit">Créer la tâche</Button>
    </Form>
  );
};

export default TaskForm; 