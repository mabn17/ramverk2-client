import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { IChatAction } from '../@Interfaces/IChatAction';
import { IChatEvent } from '../@Interfaces/IChatEvent';
import { IChatMessage } from '../@Interfaces/IChatMessage';
import { IChatUser } from '../@Interfaces/IChatUser';

import { SocketService } from '../services/socket/socket.service';
import { DialogUserComponent } from './dialog-user/dialog-user.component';
import { DialogUserType } from './dialog-user/dialog-user-type';


const AVATAR_URL = 'https://api.adorable.io/avatars/285';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'tcc-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  action = IChatAction;
  user: IChatUser;
  messages: IChatMessage[] = [];
  messageContent: string;
  ioConnection: any;
  dialogRef: MatDialogRef<DialogUserComponent> | null;
  defaultDialogUserParams: any = {
    disableClose: true,
    data: {
      title: 'Välkommen',
      dialogType: DialogUserType.NEW
    }
  };

  constructor(private socketService: SocketService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.initModel();

    // https://github.com/angular/angular/issues/14748
    setTimeout(() => {
      this.openUserPopup(this.defaultDialogUserParams);
    }, 0);
  }

  private initModel(): void {
    const randomId = this.getRandomId();
    this.user = {
      id: randomId,
      avatar: `${AVATAR_URL}/${randomId}.png`
    };
  }

  private initIoConnection(): void {
    this.socketService.initSocket();

    this.ioConnection = this.socketService.onMessage()
      .subscribe((message: IChatMessage) => {
        this.messages.push(message);
      });


    this.socketService.onEvent(IChatEvent.CONNECT)
      .subscribe(() => {
        console.log('connected');
      });

    this.socketService.onEvent(IChatEvent.DISCONNECT)
      .subscribe(() => {
        console.log('disconnected');
      });
  }

  private getRandomId(): number {
    return Math.floor(Math.random() * (1000000)) + 1;
  }

  public onClickUserInfo() {
    this.openUserPopup({
      data: {
        username: this.user.name,
        title: 'Ändra namn',
        dialogType: DialogUserType.EDIT
      }
    });
  }

  private openUserPopup(params): void {
    this.dialogRef = this.dialog.open(DialogUserComponent, params);
    this.dialogRef.afterClosed().subscribe(paramsDialog => {
      if (!paramsDialog) {
        return;
      }

      this.user.name = paramsDialog.username;
      if (paramsDialog.dialogType === DialogUserType.NEW) {
        this.initIoConnection();
        this.sendNotification(paramsDialog, IChatAction.JOINED);
      } else if (paramsDialog.dialogType === DialogUserType.EDIT) {
        this.sendNotification(paramsDialog, IChatAction.RENAME);
      }
    });
  }

  public sendMessage(message: string): void {
    if (!message) {
      return;
    }

    this.socketService.send({
      from: this.user,
      content: message
    });

    // To prevent spamm
    this.messageContent = null;
  }

  public sendNotification(params: any, action: IChatAction): void {
    let message: IChatMessage;

    if (action === IChatAction.JOINED) {
      message = {
        from: this.user,
        action
      };
    } else if (action === IChatAction.RENAME) {
      message = {
        action,
        content: {
          username: this.user.name,
          previousUsername: params.previousUsername
        }
      };
    }

    this.socketService.send(message);
  }
}
