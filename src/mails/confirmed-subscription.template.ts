export const confirmedSubscriptionTemplate = (uuid: string) => {
  return (
    '<p>Hello there,</p>' +
    '<p>thanks for confirming your email.</p>' +
    '<p>Cheers</p>' +
    '<p><strong>notiz.dev</strong> team</p>' +
    `<p><a href="https://notiz.dev/unsubscribe?uuid=${uuid}">Unsubscribe</a></p>`
  );
};
