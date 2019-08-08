import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Observer } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IMessage } from '../../@Interfaces/IMessage';
import * as socketIO from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private SERVER_URL: string = environment.backend_url;
  private socket: any;

  constructor() { }

  public initSocket(): void {
    this.socket = socketIO(this.SERVER_URL);
  }

  public send(message: IMessage): void {
    console.log(message);
    this.socket.emit('message', message);
  }

  public onMessage(): Observable<IMessage> {
    return new Observable<IMessage>(observer => {
      this.socket.on('message', (data: IMessage) => observer.next(data));
    });
  }
}
