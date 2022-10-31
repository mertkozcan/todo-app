using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using ToDoTasks.Models;

namespace ToDoTasks.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class ToDoController : ControllerBase
    {
        private readonly ApiContext _dbContext;
        public ToDoController(ApiContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet(Name = "GetActiveTasks")]
        public IEnumerable<ToDoTask> GetActiveTasks()
        {
            List<ToDoTask> tasks = _dbContext.GetActiveTasks();
            return tasks;
        }

        [HttpGet(Name = "GetOverdueTasks")]
        public IEnumerable<ToDoTask> GetOverdueTasks()
        {
            List<ToDoTask> tasks = _dbContext.GetOverdueTasks();
            return tasks;
        }

        [HttpPost]
        public IActionResult AddTask(ToDoTask task)
        {
            _dbContext.AddTask(task);
            _dbContext.SaveChanges();
            return Ok("Task Added");
        }

        [HttpPost]
        public IActionResult EditTask(ToDoTask task)
        {
            _dbContext.EditTask(task);
            _dbContext.SaveChanges();
            return Ok("Task Edited");
        }
    }
}
