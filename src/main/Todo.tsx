import { useState } from 'react';
import {
  Box, Paper, Typography, List, ListItem,
  IconButton, Checkbox
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { SearchAndSort } from '../main/SearchAndSort';
import type { Task, TaskProps } from './ManagingTasks';

export interface TodoProps extends TaskProps {
  onEditTask: (task: Task) => void;
  use12Hour: boolean;
  showEmptyLists: boolean;
}

const formatTime = (timeStr: string, use12Hour: boolean) => {
  if (!timeStr) return '';
  if (!use12Hour) return timeStr;

  const parts = timeStr.split(':');
  if (parts.length < 2) return timeStr;

  let hours = parseInt(parts[0], 10);
  const minutes = parts[1];

  if (isNaN(hours)) return timeStr;

  const period = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;

  return `${hours}:${minutes} ${period}`;
};

export function Todo({ tasks, setTasks, onEditTask, use12Hour, showEmptyLists }: TodoProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'date') {
      const dateTimeA = `${a.dueDate} ${a.dueTime}`;
      const dateTimeB = `${b.dueDate} ${b.dueTime}`;
      return dateTimeA.localeCompare(dateTimeB);
    }
    return 0;
  });

  const inProgressTasks = sortedTasks.filter((t) => !t.completed);
  const completedTasks = sortedTasks.filter((t) => t.completed);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const renderTaskRow = (task: Task) => (
    <ListItem
      key={task.id}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 2,
        py: 1.5,
        bgcolor: task.completed ? '#eef7ed' : '#fff8ed',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        '&:last-child': { borderBottom: 'none' },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1, minWidth: 0 }}>
        <Checkbox
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
          size="small"
          color={task.completed ? "primary" : "default"}
        />
        <Typography
          noWrap
          sx={{
            textDecoration: task.completed ? 'line-through' : 'none',
            color: task.completed ? 'text.secondary' : 'text.primary',
            fontWeight: 500,
          }}
        >
          {task.name}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2, flexShrink: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
          <CalendarTodayIcon sx={{ fontSize: 16 }} />
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <Typography variant="caption" sx={{ lineHeight: 1.2 }}>
              {task.dueDate}
            </Typography>
            <Typography variant="caption" sx={{ lineHeight: 1.2, fontSize: '0.7rem' }}>
              {formatTime(task.dueTime, use12Hour)}
            </Typography>
          </Box>
        </Box>

        <IconButton size="small" color="primary" onClick={() => onEditTask(task)}>
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" color="error" onClick={() => deleteTask(task.id)}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>
    </ListItem>
  );

  return (
    <div className="flex flex-col w-full items-center">
      <SearchAndSort
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <Box sx={{ width: '100%', maxWidth: 800, p: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
        {showEmptyLists ? (
          <Paper elevation={1} sx={{ width: '100%', borderRadius: 1, overflow: 'hidden' }}>
            <List disablePadding>
              {sortedTasks.length > 0 ? (
                sortedTasks.map(renderTaskRow)
              ) : (
                <Typography sx={{ p: 3, textAlign: 'center', color: 'text.secondary' }}>
                  No tasks added. Click the + button to add a new task!
                </Typography>
              )}
            </List>
          </Paper>
        ) : (
          <>
            <Paper elevation={2} sx={{ width: '100%', borderRadius: 2, overflow: 'hidden' }}>
              <Box sx={{ bgcolor: '#ffa726', color: 'white', py: 1, textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Todo
                </Typography>
              </Box>
              <List disablePadding>
                {inProgressTasks.length > 0 ? (
                  inProgressTasks.map(renderTaskRow)
                ) : (
                  <Typography sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>
                    No active tasks!
                  </Typography>
                )}
              </List>
            </Paper>

            {completedTasks.length > 0 && (
              <Paper elevation={2} sx={{ width: '100%', borderRadius: 2, overflow: 'hidden' }}>
                <Box sx={{ bgcolor: '#66bb6a', color: 'white', py: 1, textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Completed
                  </Typography>
                </Box>
                <List disablePadding>
                  {completedTasks.map(renderTaskRow)}
                </List>
              </Paper>
            )}
          </>
        )}
      </Box>
    </div>
  );
}