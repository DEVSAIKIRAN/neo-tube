import { db } from "@/db";
import { categories } from "@/db/schema";

const categoryNames = [
    "Cars and vehicles",
    "IPL",
    "Tech",
    "Comedy",
    "Gaming",
    "Entertainment",
    "Music",
    "Sports",
    "Travel and event",
    "News",
    "Animals",
    "Friends",
    "MineCraft",
    "FreeFire",
]

async function main() {
    console.log("Seeding categories...")

    try{
     const values = categoryNames.map((name) => ({
        name,
        description: `Videos related to ${name.toLowerCase()}`
     }));

     await db.insert(categories).values(values);

     console.log("Categories Uploaded")
    }
    catch (error) {
        console.log("ERROR SEEDING CATEGRIES", error)
        process.exit(1)
    }
}

main(); 