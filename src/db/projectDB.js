import { openDB } from 'idb';

const dbPromise = openDB('MapProjects', 1, {
	upgrade(db) {
		if (!db.objectStoreNames.contains('projects')) {
			db.createObjectStore('projects', {
				keyPath: 'metadata.id',
			});
		}
	},
});

export async function saveProject(project) {
	const db = await dbPromise;
	return db.put('projects', project);
}

export async function getProject(id) {
	const db = await dbPromise;
	return db.get('projects', id);
}

export async function getAllProjects() {
	const db = await dbPromise;
	return db.getAll('projects');
}

export async function deleteProject(id) {
	const db = await dbPromise;
	return db.delete('projects', id);
}
