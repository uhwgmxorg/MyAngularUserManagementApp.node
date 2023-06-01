import { Component } from '@angular/core';
import axios from 'axios';
import config from '../../../config.json';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserModalComponent } from '../user-modal/user-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';

interface User {
  id: number;
  username: string;
  email: string;
  color: string;
  icon: string;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})

export class UserListComponent {

  showToastErrorLoading = false;
  users: User[] = [];

  constructor(public matDialog: MatDialog, private snackBar: MatSnackBar) {
    this.handleRefresh();
  }

  async reloadAllUsers() {
    try {
      const response = await axios.get(config['rest-api-user']);
      this.users = response.data;
    } catch (error) {
      this.showErrorLoadingMessage();
      console.error(error);
    }
  }

  async deleteUser(userId: number) {
    try {
      const response = await axios.delete(config["rest-api-user"] + "/" + userId);
      console.log(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  handleRefresh() {
    this.reloadAllUsers();
    console.log('Refresh button clicked');
  }

  handleUserDeleted(deletedUserId: number) {
    this.users = this.users.filter(user => user.id !== deletedUserId);
    this.deleteUser(deletedUserId);
  }

  openModal(user: User) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    dialogConfig.data = {
      headline: "Update User Data",
      userId: user.id
    };
    console.log("openModal() called id=#" + user.id);
    const modalDialog = this.matDialog.open(UserModalComponent, dialogConfig);

    modalDialog.afterClosed().subscribe(result => {
      console.log('Modal closed with result:', result);
      if (result === 'refresh') {
        console.log('Refreshing list...');
        this.handleRefresh(); // refresh list
      }
    });
  }

  showErrorLoadingMessage() {
    this.snackBar.open('Error loading user', 'Dismiss', {
      duration: 3000,
      panelClass: 'error-snackbar' // Optional: You can specify a custom CSS class for the snack bar
    });
  }
}
