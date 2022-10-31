import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import "./NewTask.css";

const NewTask = (props) => {
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDueDate, setTaskDueDate] = useState(null);

    useEffect(() => {
        setTaskTitle("");
        setTaskDueDate(null);
    }, []);

    const handleSubmit = () => {

        props.submitTask({ Title: taskTitle, DueDate: taskDueDate });

        setTaskTitle("");
        setTaskDueDate(null);
    }

    return (
        <div className={`modal ${props.show ? ' show' : ''}`} onClick={props.onClose}>
b            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h4 className="modal-title">Add New Task</h4>
                </div>
                <div className="modal-body">
                    <div>
                        <label for="task-title">Title: </label>
                        <input type="text" className="task-title" id="task-title" defaultValue="" onChange={(event) => setTaskTitle(event.target.value)} />
                    </div>
                    <div>
                        <label for="task-due-date">Due Date: </label>
                        <input type="date" className="task-due-date" id="task-due-date" defaultValue={null} onChange={(event) => setTaskDueDate(event.target.value)} />
                    </div>
                </div>
                <div className="modal-footer">
                    <button onClick={() => handleSubmit()} className="button">
                        Add Task
                    </button>
                    <button onClick={props.onClose} className="button">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

NewTask.propTypes = {
    onClose: PropTypes.func,
    show: PropTypes.bool,
    submitTask: PropTypes.func,
};

export default NewTask;