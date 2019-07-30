db.movies.aggregate([
  {
    $match: {
      'imdb.rating': { $gte: 0 },
      metacritic: { $gte: 0 }
    }
  },
  {
    $project: {
      _id: 0,
      title: 1,
      'imdb.rating': 1,
      metacritic: 1
    }
  },
  {
    $facet: {
      topTenImdb: [
        {
          $sort: { 'imdb.rating': -1 }
        },
        {
          $limit: 10
        },
        {
          $project: {
            _id: 0,
            title: 1
          }
        }
      ],
      topTenMeta: [
        {
          $sort: { metacritic: -1 }
        },
        {
          $limit: 10
        },
        {
          $project: {
            _id: 0,
            title: 1
          }
        }
      ]
    }
  },
  {
    $project: {
      common_movie: {
        $setIntersection: ['$topTenImdb', '$topTenMeta']
      }
    }
  }
]);
