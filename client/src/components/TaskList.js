import React from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import axios from 'axios';

const TaskListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Section = styled.div`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const SectionTitle = styled.h2`
  color: #ffffff;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  background: linear-gradient(90deg, #40e0d0 0%, #64ffda 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 20px rgba(64, 224, 208, 0.3);
  padding-left: 1rem;
  border-left: 4px solid #40e0d0;
`;

const TaskGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const TaskCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, 
      rgba(64, 224, 208, 0.1) 0%,
      rgba(0, 0, 0, 0) 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    
    &::before {
      opacity: 1;
    }
  }
`;

const TaskTitle = styled.h3`
  color: #ffffff;
  font-size: 1.3rem;
  margin-bottom: 1rem;
  background: linear-gradient(90deg, #40e0d0 0%, #64ffda 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const TaskDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const TaskDates = styled.div`
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  flex: 1;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, 
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }

  &:hover::after {
    transform: translateX(100%);
  }
`;

const CompleteButton = styled(Button)`
  background: linear-gradient(90deg, #40e0d0 0%, #64ffda 100%);
  color: #0a192f;
`;

const DeleteButton = styled(Button)`
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const TaskList = ({ tasks, onTaskUpdated }) => {
  const handleComplete = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/tasks/${taskId}`, 
        { complete: true },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Task marked as complete!');
      onTaskUpdated();
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const handleDelete = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Task deleted successfully!');
      onTaskUpdated();
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const incompleteTasks = tasks.filter(task => !task.complete);
  const completeTasks = tasks.filter(task => task.complete);

  return (
    <TaskListContainer>
      <Section>
        <SectionTitle>In Progress</SectionTitle>
        <TaskGrid>
          {incompleteTasks.map(task => (
            <TaskCard key={task._id}>
              <TaskTitle>{task.title}</TaskTitle>
              <TaskDescription>{task.description}</TaskDescription>
              <TaskDates>
                <div>Start: {new Date(task.date_debut).toLocaleDateString()}</div>
                <div>End: {new Date(task.date_fin).toLocaleDateString()}</div>
              </TaskDates>
              <ButtonGroup>
                <CompleteButton onClick={() => handleComplete(task._id)}>
                  Complete
                </CompleteButton>
                <DeleteButton onClick={() => handleDelete(task._id)}>
                  Delete
                </DeleteButton>
              </ButtonGroup>
            </TaskCard>
          ))}
        </TaskGrid>
      </Section>

      <Section>
        <SectionTitle>Completed</SectionTitle>
        <TaskGrid>
          {completeTasks.map(task => (
            <TaskCard key={task._id}>
              <TaskTitle>{task.title}</TaskTitle>
              <TaskDescription>{task.description}</TaskDescription>
              <TaskDates>
                <div>Start: {new Date(task.date_debut).toLocaleDateString()}</div>
                <div>End: {new Date(task.date_fin).toLocaleDateString()}</div>
              </TaskDates>
              <ButtonGroup>
                <DeleteButton onClick={() => handleDelete(task._id)}>
                  Delete
                </DeleteButton>
              </ButtonGroup>
            </TaskCard>
          ))}
        </TaskGrid>
      </Section>
    </TaskListContainer>
  );
};

export default TaskList; 