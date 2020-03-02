export const subscriptionTemplate = (uuid: string) => {
  return (
    '<p>Hello,</p>' +
    '<p>thank you for taking an interest in <a href="https://notiz.dev">notiz.dev</a>.</p>' +
    '<p>Do you mind confirming your email for us to make sure it was really you who signed up?<br>' +
    `<a href="https://notiz.dev/confirm-subscription?uuid=${uuid}">https://notiz.dev/confirm-subscription?uuid=${uuid}</a></<a>` +
    "<p>If you received this email by mistake, simply delete it. You won't be subscribed if you don't click the confirmation link above.</p>" +
    '<p>Cheers<br>' +
    '<a href="https://notiz.dev">notiz.dev</a> Team</>'
  );
};
