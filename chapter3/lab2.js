let pipeline = [
  {
    $match: {
      languages: 'English'
    }
  },
  { $unwind: '$cast' },
  {
    $group: {
      _id: '$cast',
      numFilms: { $sum: 1 },
      average: {
        $avg: '$imdb.rating'
      }
    }
  },
  { $sort: { numFilms: -1 } },
  {
    $project: {
      _id: 1,
      numFilms: 1,
      average: {
        $divide: [
          {
            $trunc: {
              $multiply: ['$average', 10]
            }
          },
          10
        ]
      }
    }
  }
];

db.movies.aggregate(pipeline).pretty();
