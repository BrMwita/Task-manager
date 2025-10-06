import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Fab,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleCreateTask = () => {
    setEditingTask(null);
    setFormOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setEditingTask(null);
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      <Header />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                My Tasks
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Welcome back, {currentUser?.email}
              </Typography>
            </Box>
            
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleCreateTask}
              sx={{ display: { xs: 'none', sm: 'flex' } }}
            >
              New Task
            </Button>
          </Box>
        </Box>

        <TaskList onEdit={handleEditTask} />

        <Fab
          color="primary"
          aria-label="add task"
          onClick={handleCreateTask}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            display: { xs: 'flex', sm: 'none' },
          }}
        >
          <Add />
        </Fab>

        <TaskForm
          open={formOpen}
          onClose={handleCloseForm}
          editTask={editingTask}
        />
      </Container>
    </Box>
  );
};

export default Dashboard;