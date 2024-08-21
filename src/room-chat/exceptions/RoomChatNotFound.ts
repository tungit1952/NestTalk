import {HttpException, HttpStatus, NotFoundException} from "@nestjs/common";

export class RoomChatNotFound extends NotFoundException {
    constructor() {
        super('Không tìm thấy đoạn chat');
    }
}
