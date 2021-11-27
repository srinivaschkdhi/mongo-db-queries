let count = 0;
const ats = [];
const refnums = [];
const refnumats = [];

db.statusTrack.find({
    status: {
        $in: ["SCRAPE_FAIL", "UPDATE_SKIPPED", "UPDATE_FAIL"]
    },
    startDate: {
        $gte: ISODate("2021-11-22T00:00:00.000+00:00"),
        $lt: ISODate("2021-11-24T00:00:00.000+00:00")
    },


}).forEach((document) => {

    const scrapeStatus = document.jobsScrapeStatus;

    for (const key in scrapeStatus) {
        const obj = scrapeStatus[key];
        const info = obj.info;

        if (info.includes("GATEWAY_ADAPTER_FUNC_EXECUTE_ERROR")) {
            ats.push(key);
            refnums.push(document.refNum);
            refnumats.push(document.refNum + "---" + key);
            count++;
        }
    }

})

let atsOccr = new Map();
ats.forEach((element) => {

    if (atsOccr.has(element)) {
        atsOccr.set(element, atsOccr.get(element) + 1);
    } else {
        atsOccr.set(element, 1);
    }
})

let refNumOccr = new Map();
refnums.forEach((element) => {

    if (refNumOccr.has(element)) {
        refNumOccr.set(element, refNumOccr.get(element) + 1);
    } else {
        refNumOccr.set(element, 1);
    }
})


let disRefnums = new Set();
refnums.forEach((element) => {
    disRefnums.add(element);
})

let disAts = new Set();
ats.forEach((element) => {
    disAts.add(element);
})

let disRefAts = new Set();
refnumats.forEach((element) => {
    disRefAts.add(element);
})

print("Total GATEWAY_ADAPTER_FUNC_EXECUTE_ERROR errors " + count);

print("\n");
print("\n");

print("ATS")
console.log(disAts)

print("\n");
print("\n");

print("Refnums")
console.log(disRefnums)

print("\n");
print("\n");

print("Refnum-Ats")
console.log(disRefAts)

print("\n");
print("\n");

print("Ats Frequency")
console.log(atsOccr);


print("\n");
print("\n");
print("Refnums Frequency")
console.log(refNumOccr);