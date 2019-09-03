import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { IChatAction } from '../@Interfaces/IChatAction';
import { IChatEvent } from '../@Interfaces/IChatEvent';
import { IChatMessage } from '../@Interfaces/IChatMessage';
import { IChatUser } from '../@Interfaces/IChatUser';

import { HttpService } from '../services/http/http.service';
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
export class ChatComponent implements OnInit, AfterViewInit, OnDestroy {
  status: string;
  container: HTMLElement;
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

  constructor(
    private socketService: SocketService,
    private http: HttpService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initModel();

    setTimeout(() => {
      this.openUserPopup(this.defaultDialogUserParams);
    }, 0);

    // this.messages =

    this.http.getChatMessages().subscribe(
      data => {
        this.messages = data.data;
      },
      err => {
        this.messages = [
          {
            from: {
              id: 9999,
              name: 'Server Error',
              avatar: `${AVATAR_URL}/9999`
            },
            content: 'Problem loading saved messages, server might be down',
            when: this.formatDateToString()
          }
        ];
      }
    );
  }

  ngAfterViewInit() {
    this.scrollDown();
  }

  ngOnDestroy() {
    this.dialog.closeAll();
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
        this.scrollDown();
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

  private scrollDown(): void {
    this.container = document.getElementById('msgContainer');
    setTimeout(() => {
      this.container.scrollTop = this.container.scrollHeight;
    }, 0);
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

    console.log(this.formatDateToString());
    this.socketService.send({
      from: this.user,
      content: message,
      when: this.formatDateToString()
    });

    // To prevent spamm
    this.messageContent = null;
  }

  public sendNotification(params: any, action: IChatAction): void {
    let message: IChatMessage;

    if (action === IChatAction.JOINED) {
      message = {
        from: this.user,
        action,
        when: this.formatDateToString()
      };
    } else if (action === IChatAction.RENAME) {
      message = {
        action,
        content: {
          username: this.user.name,
          previousUsername: params.previousUsername
        },
        when: this.formatDateToString()
      };
    }

    this.socketService.send(message);
  }

  public onSaveOrShow() {
    this.http.saveChatMessages(this.messages).subscribe(
      data => {
        this.status = 'Messages saved';
        console.log(data);
      },
      err => {
        this.status = 'Something went wrong';
        console.log(err);
      }
    );
  }

  public formatDateToString(date: Date = new Date()): string {
    const dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
    const MM = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
    const hh = (date.getHours() < 10 ? '0' : '') + date.getHours();
    const mm = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();

    return (`${MM}/${dd} kl: ${hh}:${mm}`);
 }
}
