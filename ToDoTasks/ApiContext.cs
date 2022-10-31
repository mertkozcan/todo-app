using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using ToDoTasks.Models;
using Microsoft.EntityFrameworkCore.Storage;

namespace ToDoTasks
{
    public class ApiContext : DbContext
    {
        public DbSet<ToDoTask> Tasks { get; set; }

        public ApiContext(DbContextOptions options) : base(options)
        {
        }

        public List<ToDoTask> GetActiveTasks()
        {
            var tasksWithNoDueDate = Tasks.Where(t => !t.Completed && !t.DueDate.HasValue).ToList();
            var tasks = Tasks.Where(t => !t.Completed && DateTime.Compare(DateTime.Now, t.DueDate.GetValueOrDefault()) <= 0).ToList();
            tasks.AddRange(tasksWithNoDueDate);
            return tasks;


        }

        public List<ToDoTask> GetOverdueTasks()
        {
            var tasks = Tasks.Where(t => !t.Completed && t.DueDate.HasValue && DateTime.Compare(DateTime.Now, t.DueDate.GetValueOrDefault()) == 1);
            return tasks.OrderByDescending(t => t.DueDate).ToList();
        }

        public void AddTask(ToDoTask task)
        {
            Tasks.Add(task);
        }

        public void EditTask(ToDoTask task)
        {
            Tasks.Where(t => t.TaskId == task.TaskId).FirstOrDefault().Title = task.Title;
            Tasks.Where(t => t.TaskId == task.TaskId).FirstOrDefault().DueDate = task.DueDate;
            Tasks.Where(t => t.TaskId == task.TaskId).FirstOrDefault().Completed = task.Completed;
        }
    }
}
