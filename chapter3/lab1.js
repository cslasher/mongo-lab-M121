let pipeline = [
  {
    $match: {
      $and: [
        {
          awards: { $exists: true }
        },
        {
          awards: { $regex: /^Won(.*?)Oscar/ }
        }
      ]
    }
  },
  {
    $group: {
      _id: null,
      highest_rating: { $max: '$imdb.rating' },
      lowest_rating: { $min: '$imdb.rating' },
      average_rating: { $avg: '$imdb.rating' },
      deviation: { $stdDevSamp: '$imdb.rating' }
    }
  }
];

db.movies.aggregate(pipeline).pretty();
