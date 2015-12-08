'use strict';
module.exports = {
    mapToUserResponseModel: function(user) {
        let result = {
            _id: user._id,
            userName: user.userName,
            token: user.token,
            firstName: user.firstName,
            lastName: user.lastName,
            roles: user.roles
        };

        return result;
    }
};
