(function() {
    angular.module('app')
        .filter('filterBySeasonNumber', function() {
            return function(episodes, seasonNumber) {
                var result = [];

                if (!seasonNumber) {
                    return episodes;
                }

                episodes.forEach(function(episode) {
                    if (episode.seasonNumber === +seasonNumber) {
                        result.push(episode);
                    }
                });

                return result;
            };
        });
}());
