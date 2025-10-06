import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Typography
} from '@mui/material';
import { Add, Edit } from '@mui/icons-material';
import { db } from '../firebase/config';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

const TaskForm = ({ open, onClose, editTask = null }) => {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    title: editTask?.title || '',
    description: editTask?.description || '',
    priority: editTask?.priority || 'medium',
    status: editTask?.status || 'todo',
    dueDate: editTask?.dueDate || '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const taskData = {
        ...formData,
        userId: currentUser.uid,
        createdAt: editTask ? editTask.createdAt : new Date(),
        updatedAt: new Date(),
      };

      if (editTask) {
        await updateDoc(doc(db, 'tasks', editTask.id), taskData);
      } else {
        await addDoc(collection(db, 'tasks'), taskData);
      }

      onClose();
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        status: 'todo',
        dueDate: '',
      });
    } catch (error) {
      console.error('Error saving task:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {editTask ? <Edit /> : <Add />}
          <Typography variant="h6">
            {editTask ? 'Edit Task' : 'Create New Task'}
          </Typography>
        </Box>
      </DialogTitle>
      
      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ pt: 1 }}>
          <TextField
            autoFocus
            name="title"
            label="Task Title"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.title}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          
          <TextField
            name="description"
            label="Description"
            multiline
            rows={3}
            fullWidth
            variant="outlined"
            value={formData.description}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                name="priority"
                value={formData.priority}
                label="Priority"
                onChange={handleChange}
              >
                <MenuItem value="low">
                  <Chip label="Low" size="small" color="success" />
                </MenuItem>
                <MenuItem value="medium">
                  <Chip label="Medium" size="small" color="warning" />
                </MenuItem>
                <MenuItem value="high">
                  <Chip label="High" size="small" color="error" />
                </MenuItem>
              </Select>
            </FormControl>
            
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={formData.status}
                label="Status"
                onChange={handleChange}
              >
                <MenuItem value="todo">To Do</MenuItem>
                <MenuItem value="inProgress">In Progress</MenuItem>
                <MenuItem value="done">Done</MenuItem>
              </Select>
            </FormControl>
          </Box>
          
          <TextField
            name="dueDate"
            label="Due Date"
            type="date"
            fullWidth
            variant="outlined"
            value={formData.dueDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            disabled={loading}
            startIcon={editTask ? <Edit /> : <Add />}
          >
            {editTask ? 'Update Task' : 'Create Task'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TaskForm;