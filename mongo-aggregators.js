db.persons.aggregate([{
    $match: {
        tags: {
            $size: 3
        }
    }
}])

db.persons.find({
    tags: {
        $size: 3
    }
})

//$group

db.persons.aggregate([{
    $group: {
        _id: "$age"
    }
},
{}
])

db.persons.aggregate([{
    $group: {
        _id: "$company.location.country0"
    }
}])


db.persons.aggregate([{
    $group: {
        _id: {
            age: "$age",
            gender: "$gender"
        }
    }
}])

db.persons.aggregate([{
    $match: {
        gender: "female"
    }
},
{
    $group: {
        _id: {
            eyeColor: "$eyeColor",
            age: "$age",
            gender: "$gender"
        }
    }
}
])

db.persons.aggregate([{
    $group: {
        _id: {
            age: "$age",
            eyeColor: "$eyeColor"
        }
    }
},
{
    $match: {
        "_id.age": {
            $gt: 30
        }
    }
}
])

db.persons.aggregate([{
    $count: "total"
}])
// {"total" : 1000}

db.persons.aggregate([]).toArray().length

db.persons.aggregate([]).itcount()

db.persons.aggregate([{
    $group: {
        _id: "$company.location.country"
    }
},
{
    $count: "countriesCount"
}
])


db.persons.aggregate([{
    $sort: {
        name: 1
    }
}])

db.persons.aggregate([{
    $sort: {
        age: -1,
        gender: -1,
        eyeColor: -1
    }
}])


db.persons.aggregate([{
    $group: {
        _id: "$favoriteFruit"
    }
},
{
    $sort: {
        _id: 1
    }
}
])

db.persons.aggregate([
    { $project: { name: 1, "company.location.country": 1 } }
])

db.persons.aggregate([
    { $project: { isActive: 0, name: 0, gender: 0 } }
])

db.persons.aggregate([
    {
        $project: {
            _id: 0,
            name: 1,
            info: {
                eyes: "$eyeColor",
                fruit: "$favoriteFruit",
                country: "$company.location.country"
            }
        }
    }
])

db.persons.aggregate([
    { $limit: 100 },
    { $match: { $age: { $gt: 27 } } },
    { $group: { _id: "$company.location.country" } }
])

db.persons.aggregate([
    { $unwind: "$tags" },
    { $project: { name: 1, gender: 1, tags: 1 } }
])

db.persons.aggregate([
    { $unwind: "$tags" },
    { $group: { _id: "$tags" } }
])

//Most accumulaors are used only in the $group stage
//$sum, $avg, $max, $min

db.persons.aggregate([
    {
        $group: {
            _id: "$age",
            count: { $sum: 1 }
        }
    }
])

db.persons.aggregate([
    { $unwind: "$tags" },
    {
        $group: {
            _id: "$tags",
            count: { $sum: 1 }
        }
    }
])

db.persons.aggregate([
    {
        $group: {
            _id: "$eyeColor",
            avgAge: { $avg: "$age" }
        }
    }
])

//Unary Operators are usually used in the $project state
//In the $group stage Unary Operators can used only in conjunction with Accumulators
//$type, $or, $lt, $gt, $and, $multiply

db.persons.aggregate([
    {
        $project: {
            name: 1,
            eyeColorType: { $type: "$eyeColor" },
            ageType: { $type: "$age" }
        }
    }
])

// $out Write resulting documents to the new mongo collection
// $out MUST be last stage in the pipeline
// If output collection doesn't exist, it will be created automatically

db.persons.aggregate([
    {
        $group: {
            _id: { age: "$age", eyeColor: "$eyeColor" }
        }
    },
    { $out: "aggregationResults" }
])

//All aggregation stages can use maximum 100 MB of RAM
//Server will return error if RAM limit is exceeded
//Following option will enable MongoDB to write stages data to the temporal files

db.persons.aggregate([], { allowDiskUse: true })