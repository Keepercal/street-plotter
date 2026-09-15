import { CirclePlus } from 'lucide-react';

/* Config object */
export const menus = [
	{
		id: 'file',
		label: 'File',
		items: [
			{
				id: 'newWorkspace',
				label: 'New Workspace',
				icon: CirclePlus,
				action: 'newWorkspace',
			},
			{
				id: 'open',
				label: 'Open Project',
				action: 'openProject',
			},
			{
				id: 'saveAs',
				label: 'Save As...',
				action: 'modal',
				modal: 'saveProject',
				requires: 'canSave',
			},
		],
	},
	{
		id: 'help',
		label: 'Help',
		items: [
			{
				id: 'about',
				label: 'About',
				modal: 'about',
				action: 'modal',
			},
			{
				id: 'howTo',
				label: 'How To',
				modal: 'howTo',
				action: 'modal',
			},
		],
	},
];
