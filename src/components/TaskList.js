import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Grid,
  CircularProgress,
  Alert,
} from '@mui/material';
import { db } from '../firebase/config';
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  orderBy 
} from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import TaskCard from './TaskCard';

const TaskList = ({ onEdit }) => {
  const { currentUser } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (!currentUser) return;

    setLoading(true);
    const q = query(
      collection(db, 'tasks'),
      where('userId', '==', currentUser.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, 
      (querySnapshot) => {
        const tasksData = [];
        querySnapshot.forEach((doc) => {
          tasksData.push({ id: doc.id, ...doc.data() });
        });
        setTasks(tasksData);
        setLoading(false);
        setError('');
      },
      (error) => {
        console.error('Error fetching tasks:', error);
        setError('Failed to load tasks');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const getTaskCount = (status) => {
    return tasks.filter(task => status === 'all' ? true : task.status === status).length;
  };

  const tabStyles = {
    textTransform: 'none',
    fontWeight: 600,
    minWidth: 'auto',
    px: 2,
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={filter} 
          onChange={(e, newValue) => setFilter(newValue)}
          sx={{
            '& .MuiTabs-indicator': {
              height: 3,
              borderRadius: 3,
            }
          }}
        >
          <Tab 
            label={`All (${getTaskCount('all')})`} 
            value="all" 
            sx={tabStyles}
          />
          <Tab 
            label={`To Do (${getTaskCount('todo')})`} 
            value="todo" 
            sx={tabStyles}
          />
          <Tab 
            label={`In Progress (${getTaskCount('inProgress')})`} 
            value="inProgress" 
            sx={tabStyles}
          />
          <Tab 
            label={`Done (${getTaskCount('done')})`} 
            value="done" 
            sx={tabStyles}
          />
        </Tabs>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {filteredTasks.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No tasks found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {filter === 'all' 
              ? 'Create your first task to get started!' 
              : `No tasks with status "${filter}"`}
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {filteredTasks.map((task) => (
            <Grid item xs={12} sm={6} md={4} key={task.id}>
              <TaskCard task={task} onEdit={onEdit} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default TaskList;