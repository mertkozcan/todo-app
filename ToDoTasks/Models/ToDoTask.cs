using System;
using System.ComponentModel.DataAnnotations;

namespace ToDoTasks.Models
{
    public class ToDoTask
    {
        [Key]
        public int TaskId { get; set; }
        public string Title { get; set; }
        public DateTime? DueDate { get; set; }
        public bool Completed { get; set; }
    }
}
