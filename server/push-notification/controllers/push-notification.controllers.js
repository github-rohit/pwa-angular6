const {
  Subscriptions
} = require("../models/subscriptions");
const webpush = require('web-push');
const config = require("../../config/config");

module.exports = (post) => {
    const url = `/post/${post._id}/${post.title.replace(/ /ig, '-')}`;
  Subscriptions.find({}).then((subscriptions) => {
    webpush.setVapidDetails(
      'mailto:example@yourdomain.org',
      process.env.WEB_PUSH_PUBLIC_KEY,
      process.env.WEB_PUSH_PRIVATE_KEY
    );

    subscriptions.forEach(function (sub) {

      var pushConfig = {
        endpoint: sub.endpoint,
        keys: {
          auth: sub.keys.auth,
          p256dh: sub.keys.p256dh
        }
      };

      webpush.sendNotification(pushConfig, JSON.stringify({
          title: 'New Post',
          content: 'New Post added!',
          openUrl: url
        }))
        .catch(function (err) {
          console.log(err);
        })
    });

  }).catch(err => {
    console.log(err);
  });
}
