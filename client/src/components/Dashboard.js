import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import { toast } from 'react-toastify';

const DashboardContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 4rem;
  margin-bottom: 3rem;
  background: linear-gradient(45deg, #ff6b35, #ff9f1c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 30px rgba(255, 107, 53, 0.5);
  letter-spacing: 2px;
  font-weight: 800;
  position: relative;
  text-align: center;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: 4px;
    background: linear-gradient(90deg, #ff6b35, #ff9f1c);
    border-radius: 2px;
    box-shadow: 0 0 20px rgba(255, 107, 53, 0.5);
  }
`;

const LogoutButton = styled.button`
  padding: 0.8rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 2rem;
  min-height: 600px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

const FormSection = styled.div`
  height: fit-content;
  position: sticky;
  top: 2rem;
`;

const TasksSection = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    fetchTasks();
  }, [navigate]);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Failed to fetch tasks');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <DashboardContainer>
      <Header>
        <Title>To Scooby-Do</Title>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </Header>
      <Content>
        <FormSection>
          <TaskForm onTaskAdded={fetchTasks} />
        </FormSection>
        <TasksSection>
          <TaskList tasks={tasks} onTaskUpdated={fetchTasks} />
        </TasksSection>
      </Content>
    </DashboardContainer>
  );
};

export default Dashboard; 