import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  messages: Array<any> = [];
  messageContent?: string;
  ioConnection: any;

  constructor(private socketService: SocketService) { }

  ngOnInit() {
    this.initIoConnection();
  }

  private initIoConnection(): void {
    this.socketService.initSocket();

    this.ioConnection = this.socketService.onMessage()
      .subscribe((message) => {
        this.messages.push(message);
        console.log(message);
      });
  }

  public sendMessage(message: string): void {
    if (!message) {
      return;
    }

    this.socketService.send({
      from: 'Test snubben!',
      room: null,
      data: message
    });

    this.messageContent = null;
  }
}
