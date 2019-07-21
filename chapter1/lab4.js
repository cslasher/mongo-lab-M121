let pipeline = [
  {
    $match: {
      writers: { $elemMatch: { $exists: true } },
      cast: { $elemMatch: { $exists: true } },
      directors: { $elemMatch: { $exists: true } }
    }
  },
  {
    $project: {
      _id: 0,
      title: 1,
      directors: 1,
      cast: 1,
      writers: {
        $map: {
          input: '$writers',
          as: 'writer',
          in: {
            $arrayElemAt: [
              {
                $split: ['$$writer', ' (']
              },
              0
            ]
          }
        }
      }
    }
  },
  {
    $project: {
      title: 1,
      counts: {
        $size: {
          $setIntersection: ['$cast', '$writers', '$directors']
        }
      }
    }
  },
  {
    $match: {
      counts: {
        $gt: 0
      }
    }
  }
];

db.movies.aggregate(pipeline).itcount();
