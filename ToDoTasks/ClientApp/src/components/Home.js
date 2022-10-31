import { React, useState, useEffect } from 'react';
import NewTask from './NewTask';
import TaskList from './TaskList';

function Home() {
    const [activeTasks, setActiveTasks] = useState([]);
    const [overdueTasks, setOverdueTasks] = useState([]);
    const [show, setShow] = useState(false);

    useEffect(() => {
        getActiveTasks();
        getOverdueTasks();
    }, []);

    const getActiveTasks = async () => {
        const response = await fetch('../api/todo/GetActiveTasks');
        const data = await response.json();
        setActiveTasks(data);
    }

    const getOverdueTasks = async () => {
        const response = await fetch('../api/todo/GetOverdueTasks');
        const data = await response.json();
        setOverdueTasks(data);
    }

    const submitTask = async (task) => {
        const rawResponse = await fetch('../api/todo/AddTask', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        });
        setShow(false);
        getActiveTasks();
        getOverdueTasks();
    }

 return (
     <div>
         <button onClick={() => setShow(true)}>New Task</button>
         {show && <NewTask onClose={() => setShow(false)} show={show} submitTask={(task) => submitTask(task)} />}
         <h4>Pending Tasks</h4>
         <TaskList tasks={activeTasks} getActiveTasks={getActiveTasks} getOverdueTasks={getOverdueTasks} />
         <h4>Overdue Tasks</h4>
         <TaskList tasks={overdueTasks} getActiveTasks={getActiveTasks} getOverdueTasks={getOverdueTasks} />
      </div>
    );
}
export default Home;