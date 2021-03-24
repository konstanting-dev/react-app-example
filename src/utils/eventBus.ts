// Simple EventBus to be able to listen and dispatch custom events
class EventBus<DetailType = unknown> {
  private eventTarget: EventTarget;
  constructor(description = '') {
    this.eventTarget = document.appendChild(document.createComment(description));
  }
  on(type: string, listener: (event: CustomEvent<DetailType>) => void) {
    this.eventTarget.addEventListener(type, listener as EventListener);
  }
  once(type: string, listener: (event: CustomEvent<DetailType>) => void) {
    this.eventTarget.addEventListener(type, listener as EventListener, { once: true });
  }
  off(type: string, listener: (event: CustomEvent<DetailType>) => void) {
    this.eventTarget.removeEventListener(type, listener as EventListener);
  }
  emit(type: string, detail?: DetailType) {
    return this.eventTarget.dispatchEvent(new CustomEvent(type, { detail }));
  }
}

const ErrorEventBus = new EventBus<string>('errorEventBus');

export default ErrorEventBus;
