import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import config from '../../../config.json';
import { MatSnackBar } from '@angular/material/snack-bar';

interface User {
  id: number;
  username: string;
  email: string;
  color: string;
  icon: string;
}

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  user = {
    name: '',
    email: '',
    password: ''
  };

  showToastErrorLoading = false;
  isAutoAdd = true;
  users: User[] = [];

  constructor(private snackBar: MatSnackBar) {
  }

  async ngOnInit() {
    await this.reloadAllUsers();
  }

  async reloadAllUsers() {
    try {
      const response = await axios.get(config['rest-api-user']);
      this.users = response.data;
    } catch (error) {
      this.showToastErrorLoading = true;
      this.showSnackBar("Error loading user");
      console.error(error);
    }
  }

  createUser = async (username: string, email: string, password: string): Promise<any> => {
    try {
      const response = await axios.post(config["rest-api-user"], {
        username: username,
        email: email,
        password: password
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  async deleteUser(userId: number) {
    try {
      const response = await axios.delete(config["rest-api-user"] + "/" + userId);
      console.log(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  // generateRandomUserData
  generateRandomUserData() {
    const firstNames = ['Max', 'Maria', 'Peter', 'Anna', 'John', 'Jane', 'David', 'Emma', 'Sophie', 'Luke'];
    const lastNames = ['Mustermann', 'Musterfrau', 'Parker', 'Smith', 'Doe', 'Brown', 'Garcia', 'Lee', 'Taylor'];
    const domains = ['gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com', 'aol.com', 'protonmail.com'];
    const passwordLength = 8;
    const id = 0;
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domains[Math.floor(Math.random() * domains.length)]}`;
    const password = Math.random().toString(36).substring(2, 2 + passwordLength);
    return {
      id,
      name: `${firstName} ${lastName}`,
      email,
      password,
    };
  }

  async onRandom() {
    console.log('Random button clicked');
    const randomUserData = this.generateRandomUserData();
    this.user.name = randomUserData.name;
    this.user.email = randomUserData.email;
    this.user.password = randomUserData.password;
    if (this.isAutoAdd) {
      await this.createUser(this.user.name, this.user.email, this.user.password);
      console.log('after createUser');
      await this.reloadAllUsers();
      console.log('after reloadAllUsers');
    }
  }

  async onAdd() {
    try {
      await this.createUser(this.user.name, this.user.email, this.user.password);
      console.log('after createUser');
      await this.reloadAllUsers();
      console.log('after reloadAllUsers');
    } catch (error) {
      console.error(error);
    }
  }

  onRefresh() {
    console.log('Refresh button clicked');
    this.reloadAllUsers();
  }

  onAutoAddChange(checked: boolean) {
    console.log('AutoAddChange checkbox changed to ' + this.isAutoAdd);
    this.isAutoAdd = checked;
  }

  async onDelete(deletedUserId: number) {
    console.log('Delete button clicked id=' + deletedUserId);
    await this.deleteUser(deletedUserId);
    await this.reloadAllUsers();
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, 'Dismiss', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center'
    });
  }
}
