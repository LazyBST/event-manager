export declare const AUTOMATION_DLQ_DEFAULT_TOPIC = "automation.events.dlq";
export declare enum EventType {
    AUTOMATION_EVENT = "AUTOMATION_EVENT",
    AUTOMATION_DLQ_EVENT = "AUTOMATION_DLQ_EVENT"
}
export declare const eventTypeTopicMap: {
    [x: string]: string | undefined;
};
export declare enum AUTOMATION_TRIGGER {
    'app-cp-created' = "app-cp-created",
    'dashboard-cp-created' = "dashboard-cp-created",
    'app-cp-edited' = "app-cp-edited",
    'dashboard-cp-edited' = "dashboard-cp-edited"
}
