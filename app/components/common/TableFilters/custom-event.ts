export const on = (eventType: string, listener: EventListenerOrEventListenerObject) => {
  document.addEventListener(eventType, listener);
};

export const onOnce = (eventType: string, listener: EventListenerOrEventListenerObject) => {
  document.addEventListener(eventType, listener, { once: true });
};

export const off = (eventType: string, listener: EventListenerOrEventListenerObject) => {
  document.removeEventListener(eventType, listener);
};

export const trigger = <T>(eventType: string, data?: T) => {
  const event = new CustomEvent(eventType, { detail: data });
  document.dispatchEvent(event);
};
