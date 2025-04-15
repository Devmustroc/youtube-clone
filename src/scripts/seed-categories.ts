// TODO: Create a script to seed categories

import {db} from "@/db";
import {categories} from "@/db/schema";

const categoryName = [
	"Music",
	"Gaming",
	"Education",
	"Comedy",
	"News",
	"Sports",
	"Entertainment",
	"Science & Technology",
	"Travel & Events",
	"People & Blogs",
	"How-to & Style",
	"Film & Animation",
	"Autos & Vehicles",
	"Pets & Animals",
	"Nonprofits & Activism"
];

async function main() {
	console.log("Seeding categories...");

	try {
		const value = categoryName.map((name) => ({
			name,
			description: `Videos related to ${name.toLowerCase()}`,
		}));

		await db.insert(categories).values(value);

		console.log("Categories already exist, skipping seeding.");

		console.log("Categories seeded:", categories);
	} catch (error) {
		console.error("Error seeding categories:", error);
	}
}

void main()