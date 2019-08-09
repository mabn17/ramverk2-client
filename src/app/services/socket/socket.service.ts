
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Observer } from 'rxjs';

import { IChatMessage } from '../../@Interfaces/IChatMessage';
import { IChatEvent } from '../../@Interfaces/IChatEvent';

import { environment } from '../../../environments/environment';
import * as socketIo from 'socket.io-client';


@Injectable()
export class SocketService {
    private socket;
    private SERVER_URL = environment.backend_url || 'http://localhost:8081';

    public initSocket(): void {
        this.socket = socketIo(this.SERVER_URL);
    }

    public send(message: IChatMessage): void {
        this.socket.emit('message', message);
    }

    public onMessage(): Observable<IChatMessage> {
        return new Observable<IChatMessage>(observer => {
            this.socket.on('message', (data: IChatMessage) => observer.next(data));
        });
    }

    public onEvent(event: IChatEvent): Observable<any> {
        return new Observable<IChatEvent>(observer => {
            this.socket.on(event, () => observer.next());
        });
    }
}
