let totalEvents = 0;

let productFailFreq = new Map();
productFailFreq.set('CRM', 0)
productFailFreq.set('SEARCH', 0)
productFailFreq.set('IMS', 0)
productFailFreq.set('ANALYTICS', 0)

let productSuccessFreq = new Map();
productSuccessFreq.set('CRM', 0)
productSuccessFreq.set('SEARCH', 0)
productSuccessFreq.set('IMS', 0)
productSuccessFreq.set('ANALYTICS', 0)

db.scrapeReconcileStatus.aggregate([{
        $match: {
            refNum: "HONEUS",
            scrapeTime: /^Fri Dec 10.*2021/
        }
    },
    {
        $project: {
            date: {
                $dateFromString: {
                    dateString: "$scrapeTime"
                }
            },
            subSystemsAckStatusMap: 1
        }
    }
]).forEach((document) => {
    totalEvents += 1;
    const subSystemsAckStatusMap = document.subSystemsAckStatusMap;

    for (const product in subSystemsAckStatusMap) {
        const result = subSystemsAckStatusMap[product];

        if (result === "Not Received")
            productFailFreq.set(product, productFailFreq.get(product) + 1);
        else if (result == "SUCCESS")
            productSuccessFreq.set(product, productSuccessFreq.get(product) + 1);
    }
})


print("Total Events " + totalEvents);

print("CRM")
print("Success - " + productSuccessFreq.get("CRM") + ",     Fail - " + productFailFreq.get("CRM"))
print("\n")


print("SEARCH")
print("Success - " + productSuccessFreq.get("SEARCH") + ",      Fail - " + productFailFreq.get("SEARCH"))
print("\n")


print("IMS")
print("Success - " + productSuccessFreq.get("IMS") + ",     Fail - " + productFailFreq.get("IMS"))
print("\n")

print("ANALYTICS")
print("Success - " + productSuccessFreq.get("ANALYTICS") + ",       Fail - " + productFailFreq.get("ANALYTICS"))
