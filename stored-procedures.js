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

db.scrapeReconcileStatus.find({refNum:'WORKUS',scrapeTime:{$type:"date"}}).limit(1)
   .forEach((document)=>{
       
        const start = "2022-01-01";
        const end = "2022-02-01";
         
        const startDate = new Date(start);
        const endDate = new Date(end);
        
        console.log(startDate)
        console.log(endDate)
        console.log(document.scrapeTime)

        //  console.log(startDate)
       const b = document.scrapeTime >= startDate && document.scrapeTime <= endDate
       
       print(b);
   })

db.statusTrack.find({startDate: { $gt: ISODate("2022-02-15T15:45:00.000+05:30") } })


db.scrapeReconcileStatus.aggregate(
    [
        {
            $match:{
            "scrapeTime":{$type:"date"}
            },
        },    
         { 
             $project: 
             { 
                "startDate" :
                    {
                        $toDate:"2022-02-10" 
                    },
                    "start":"2022-02-10",
                    "subSystemsAckStatusMap":1,
                    "refNum":1,
                    "correlationId":1,
                    "scrapeTime":1,
                    "event.payload.product":1,
                    "event.payload.version":1
            },
        },
        
        {
            $match:{
               "scrapeTime": { 
                   '$lt':ISODate("2022-02-10")
                }
            }
        }
    ])
