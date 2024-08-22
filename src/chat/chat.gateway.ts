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
import {JwtService} from "@nestjs/jwt";

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
      private readonly chatService: ChatService,
      private jwtService: JwtService
  ) {}


  afterInit(server: Server) {
    this.server = server;
    console.log('Server initialized');
    // this.intervalId = setInterval(() => this.sendAllCachedData(this.client), 1000);
  }

  async handleConnection(client: Socket, ...args: any[]) {
    this.client = client
    const token = client.handshake.query.token as string;
    if(token !== 'null' &&  token!== undefined){
      const payload = await this.jwtService.verifyAsync(token);
      const userId = payload.sub
      await this.cacheManager.set(`nest_base_client_${userId}`, client.id, 0);
      console.log(`User connected: ${userId} with socket ID: ${client.id}`);
    }else{
      client.disconnect();
    }
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
  async handleMessageCreateEvent(payload: any) {
    const {message, roomChat, recipient} = payload
    const createdBy = message.createdBy;
    const createdByClientId = await this.cacheManager.get(`nest_base_client_${createdBy.id}`);
    const recipientClientId = await this.cacheManager.get(`nest_base_client_${recipient.id}`);
    const roomName = `nest_base_room_${roomChat.id}`;
    if (createdByClientId) {
      const createdByClient = this.server.sockets.sockets.get(createdByClientId as string);
      if (createdByClient) createdByClient.join(roomName);
    }
    if (recipientClientId) {
      const recipientClient = this.server.sockets.sockets.get(recipientClientId as string);
      if (recipientClient) recipientClient.join(roomName);
    }
    this.server.to(roomName).emit('message.new', message);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, roomId: string) {
    client.join(`nest_base_room_${roomId}`);
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
