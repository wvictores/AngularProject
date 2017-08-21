angular.module("avatar", []);
angular.module("avatar").factory("AvatarFactory", function () {
    var size = 80;
    var url = "https://api.adorable.io/avatars/";
    return {
        generate: function (email) {
            return url + size + "/" + email;
        }
    }
})