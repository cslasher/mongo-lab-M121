let pipeline = [
  {
    $lookup: {
      from: 'air_routes',
      localField: 'airlines',
      foreignField: 'airline.name',
      as: 'routes'
    }
  },
  {
    $unwind: '$routes'
  },
  {
    $match: {
      'routes.airplane': { $regex: /(747|380)/ }
    }
  },
  {
    $group: {
      _id: '$name',
      count: { $sum: 1 }
    }
  }
];

db.air_alliances.aggregate(pipeline).pretty();
