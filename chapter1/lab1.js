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
  }
];
db.movies.aggregate(pipeline).itcount();
load('validateLab1.js');
validateLab1(pipeline);
