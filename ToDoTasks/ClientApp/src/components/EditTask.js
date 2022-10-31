import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import "./EditTask.css";

const EditTask = (props) => {
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDueDate, setTaskDueDate] = useState(null);
    const [taskCompleted, setTaskCompleted] = useState(false);

    useEffect(() => {
        setTaskTitle(props.task.title);
        setTaskDueDate(props.task.dueDate ? props.task.dueDate.split("T")[0] : null);
    }, [props.show]);

    const handleSubmit = () => {

        props.submitEdit({ TaskId: props.task.taskId, Title: taskTitle, DueDate: taskDueDate, Completed: taskCompleted });

        setTaskTitle("");
        setTaskDueDate(null);
    }

    return (
        <div className={`modal-edit ${props.show ? ' show' : ''}`} onClick={props.onClose}>
            b            <div className="modal-edit-content" onClick={e => e.stopPropagation()}>
                <div className="modal-edit-header">
                    <h4 className="modal-edit-title">Edit Task</h4>
                </div>
                <div className="modal-edit-body">
                    <div>
                        <label for="task-edit-title">Title: </label>
                        <input type="text" className="edit-task-title" id="task-edit-title" value={taskTitle} onChange={(event) => { setTaskTitle(event.target.value) }} />
                    </div>
                    <div>
                        <label for="task-edit-due-date">Due Date: </label>
                        <input type="date" className="edit-task-due-date" id="task-edit-due-date" value={taskDueDate} onChange={(event) => { setTaskDueDate(event.target.value) }} />
                    </div>
                    <div>                     
                        <input type="checkbox" id="task-completed" value={taskCompleted} onChange={(event) => { setTaskCompleted(event.target.checked) }} />
                        <label for="task-completed" className="edit-task-completed-label">Completed</label>
                    </div>
                </div>
                <div className="modal-edit-footer">
                    <button onClick={() => handleSubmit()} className="button">
                        Save
                    </button>
                    <button onClick={props.onClose} className="button">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

EditTask.propTypes = {
    onClose: PropTypes.func,
    show: PropTypes.bool,
    submitEdit: PropTypes.func,
    task: PropTypes.object
};

export default EditTask;