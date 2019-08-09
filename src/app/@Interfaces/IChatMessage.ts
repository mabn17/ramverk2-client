import { IChatUser } from './IChatUser';
import { IChatAction } from './IChatAction';

export interface IChatMessage {
    from?: IChatUser;
    content?: any;
    action?: IChatAction;
}
