import {HttpException, HttpStatus, NotFoundException} from "@nestjs/common";

export class RecipientNotFound extends NotFoundException {
    constructor() {
        super('Không tìm thấy người nhận');
    }
}
