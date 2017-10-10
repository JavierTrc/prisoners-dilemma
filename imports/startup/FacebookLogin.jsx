import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { Users } from '../api/UsersDB.jsx'
if (Meteor.isServer) {
    Meteor.startup(() => {
        ServiceConfiguration.configurations.remove({
            service: "facebook"
        });

        ServiceConfiguration.configurations.insert({
            service: "facebook",
            appId: '289359341579238',
            secret: 'c9975230554d1c8a6e45512409a3a93b'
        })
        // TODO: CHANGE THIS OR THEY HACK US!!!!
    });

}
Accounts.onCreateUser(function (options, user) {

    if (!user.services.facebook) {
        return user;
    }
    user.facebookId = user.services.facebook.id;
    user.name = user.services.facebook.first_name;
    user.username = user.services.facebook.id;
    Meteor.call('users.tryAddUser', user.facebookId, user.name);
    return user;
});

