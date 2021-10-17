import { MessageService } from "primeng/api";

export interface IToast {
    title         : string;
    message       : string;
    type          : "success" | "info" | "warn" | "error";
    messageService: MessageService;

}

export function toast({title, message, type, messageService}: IToast): void {
    
    messageService.add({
        severity: type,
        summary: title,
        detail: message
    });

}