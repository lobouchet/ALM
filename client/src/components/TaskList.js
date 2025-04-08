import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import axios from 'axios';

const TaskListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Section = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(45deg, #00b4d8, #e94560);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 20px rgba(0, 180, 216, 0.3);
`;

const TaskGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const TaskCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    border-color: rgba(0, 180, 216, 0.3);
  }
`;

const TaskTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #ffffff;
`;

const TaskDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const TaskDates = styled.div`
  display: flex;
  justify-content: space-between;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.8rem;
  margin-bottom: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  flex: 1;

  &.complete {
    background: #00b4d8;
    color: white;

    &:hover {
      background: #0096c7;
      transform: translateY(-2px);
    }
  }

  &.delete {
    background: #e94560;
    color: white;

    &:hover {
      background: #d13354;
      transform: translateY(-2px);
    }
  }
`;

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch (error) {
      toast.error('Erreur lors du chargement des tâches');
    }
  };

  const handleComplete = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5000/api/tasks/${taskId}/complete`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchTasks();
      toast.success('Tâche marquée comme terminée !');
    } catch (error) {
      toast.error('Erreur lors de la mise à jour de la tâche');
    }
  };

  const handleDelete = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
      toast.success('Tâche supprimée avec succès !');
    } catch (error) {
      toast.error('Erreur lors de la suppression de la tâche');
    }
  };

  const inProgressTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <TaskListContainer>
      <Section>
        <SectionTitle>En cours</SectionTitle>
        <TaskGrid>
          {inProgressTasks.map((task) => (
            <TaskCard key={task._id}>
              <TaskTitle>{task.title}</TaskTitle>
              <TaskDescription>{task.description}</TaskDescription>
              <TaskDates>
                <span>Créée le: {new Date(task.createdAt).toLocaleDateString()}</span>
                <span>Échéance: {new Date(task.dueDate).toLocaleDateString()}</span>
              </TaskDates>
              <ButtonGroup>
                <Button className="complete" onClick={() => handleComplete(task._id)}>
                  Terminer
                </Button>
                <Button className="delete" onClick={() => handleDelete(task._id)}>
                  Supprimer
                </Button>
              </ButtonGroup>
            </TaskCard>
          ))}
        </TaskGrid>
      </Section>

      <Section>
        <SectionTitle>Terminées</SectionTitle>
        <TaskGrid>
          {completedTasks.map((task) => (
            <TaskCard key={task._id}>
              <TaskTitle>{task.title}</TaskTitle>
              <TaskDescription>{task.description}</TaskDescription>
              <TaskDates>
                <span>Créée le: {new Date(task.createdAt).toLocaleDateString()}</span>
                <span>Terminée le: {new Date(task.completedAt).toLocaleDateString()}</span>
              </TaskDates>
              <ButtonGroup>
                <Button className="delete" onClick={() => handleDelete(task._id)}>
                  Supprimer
                </Button>
              </ButtonGroup>
            </TaskCard>
          ))}
        </TaskGrid>
      </Section>
    </TaskListContainer>
  );
};

export default TaskList; 