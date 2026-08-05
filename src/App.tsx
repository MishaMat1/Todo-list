import { useState } from 'react';
import './App.css';
import { Settings } from './main/Settings';
import { Todo } from './main/Todo';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { ManagingTasks, type Task } from './main/ManagingTasks';
import useTasks from './main/useTasks';

function App() {
  const [tab, setTab] = useState<"todo" | "settings">("todo");
  const { tasks, setTasks } = useTasks();

  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [use12Hour, setUse12Hour] = useState(false);
  const [showEmptyLists, setShowEmptyLists] = useState(false);

  return (
    <div className="h-screen w-full bg-white flex flex-col overflow-hidden">

      <header className="h-15 shrink-0 w-full bg-[#4787B8] text-white flex items-center justify-center text-2xl font-semibold shadow-md">
        Awesome Todo
      </header>

      <div className="flex flex-1 min-h-0">

        <aside className="hidden md:flex w-75 shrink-0 h-full bg-[#4787B8] text-white flex-col">

          <div className="px-5 pt-5 pb-4 text-lg text-blue-100">
            Navigation
          </div>

          <nav className="flex flex-col">

            <button
              onClick={() => setTab("todo")}
              className={`flex items-center gap-10 px-5 py-4 text-left transition-colors ${
                tab === "todo"
                  ? "bg-[#3d7eae]"
                  : "hover:bg-[#3d7eae]"
              }`}
            >
              <FormatListBulletedIcon />
              <span className="text-lg">Todo</span>
            </button>

            <button
              onClick={() => setTab("settings")}
              className={`flex items-center gap-10 px-5 py-4 text-left transition-colors ${
                tab === "settings"
                  ? "bg-[#3d7eae]"
                  : "hover:bg-[#3d7eae]"
              }`}
            >
              <SettingsIcon />
              <span className="text-lg">Settings</span>
            </button>

          </nav>
        </aside>

        <main className="flex-1 min-w-0 min-h-0 overflow-auto bg-white p-5">
          {tab === "todo" ? (
            <Todo
              tasks={tasks}
              setTasks={setTasks}
              onEditTask={(task) => setEditingTask(task)}
              use12Hour={use12Hour}
              showEmptyLists={showEmptyLists}
            />
          ) : (
            <Settings
              use12Hour={use12Hour}
              setUse12Hour={setUse12Hour}
              showEmptyLists={showEmptyLists}
              setShowEmptyLists={setShowEmptyLists}
            />
          )}
        </main>
      </div>

      {tab === "todo" && (
        <ManagingTasks
          setTasks={setTasks}
          taskToEdit={editingTask}
          onCloseEdit={() => setEditingTask(null)}
        />
      )}

      <footer className="md:hidden flex justify-around text-white p-2.5 bg-[#4787B8] shrink-0">
        <button
          className="flex flex-col items-center"
          onClick={() => setTab("todo")}
        >
          <MenuIcon />
          <span className="text-sm">Todo</span>
        </button>

        <button
          className="flex flex-col items-center"
          onClick={() => setTab("settings")}
        >
          <SettingsIcon />
          <span className="text-sm">Settings</span>
        </button>
      </footer>

    </div>
  );
}

export default App;