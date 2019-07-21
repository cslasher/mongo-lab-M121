let pipeline = [
  { $project: { _id: 0, counts: { $size: { $split: ['$title', ' '] } } } },
  { $match: { counts: 1 } }
];

db.movies.aggregate(pipeline).itcount();
