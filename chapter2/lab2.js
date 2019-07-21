let x_max = 1521105,
  x_min = 5,
  min = 1,
  max = 10 - 1;

let pipeline = [
  {
    $match: {
      languages: 'English',
      'imdb.rating': {
        $gte: 1
      },
      'imdb.votes': {
        $gte: 1
      },
      year: {
        $gte: 1990
      }
    }
  },
  {
    $project: { _id: 0, imdb: 1, title: 1 }
  },
  {
    $addFields: {
      scaled_rating: {
        $add: [
          min,
          {
            $multiply: [
              max,
              {
                $divide: [
                  {
                    $subtract: ['$imdb.votes', x_min]
                  },
                  {
                    $subtract: [x_max, x_min]
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  },
  {
    $addFields: {
      normalized_rating: {
        $avg: ['$imdb.rating', '$scaled_rating']
      }
    }
  },
  {
    $sort: {
      normalized_rating: 1
    }
  },
  {
    $limit: 1
  }
];

db.movies.aggregate(pipeline).pretty();
