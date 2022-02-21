db.scrapeReconcileStatus.find({"_id" : "620774335b4a920009063bc9-1"}).forEach(function(doc) { 
    db.scrapeReconcileStatus.update(
        { "_id": doc._id }, 
        {"$set": { "scrapeTime": new Date(doc.scrapeTime) }}
    );
});
