import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import {Socket} from "socket.io";

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(
      private readonly chatService: ChatService
  ) {}


  afterInit(server: Socket) {
    console.log('Server initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log('Client connected ' + client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected ' + client.id);
  }

  @SubscribeMessage('createChat')
  create(@MessageBody() body:any) {
    console.log(body)
    return true
  }
}
