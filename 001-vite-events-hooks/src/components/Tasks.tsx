import { useState } from "react";
import { Button } from "./Button";

export const Tasks = () => {
  const [tasks, setTasks] = useState<{ label: string; done: boolean }[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleAddTask = () => {
    if (inputValue === "") return;

    setTasks([...tasks, { label: inputValue, done: false }]);
    setInputValue("");
  };

  const handleDelTask = (key: number) => {
    setTasks(tasks.filter((_value, index) => index !== key));
  };

  const handleToggleDone = (key: number) => {
    const newTasks = [...tasks];
    newTasks[key].done = !newTasks[key].done;

    setTasks(newTasks);
  };

  const renderListItems = (taskList: typeof tasks) => {
    return (
      <ul>
        {taskList.map((task, key) => (
          <>
            <li>
              <input
                type="checkbox"
                checked={tasks[key].done}
                onChange={() => handleToggleDone(key)}
              />
              {task.label}{" "}
              <button onClick={() => handleDelTask(key)}>Delete</button>
            </li>
          </>
        ))}
      </ul>
    );
  };

  return (
    <>
      <h2>My task list</h2>

      {renderListItems(tasks)}

      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      <Button onClick={handleAddTask}>Add</Button>
    </>
  );
};
