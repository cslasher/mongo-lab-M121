let favorites = [
  'Sandra Bullock',
  'Tom Hanks',
  'Julia Roberts',
  'Kevin Spacey',
  'George Clooney'
];

let pipeline = [
  {
    $match: {
      'tomatoes.viewer.rating': {
        $gte: 3
      },
      cast: {
        $exists: true
      },
      countries: 'USA'
    }
  },
  {
    $addFields: {
      num_favs: {
        $size: {
          $setIntersection: ['$cast', favorites]
        }
      }
    }
  },
  {
    $sort: {
      num_favs: -1,
      'tomatoes.viewer.rating': -1,
      title: -1
    }
  },
  {
    $limit: 25
  },
  {
    $skip: 24
  }
];

db.movies.aggregate(pipeline).pretty();
