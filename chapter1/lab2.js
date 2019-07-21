let pipeline = [
  {
    $match: {
      'imdb.rating': { $gte: 7 },
      genres: {
        $nin: ['Crime', 'Horror']
      },
      rated: {
        $in: ['PG', 'G']
      },
      languages: {
        $all: ['English', 'Japanese']
      }
    }
  },
  {
    $project: {
      _id: 0,
      title: 1,
      rated: 1
    }
  }
];
db.movies.aggregate(pipeline).itcount();
load('validateLab2.js');
validateLab2(pipeline);
