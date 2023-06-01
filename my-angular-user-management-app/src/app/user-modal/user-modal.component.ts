import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import axios from 'axios';
import config from '../../../config.json';

@Component({
  selector: 'app-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})

export class UserModalComponent implements OnInit {
  Headline: string = "Update User Data";
  InputUser: string = "";
  InputEmail: string = "";
  InputPassword: string = "";

  constructor(
    public dialogRef: MatDialogRef<UserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.Headline = this.data.headline;
  }

  updateUser = async (id: number, username: string, email: string, password: string) => {
    try {
      const response = await axios.put(`${config["rest-api-user"]}/${id}`, {
        username: username,
        email: email,
        password: password
      });
      console.log(response.data); // The response from the server is output here
      return response.data;       // Here the response from the server is returned
    } catch (error) {
      console.error(error);       // An error is returned here if the request fails
      throw error;                // This is where the error is propagated
    }
  }

  actionFunctionSubmit() {
    console.log("actionFunctionSubmit() called");

    console.log("Id: " + this.data.userId);
    console.log("InputUser: " + this.InputUser);
    console.log("InputEmail: " + this.InputEmail);
    console.log("InputPassword: " + this.InputPassword);
    this.updateUser(this.data.userId, this.InputUser, this.InputEmail, this.InputPassword);
    this.dialogRef.close('refresh'); // Set the dialog result to "refresh" and close the dialog
  }

  // If the user clicks the cancel button, just close the modal
  cancelModal() {
    this.dialogRef.close();
  }
}
