/**
 * The Event API provides a basic event system to allow your code to react to signals sent by the OS or other programs/libraries.
 * @see https://ocdoc.cil.li/api:event
 * @noSelf
 * @noResolution
 */
declare module "event" {
    type EventHandler<T extends any[]> = (name: string, ...args: T) => void;
    type ErrorHandler = (error: string) => void;

    /**
     * Register a new event listener that should be called for events with the specified name.
     */
    function listen<T extends OC.EventType>(event: T, callback: EventHandler<OC.EventMap[T]>): boolean;
    function listen<T extends any[]>(event: string, callback: EventHandler<T>): boolean;

    /**
     * Unregister a previously registered event listener.
     */
    function ignore<T extends OC.EventType>(event: T, callback: EventHandler<OC.EventMap[T]>): boolean;
    function ignore<T extends any[]>(event: string, callback: EventHandler<T>): boolean;

    /**
     * Starts a new timer that will be called after the time specified in interval.
     */
    function timer(interval: number, callback: Function, times?: number): number;

    /**
     * Cancels a timer previously created with `event.timer`.
     */
    function cancel(timerId: number): boolean;

    /**
     * Pulls and returns the next available event from the queue, or waits until one becomes available.
     * @tupleReturn
     */
    function pull<T extends OC.EventType>(event: T): [T, ...OC.EventMap[T]];
    function pull<T extends any[]>(event: string): [string, ...T];

    /**
     * Pulls and returns the next available event from the queue,
     * or waits until one becomes available but allows filtering by specifying filter function.
     * @tupleReturn
     */
    function pullFiltered(timeout?: number, filter?: Function): [string, ...any[]];

    /**
     * As its arguments pullMultiple accepts multiple event names to be pulled,
     * allowing basic filtering of multiple events at once.
     * @tupleReturn
     */
    function pullMultiple(...events: string[]): [string, ...any[]];

    /**
     * Global event callback error handler.
     * If an event listener throws an error, we handle it in this function to avoid it bubbling into unrelated code.
     */
    function onError(handler: ErrorHandler): void;

    /**
     * This is only an alias to computer.pushSignal.
     * This does not modify the arguments in any way.
     */
    function push(name: string, ...args: any[]): void;
    function push<T extends OC.EventType>(name: T, ...args: OC.EventMap[T]): void;
}
