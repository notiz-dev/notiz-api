export const confirmedSubscriptionTemplate = (uuid: string) => {
  return (
    '<p>Hello,</p>' +
    '<p>Your subscription to our list has been confirmed.</p>' +
    '<p>Thank you for subscribing!</p>' +
    '<p>Cheers</p>' +
    '<p><a href="https://notiz.dev">notiz.dev</a> Team</p>' +
    `<p><a href="https://notiz.dev/unsubscribe?uuid=${uuid}">Unsubscribe</a></p>`
  );
};
