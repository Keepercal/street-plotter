import { openDB } from 'idb';
import { updateProject } from '../models/project';

import { reportError } from '@/utils/errorReporting.js';

const dbPromise = openDB('MapProjects', 1, {
	upgrade(db) {
		if (!db.objectStoreNames.contains('projects')) {
			db.createObjectStore('projects', {
				keyPath: 'metadata.id',
			});
		}
	},
});

/**
 * Saves a project to the database.
 * @param {Object} project The project object to save
 * @returns {Promise<IDBValidKey>} The key of the saved project
 */
export async function saveProject(project) {
	const db = await dbPromise;
	return db.put('projects', project);
}

/**
 * Retrieves a project from the database by its ID.
 * @param {string} id The ID of the project to retrieve
 * @returns {Promise<Object|undefined>} The retrieved project, or undefined if it does not exist
 */
export async function getProject(id) {
	const db = await dbPromise;
	return db.get('projects', id);
}

/**
 * Retrieves all projects from the database.
 * @returns {Promise<Object[]>} An array of all stored projects
 */
export async function getAllProjects() {
	const db = await dbPromise;
	return db.getAll('projects');
}

/**
 * Deletes a project from the database by its ID.
 * @param {string} id The ID of the project to delete
 * @returns {Promise<void>} Resolves when the project has been deleted
 */
export async function deleteProject(id) {
	const db = await dbPromise;
	return db.delete('projects', id);
}

/**
 * Updates an existing project in the database.
 * @param {string} id The ID of the project to update
 * @param {Object} changes The changes to apply to the project
 * @returns {Promise<IDBValidKey>} The key of the saved project
 * @throws {Error} If the project does not exist or the update fails
 */
export async function updateStoredProject(id, changes) {
	try {
		const project = await getProject(id);

		if (!project) {
			throw new Error(`Project "${id}" not found`);
		}

		const updatedProject = updateProject(project, changes);

		return await saveProject(updatedProject);
	} catch (error) {
		reportError(error, {
			tags: {
				feature: 'projects',
				operation: 'update',
			},
			extra: {
				projectId: id,
			},
		});

		throw error;
	}
}
