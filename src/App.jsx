import { useState } from "react";
import "./App.css";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [hideCompleted, setHideCompleted] = useState(false);

  // Check if ALL tasks are completed (and there is at least one task)
  const allCompleted = tasks.length > 0 && tasks.every((t) => t.completed);

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([
      ...tasks,
      { id: Date.now(), text: newTask.trim(), completed: false },
    ]);
    setNewTask("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  // Toggle: if all completed -> unmark all; otherwise -> mark all complete
  const handleMarkAll = () => {
    if (allCompleted) {
      setTasks(tasks.map((task) => ({ ...task, completed: false })));
    } else {
      setTasks(tasks.map((task) => ({ ...task, completed: true })));
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.text
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesVisibility = hideCompleted ? !task.completed : true;
    return matchesSearch && matchesVisibility;
  });

  return (
    <div className="app-container" dir="rtl">
      <div className="app-box">
        <h1 className="title">📝 قائمة المهام</h1>

        {/* Add Task */}
        <div className="add-row">
          <input
            type="text"
            className="input-field"
            placeholder="أضف مهمة جديدة"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />
          <button className="btn-add" onClick={addTask}>
            إضافة
          </button>
        </div>

        {/* Search */}
        <input
          type="text"
          className="search-field"
          placeholder="ابحث عن مهمة"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Hide Completed */}
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={hideCompleted}
            onChange={(e) => setHideCompleted(e.target.checked)}
          />
          إخفاء المهام المكتملة
        </label>

        {/* Delete Completed */}
        <button className="btn-action" onClick={deleteCompleted}>
          حذف المهام المكتملة
        </button>

        {/* Toggle Mark All Complete / Remove All Complete */}
        <button className="btn-action" onClick={handleMarkAll}>
          {allCompleted ? "إزالة الإكمال عن الكل" : "تحديد الكل كمكتمل"}
        </button>

        {/* Task List */}
        <div className="task-list">
          {filteredTasks.map((task) => (
            <div className="task-item" key={task.id}>
              <span className={`task-text ${task.completed ? "completed" : ""}`}>
                {task.text}
              </span>
              <div className="task-buttons">
                <button className="btn-toggle" onClick={() => toggleTask(task.id)}>
                  {task.completed ? "إلغاء الإكمال" : "تم"}
                </button>
                <button
                  className={`btn-delete ${task.completed ? "soft" : ""}`}
                  onClick={() => deleteTask(task.id)}
                >
                  حذف
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <p className="empty-message">لا توجد مهام</p>
        )}
      </div>
    </div>
  );
}