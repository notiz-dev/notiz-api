export const subscriptionTemplate = (uuid: string) => {
  return (
    '<p>Hello there,</p>' +
    '<p>thanks for taking an interest in <strong>notiz.dev</strong>.</p>' +
    `<p>Please confirm your email for us: <a href="https://notiz.dev/confirm-subscription?uuid=${uuid}">https://notiz.dev/confirm-subscription?uuid=${uuid}</a></p>` +
    '<p>Cheers</p>' +
    '<p><strong>notiz.dev</strong> team</p>'
  );
};
