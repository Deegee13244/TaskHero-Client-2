import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userTask } from '../../services/userTasks.service';
import { IUserTasks } from '../../interfaces/usertasks.interface';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {

  constructor(private authService: AuthService,private TaskService: userTask, private router: Router) { }

  //array for all the users tasks 
  tasks: IUserTasks[] = [];

  //the different variables to make up the task interface. 
  currentUser: number = 0;
  description: string = "";
  timeStamp: string = "";
  title: string = "";
  dueDate: string = "";
  importance: number = 0;
  weight: number = 0;
  urgency: number = 0;

  addTask() { 
    const tempTask: IUserTasks = { 
      TaskId: 0, 
      UserId: 0, 
      Description: this.description, 
      TimeStamp: this.timeStamp, 
      Title: this.title, 
      DueDate: this.dueDate, 
      Importance: this.importance, 
      Weight: this.weight, 
      Urgency: this.urgency
    }

    this.TaskService.addTask(this.currentUser, tempTask)
      .subscribe((addedTask: IUserTasks) => { 
        console.log('Task added: ', addedTask); 
        this.getUserTasks(); 
      })
  }

  getUserTasks(){ 
    this.TaskService.getUserTasks(this.currentUser)
      .subscribe(tasks => { 
        this.tasks = tasks; 
      })
  }

  ngOnInit() { 
    if(this.authService.getLoggedInUserId != null){
      this.currentUser = Number(this.authService.getLoggedInUserId());
    }

  }
}
