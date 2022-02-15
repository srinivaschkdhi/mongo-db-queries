db.system.js.find()
db.system.js.distinct("_id");


db.system.js.save({_id: "isInRange", value: function(scrape,start,end){
    
    const startDate = new Date(start);
    const endDate = new Date(end);

    return (scrape >= startDate && scrape <= endDate);
}});



db.scrapeReoncileStatus.find({$where: "isInRange(this.scrapeTime,'2022-01-31', '2022-02-01') == true"});

db.scrapeReoncileStatus.find({$where: "isInRange(this.scrapeTime,'2022-01-31', '2022-02-01') == true"});

db.scrapeReconcileStatus.find({"scrapeTime":{$type:"date"},$where: "isInRange(this.scrapeTime,'2022-01-30', '2022-02-03') == true"});



db.scrapeReoncileStatus.find({refNum:'WORKUS'})
