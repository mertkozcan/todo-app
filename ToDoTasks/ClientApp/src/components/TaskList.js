import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import EditTask from './EditTask';

const TaskList = (props) => {
    const [showEdit, setShowEdit] = useState(false);
    const [editTask, setEditTask] = useState({});

    useEffect(() => {

    }, [props.tasks,editTask]);

    const submitEdit = async (task) => {
        const rawResponse = await fetch('../api/todo/EditTask', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        });
        setShowEdit(false);
        props.getActiveTasks();
        props.getOverdueTasks();
    }

    const handleEdit = (task) => {
        setEditTask(task);
        setShowEdit(true);
    }

    return (
        <div className="TaskList">
            {showEdit && <EditTask onClose={() => setShowEdit(false)} show={showEdit} task={editTask} submitEdit={(task) => submitEdit(task)} />}
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Due Date</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {props.tasks.map(task =>
                        <tr key={task.taskId}>
                            <td>{task.title}</td>
                            <td>{task.dueDate ? task.dueDate.split("T")[0] : "-"}</td>
                            <td><button onClick={() => handleEdit(task)} className="button">Edit Task</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

TaskList.propTypes = {
    tasks: PropTypes.array,
    getActiveTasks: PropTypes.func,
    getOverdueTasks: PropTypes.func
};

export default TaskList;