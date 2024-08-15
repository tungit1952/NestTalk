import {Inject, Injectable} from "@nestjs/common";
import * as WebSocket from "ws";
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class WSService {
  private ws: WebSocket;

  constructor(
      @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {
    this.ws = new WebSocket("wss://streaming.forexpros.com/echo/742/_tggafvz/websocket");

    this.ws.on("open", () => {
      console.log("WebSocket connection opened.");
      const data = '["{\\"_event\\":\\"bulk-subscribe\\",\\"tzID\\":110,\\"message\\":\\"pid-166:%%pid-20:%%pid-14958:%%pid-169:%%pid-24441:%%pid-17920:%%pid-1089645:%%pid-27254:%%pid-13376:%%pid-49642:%%pid-14767:%%pid-41173:%%pid-49680:%%pid-49748:%%pid-172:%%pid-175:%%pid-27:%%pid-167:%%pid-174:%%pid-176:%%pid-168:%%pid-1016254:%%pid-25685:%%pid-25760:%%pid-25823:%%pid-25887:%%pid-44400:%%pid-14603:%%pid-14601:%%pid-14600:%%pid-14602:%%pid-41044:%%pid-38014:%%pid-14774:%%pid-49753:%%pid-50647:%%pid-961613:%%pid-49629:%%pid-14770:%%pid-49648:%%pid-41155:%%pid-29149:%%pid-945510:%%pid-945507:%%pid-945505:%%pid-13665:%%pid-13666:%%pid-29191:%%pid-1029190:%%pid-19155:%%pid-10529:%%pid-178:%%pid-39929:%%pid-17940:%%pid-1169136:%%pid-28933:%%pid-179:%%pid-1171911:%%pid-942630:%%pid-40820:%%pid-171:%%pid-41146:%%pid-41148:%%pid-49661:%%pid-37426:%%pid-38015:%%pid-29151:%%pid-1013367:%%pid-38017:%%pid-1159114:%%pid-11319:%%pid-49692:%%pid-13185:%%pid-13009:%%pid-49677:%%pid-13384:%%pid-13518:%%pid-29049:%%pid-995072:%%pid-41064:%%pid-41063:%%pid-12259:%%pid-12522:%%pid-941336:%%pid-1174625:%%pid-11102:%%pid-14523:%%pid-29078:%%pid-12860:%%pid-1159121:%%pid-1165928:%%pid-41043:%%pid-18823:%%pid-948432:%%pid-13228:%%pid-961537:%%pid-41167:%%pid-41159:%%pid-41115:%%pid-41164:%%pid-37428:%%pid-41111:%%pid-1172756:%%pid-1174569:%%pid-1174568:%%pid-1172755:%%pid-1174567:%%pid-1174574:%%pid-101797:%%pid-980229:%%pid-995078:%%pid-941333:%%pid-993158:%%pid-989440:%%pid-993152:%%pid-1006456:%%pid-1006455:%%isOpenExch-1:%%isOpenExch-2:%%isOpenExch-51:%%isOpenExch-47:%%isOpenExch-144:%%isOpenExch-53:%%isOpenExch-37:%%isOpenExch-55:%%isOpenExch-42:%%isOpenExch-92:%%isOpenExch-64:%%isOpenExch-71:%%isOpenExch-4:%%isOpenExch-3:%%isOpenExch-9:%%isOpenExch-11:%%isOpenExch-5:%%isOpenExch-7:%%isOpenExch-17:%%isOpenExch-12:%%isOpenExch-15:%%isOpenExch-16:%%isOpenExch-52:%%isOpenExch-8:%%isOpenExch-14:%%isOpenExch-10:%%isOpenExch-25:%%isOpenExch-23:%%isOpenExch-45:%%isOpenExch-78:%%isOpenExch-56:%%isOpenExch-41:%%isOpenExch-44:%%isOpenExch-43:%%isOpenExch-58:%%isOpenExch-84:%%isOpenExch-66:%%isOpenExch-102:%%isOpenExch-101:%%isOpenExch-40:%%isOpenExch-70:%%isOpenExch-82:%%isOpenExch-49:%%isOpenExch-26:%%isOpenExch-20:%%isOpenExch-74:%%isOpenExch-46:%%isOpenExch-21:%%isOpenExch-54:%%isOpenExch-103:%%isOpenExch-18:%%isOpenExch-83:%%isOpenExch-60:%%isOpenExch-69:%%isOpenExch-67:%%isOpenExch-131:%%isOpenExch-68:%%isOpenExch-28:%%isOpenExch-65:%%isOpenExch-35:%%isOpenExch-32:%%isOpenExch-63:%%isOpenExch-38:%%isOpenExch-39:%%isOpenExch-57:%%isOpenExch-72:%%isOpenExch-122:%%isOpenExch-29:%%isOpenExch-30:%%isOpenExch-100:%%isOpenExch-27:%%isOpenExch-34:%%isOpenExch-62:%%isOpenExch-33:%%isOpenExch-22:%%isOpenExch-48:%%isOpenExch-36:%%isOpenExch-75:%%isOpenExch-90:%%isOpenExch-86:%%isOpenExch-77:%%isOpenExch-88:%%isOpenExch-59:%%isOpenExch-76:%%isOpenExch-89:%%isOpenExch-96:%%isOpenExch-111:%%isOpenExch-124:%%isOpenExch-99:%%isOpenExch-116:%%isOpenExch-115:%%isOpenExch-117:%%isOpenExch-128:%%isOpenExch-129:\\"}"]'
      this.send(data);
    });

    this.ws.on("message", (message: WebSocket.MessageEvent) => {
      // Chuyển đổi Buffer thành chuỗi
      const messageStr = Buffer.isBuffer(message) ? message.toString() : message;
      // console.log("Received raw message:", messageStr);

      try {
        const parsedMessage = this.parseMessage(messageStr);
        this.handleMessage(parsedMessage);
        console.log(parsedMessage);
      } catch (error) {
        console.error("Failed to parse message:", error);
      }
    });

    this.ws.on("close", () => {
      console.log("WebSocket connection closed.");
    });

    this.ws.on("error", (error: Error) => {
      console.error("WebSocket error:", error);
    });
  }

  send(data: any) {
    console.log("Sending data:", data); // Ghi lại dữ liệu gửi đi
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(data);
    } else {
      console.log("WebSocket is not open. Ready state:", this.ws.readyState);
    }
  }

  private async handleMessage(message: any) {
    if (message.pid) {
      try {
        // Lấy dữ liệu cache hiện tại cho PID
        const existingData = await this.cacheManager.get(message.pid);

        if (existingData) {
          // Nếu có bản ghi với PID, cập nhật dữ liệu
          console.log(`Updating existing data in cache: PID-${message.pid}`);

          // Đảm bảo existingData là một đối tượng
          const updatedData = {
            ...(existingData as object), // Kiểm tra kiểu dữ liệu
            ...message, // Cập nhật hoặc thay thế các trường
          };

          await this.cacheManager.set(message.pid, updatedData,0);
        } else {
          // Nếu không có bản ghi với PID, thêm mới vào cache
          console.log(`Adding new data to cache: PID-${message.pid}`);
          await this.cacheManager.set(message.pid, message,0);
        }

        console.log('Data stored or updated in cache');
      } catch (error) {
        console.error('Failed to handle message and update cache:', error);
      }
    }
  }

  private parseMessage(message: any) {
    const cleanedMessage = message.toString().replace(/^\[\"|\\"?\"\]$/g, '');

    let jsonString = cleanedMessage.replace(/\\/g, '');
    jsonString = jsonString.replace(/^a\["{"message":"pid-\d+:|\s*"}"\]$/g, '');

    const cleanedString = jsonString.startsWith(':') ? jsonString.substring(1) : jsonString;
    const jsonObject = JSON.parse(cleanedString);

    return jsonObject;
  }
}
