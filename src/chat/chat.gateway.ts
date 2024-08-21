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
import {Socket, Server} from "socket.io";
import {Inject} from "@nestjs/common";
import {CACHE_MANAGER} from "@nestjs/cache-manager";
import {Cache} from "cache-manager";
import {OnEvent} from "@nestjs/event-emitter";

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private server: Server;
  private intervalId: NodeJS.Timeout;
  private client;
  constructor(
      @Inject(CACHE_MANAGER) private cacheManager: Cache,
      private readonly chatService: ChatService
  ) {}


  afterInit(server: Server) {
    this.server = server;
    console.log('Server initialized');
    // this.intervalId = setInterval(() => this.sendAllCachedData(this.client), 1000);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.client = client
    console.log('Client connected ' + client.id);
    // this.sendAllCachedData(client);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected ' + client.id);
  }

  @SubscribeMessage('createChat')
  create(@MessageBody() body:any) {
    console.log(body)
    return true
  }

  @OnEvent('message.create')
  handleMessageCreateEvent(payload: any) {
    const { message, roomChat } = payload
    message.roomChat = roomChat
    this.server.to(`nest_talk_room_${roomChat.id}`).emit('message.new', message);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, roomId: string) {
    client.join(`nest_talk_room_${roomId}`);
    console.log(`Client ${client.id} joined room ID: ${roomId}`);
  }
  // private async sendAllCachedData(client: Socket) {
  //   try {
  //     const cacheKeys = await this.cacheManager.store.keys();
  //     const cacheData = await Promise.all(
  //         cacheKeys.map(async (key) => ({
  //           key,
  //           value: await this.cacheManager.get(key),
  //         }))
  //     );
  //     client.emit('allCachedData', cacheData);
  //   } catch (error) {
  //     console.error('Failed to fetch and send all cached data:', error);
  //   }
  // }
}
