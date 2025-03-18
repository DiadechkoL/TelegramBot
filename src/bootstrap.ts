import { TelegramService } from "@/modules/telegram/telegram.service";
import TelegramController from "@/modules/telegram/telegram.controller";


export default {
//     createNumberController: () => {
//         const numberRepository = new NumberRepository();
//         const twilioService = new TwilioService();
//         const service =  new NumberService(numberRepository, twilioService);
//         return new NumberController(service);
//     },
//     createUserController: () => {
//         const userRepository = new UserRepository();
//         const userService = new UserService(userRepository);
//         return new UserController(userService);
//     },
//     createSmsController: () => {
//         const twilioService = new TwilioService();
//         const numberRepository = new NumberRepository();
//         const smsService = new SmsService(twilioService, numberRepository);
//         const userRepository = new UserRepository()
//         const userService = new UserService(userRepository)
//         return new SmsController(smsService, userService);
//     },
//     createCallController: () => {
//         const twilioService = new TwilioService();
//         const numberRepository = new NumberRepository();
//         const callService = new CallService(numberRepository,twilioService);
//         return new CallController(callService);
//     }


createTelegramController: () => {
    const telegramService = new TelegramService();
    return new TelegramController(telegramService);
}
}