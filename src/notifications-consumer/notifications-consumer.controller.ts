import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { NotificationsConsumerService } from './notifications-consumer.service';
import { CreateNotificationsConsumerDto } from './dto/create-notifications-consumer.dto';

@Controller()
export class NotificationsConsumerController {
  constructor(
    private readonly notificationsConsumerService: NotificationsConsumerService,
  ) {}

  @MessagePattern('user.registered.successfully')
  async sendRegisteredNotification(
    @Payload() data: CreateNotificationsConsumerDto,
    @Ctx() context: RmqContext,
  ) {
    const originalMessage = context.getMessage();
    const channel = context.getChannelRef();
    logger.debug(
      `Received notification: ${JSON.stringify(data)}`,
    );
    try{
      const isDelivered = await this.notificationsConsumerService.sendRegisteredNotification(
        data,
      );
      logger.debug(`Delivery result: ${isDelivered}`);
      
      if (!isDelivered) {
        logger.warn('Notification was not delivered, rejecting message');
        channel.nack(originalMessage, false, false);
      }
      else{
        logger.debug('Notification successfully processed, acknowledging message');
        channel.ack(originalMessage);
      }
    }
    catch(error){
      logger.error(`Error processing notification: ${error.message}`, 'NotificationsConsumerController.sendRegisteredNotification');
      channel.nack(originalMessage, false, false);
    }
  }
}
