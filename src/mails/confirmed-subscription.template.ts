export const confirmedSubscriptionTemplate = (uuid: string) => {
  return (
    '<p>Hello,</p>' +
    '<p>Your subscription to our list has been confirmed.<br>' +
    'Thank you for subscribing! We will keep you updated about our latest posts.</p>' +
    '<p>Cheers<br>' +
    '<a href="https://notiz.dev">notiz.dev</a> Team</<a>' +
    `<p><a href="https://notiz.dev/unsubscribe?uuid=${uuid}">Unsubscribe</a></p>`
  );
};
