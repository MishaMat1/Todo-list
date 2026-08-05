import { useState, useEffect } from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from '@mui/material';

export interface Task {
  id: string;
  name: string;
  dueDate: string;
  dueTime: string;
  completed: boolean;
}

export interface TaskProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export interface ManagingTasksProps {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  taskToEdit?: Task | null;
  onCloseEdit?: () => void;
}

export function ManagingTasks({ setTasks, taskToEdit, onCloseEdit }: ManagingTasksProps) {
  const [taskName, setTaskName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');

  const [isAddOpen, setIsAddOpen] = useState(false);

  useEffect(() => {
    if (taskToEdit) {
      setTaskName(taskToEdit.name);
      setDueDate(taskToEdit.dueDate);
      setDueTime(taskToEdit.dueTime);
    } else {
      setTaskName('');
      setDueDate('');
      setDueTime('');
    }
  }, [taskToEdit]);

  const handleClose = () => {
    setIsAddOpen(false);
    setTaskName('');
    setDueDate('');
    setDueTime('');
    if (onCloseEdit) onCloseEdit();
  };

  const handleSave = () => {
    if (!taskName.trim() || !dueDate || !dueTime) return;

    if (taskToEdit) {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === taskToEdit.id
            ? { ...t, name: taskName, dueDate, dueTime }
            : t
        )
      );
    } else {
      const newTask: Task = {
        id: crypto.randomUUID(),
        name: taskName,
        dueDate,
        dueTime,
        completed: false,
      };

      setTasks((prev) => [...prev, newTask]);
    }

    handleClose();
  };

  const isOpen = isAddOpen || Boolean(taskToEdit);

  return (
    <>
      {!taskToEdit && (
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => setIsAddOpen(true)}
          sx={{
            position: 'fixed',
            bottom: {
              xs: 90,
              md: 20,
            },
            left: {
              xs: '45%',
              md: '50%',
            },
            transform: {
              xds: 'translateX(-40%)',
              md: 'translateX(200%)',
            },
            zIndex: 1000,
          }}
        >
          <AddIcon />
        </Fab>
      )}

      <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          {taskToEdit ? 'Edit Task' : 'Add New Task'}
        </DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Task name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            type="text"
            fullWidth
            variant="outlined"
          />

          <TextField
            type="date"
            margin="dense"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            fullWidth
            required
          />

          <TextField
            type="time"
            margin="dense"
            value={dueTime}
            onChange={(e) => setDueTime(e.target.value)}
            fullWidth
            required
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>

          <Button onClick={handleSave} variant="contained" color="primary">
            {taskToEdit ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}